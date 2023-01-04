const { laundry : Laundries } = require('../models');
const { laundry_status : LaundryStatus } = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize("don_st", "admin", "spa142857",{
    host: "sparta-gil.cylo4tomjgga.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
});
const Status = ['대기', '수거', '수거완료', '배송', '배송완료'];

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
            const result = await LaundryStatus.create({laundryIdx:laundry.laundryIdx, status:'대기'});
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
    findLaundries = async () => {
        const laundries = await sequelize.query(
            `SELECT l.laundryIdx, u.userId, l.address, l.request, s.status FROM laundries l INNER JOIN laundry_statuses s ON l.laundryIdx = s.laundryIdx 
            INNER JOIN users u ON u.userIdx = l.userIdx
            WHERE s.status = '대기'`,
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
    modifyStatus = async (userIdx) => {
        const laundry = findLaundryAndStatus(userIdx);
        const index = Status.findIndex(laundry.status);

        await LaundryStatus.update({status: Status[index+1]}, {where: {userIdx: Number(userIdx)}});

        return true;
    }
}

module.exports = LaundryRepository;