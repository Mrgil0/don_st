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
            return res.send({'msg': false});
        }

        const laundryResult = await this.laundryService.createLaundry(address_give, request_give, user.userIdx);
        const statusResult = await this.laundryService.createStatus(user.userIdx)

        if(statusResult && laundryResult){
            await this.userService.decreasePoint(user.userIdx, user.point - 20000)
            return res.send({'msg': true});
        } 
        return res.send({'msg': false});
    }
    findLaundryList = async (req, res) => {
        const laundry = await this.laundryService.findLaundries();

        if(laundry.length > 0){
            return laundry
        }
        return [];
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
                next();
            }
            res.locals.laundry = laundry;
            next();
        }
    }
}

module.exports = LaundryController;