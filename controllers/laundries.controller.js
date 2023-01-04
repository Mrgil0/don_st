const { nextTick } = require('process');
const LaundryService = require('../services/laundries.service');
const UserService = require('../services/users.service');

class LaundryController{
    laundryService = new LaundryService();
    userService = new UserService(); 

    createLaundry = async (req, res) => {
        const { address_give, request_give } = req.body;
        const user = res.locals.user

        const laundry = await this.laundryService.findLaundry(user.userIdx);

        if(laundry){
            return res.send({'msg': '실패'});
        }

        const laundryResult = await this.laundryService.createLaundry(address_give, request_give, user.userIdx);
        const statusResult = await this.laundryService.createStatus(user.userIdx)

        if(statusResult && laundryResult){
            await this.userService.decreasePoint(user.userIdx, user.point - 20000)
            return res.send({'msg': '신청'});
        } 
        return res.send({'msg': '실패'});
    }
    findLaundriesStandby = async (req, res) => {
        const laundry = await this.laundryService.findLaundriesStandby();
        if(laundry.length > 0){
            return laundry
        }
        return false;
    }
    findOwnerLaundry = async (user) => {
        const laundry = await this.laundryService.findOwnerLaundry(user.userId);
        if(laundry.length > 0){
            return laundry
        }
        return false;
    }
    findLaundryAndStatus = async (req, res, next) => {
        const user = res.locals.user;
        if(!user){
            res.locals.laundry = false;    
            next();
        } else{
            const laundry = await this.laundryService.findLaundryAndStatus(user.userIdx);
            if(laundry.length <= 0){
                res.locals.laundry = false;    
                return next();
            }
            res.locals.laundry = laundry;
            next();
        }
    }
    findDoneLaundrybyOwner = async (user) => {
        const laundry = await this.laundryService.findDoneLaundrybyOwner(user.userId);

        return laundry;
    }
    findDoneLaundrybyGuest = async (user) => {
        const laundry = await this.laundryService.findDoneLaundrybyGuest(user.userId);

        return laundry;
    }
    updateLaundry = async (req, res) => {
        const user = res.locals.user;
        const { userIdx } = req.body;
        let comment;
        try{
            comment = req.body['comment']
        }catch(e){}
        const result = await this.laundryService.modifyStatus(user.userId, userIdx, comment);

        if(result === 'done'){
            await this.userService.increasePoint(user.userId, user.point + 20000)
        }

        if(result){
            return res.send({'msg': '수정'});
        } else{
            return res.send({'msg': '실패'});
        }
    }
}

module.exports = LaundryController;