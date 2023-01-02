const { laundry : Laundries } = require('../models');
const { laundry_status : LaundryStatus } = require('../models');

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
        const laundry = await Laundries.findOne({
            where: { userIdx: Number(userIdx)}
        })
        return laundry;
    }
}

module.exports = LaundryRepository;