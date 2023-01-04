const { laundry : Laundries } = require('../models');
const { laundry_status : LaundryStatus } = require('../models');
const { laundry_done : LaundryDone } = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize("don_st", "admin", "spa142857",{
    host: "sparta-gil.cylo4tomjgga.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
});
const Status = ['대기 중', '수거 중', '수거 완료', '배송 중', '배송 완료'];

class LaundryRepository{
    createLaundry = async (address, request, userIdx) => {
        try{
            await Laundries.create({userIdx:Number(userIdx), address:address, request:request});
        }catch(err){
            console.log('laundry DB 에러' + err);
            return false;
        }
        return true;
    }
    createStatus = async (laundry) => {
        try{
            const result = await LaundryStatus.create({laundryIdx:laundry.laundryIdx, status:'대기 중'});
        }catch(err){
            console.log('laundry_status DB 에러' + err);
            return false;
        }
        return true;
    }
    findLaundry = async (userIdx) => {
        const laundry = await Laundries.findOne({where: {userIdx: Number(userIdx)}});

        return laundry;
    }
    findLaundriesStandby = async () => {
        const laundries = await sequelize.query(
            `SELECT l.laundryIdx, u.userId, u.userIdx, l.address, l.request, s.status, s.ownerId FROM laundries l INNER JOIN laundry_statuses s ON l.laundryIdx = s.laundryIdx 
            INNER JOIN users u ON u.userIdx = l.userIdx
            WHERE s.status = '대기 중'`,
            {
                raw:true,
                nest:true,
                type: sequelize.QueryTypes.SELECT,
            }
        )
        return laundries;
    }
    findOwnerLaundry = async (userId) => {
        const laundries = await sequelize.query(
            `SELECT l.laundryIdx, u.userId, u.userIdx, l.address, l.request, s.status, s.ownerId FROM laundries l INNER JOIN laundry_statuses s ON l.laundryIdx = s.laundryIdx 
            INNER JOIN users u ON u.userIdx = l.userIdx
            WHERE '` + userId + `'= s.ownerId`,
            {
                raw:true,
                nest:true,
                type: sequelize.QueryTypes.SELECT,
            }
        )
        return laundries;
    }

    findLaundryAndStatus = async (userIdx) => {
        const laundry = await sequelize.query(
            `SELECT * FROM laundries L INNER JOIN laundry_statuses S ON L.laundryIdx = S.laundryIdx
            WHERE ` + userIdx + `= L.userIdx`,
            {
                raw:true,
                nest:true,
            }
        )
        return laundry;
    }
    findDoneLaundrybyOwner = async (userId) => {
        const laundry = await LaundryDone.findAll({where: {ownerId: userId}});

        return laundry;
    }
    findDoneLaundrybyGuest = async (userId) => {
        const laundry = await LaundryDone.findAll({where: {userId: userId}});

        return laundry;
    }
    modifyStatus = async (ownerId, userIdx, comment) => {
        const laundry = await this.findLaundryAndStatus(userIdx);
        let nextStatus;
        for(let index in Status){
            if(laundry[0].status.includes(Status[index])){
                nextStatus = Status[Number(index)+1];
                break;
            }
        }
        await LaundryStatus.update({status: nextStatus, ownerId:ownerId}, {where: {laundryIdx: laundry[0].laundryIdx}});

        if(nextStatus === '배송 완료'){
            this.destroyLaundryAndStatus(laundry[0].laundryIdx, ownerId, comment)
            return 'done';
        }

        return true;
    }
    destroyLaundryAndStatus = async (laundryIdx, ownerId, comment) => {
        const laundries = await this.findOwnerLaundry(ownerId);
        await LaundryDone.create({laundryIdx:laundryIdx, userId:laundries[0].userId, ownerId:ownerId, address:laundries[0].address, 
                                request:laundries[0].request, status:laundries[0].status, reason:comment})
        await LaundryStatus.destroy({where : {laundryIdx: Number(laundryIdx)}})
        await Laundries.destroy({where : {laundryIdx: Number(laundryIdx)}})
    }
}

module.exports = LaundryRepository;