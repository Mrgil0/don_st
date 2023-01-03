const { laundry : Laundries } = require('../models');
const { laundry_status : LaundryStatus } = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize("don_st", "admin", "spa142857",{
    host: "sparta-gil.cylo4tomjgga.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
});

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
            `SELECT * FROM laundries L INNER JOIN laundry_statuses S ON L.laundryIdx = S.laundryIdx
            WHERE S.status = '대기'`,
            {
                raw:true,
                nest:true,
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
}

module.exports = LaundryRepository;