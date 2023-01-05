const LaundryRepository = require('../repositories/laundries.repository');

class LaundryService{
    laundryRepository = new LaundryRepository();

    createLaundry = async (address, request, userIdx) =>{
        const result = await this.laundryRepository.createLaundry(address, request, userIdx);

        return result;
    }
    createStatus = async (userIdx) => {
        const laundry = await this.laundryRepository.findLaundry(userIdx);
        const result = await this.laundryRepository.createStatus(laundry);

        return result;
    }
    findLaundry = async (userIdx) => { 
        const laundry = await this.laundryRepository.findLaundry(userIdx);

        return laundry;
    }
    findLaundriesStandby = async () => {
        const laundries = await this.laundryRepository.findLaundriesStandby();

        return laundries;
    }
    findOwnerLaundry = async (userId) => {
        const laundries = await this.laundryRepository.findOwnerLaundry(userId);

        return laundries;
    }
    findLaundryAndStatus = async (userIdx) => {
        const laundry = await this.laundryRepository.findLaundryAndStatus(userIdx);

        return laundry;
    }
    findDoneLaundrybyOwner = async (userId) => {
        const laundry = await this.laundryRepository.findDoneLaundrybyOwner(userId);

        return laundry;
    }
    findDoneLaundrybyGuest = async (userId) => {
        const laundry = await this.laundryRepository.findDoneLaundrybyGuest(userId);

        return laundry;
    }
    modifyStatus = async (ownerId, userIdx, comment) => {
        const result = await this.laundryRepository.modifyStatus(ownerId, userIdx, comment);

        return result;
    }
    deleteLaundry = async (laundryIdx, user, laundryReason) => {
        const result = await this.laundryRepository.destroyLaundryAndStatus(laundryIdx, user, laundryReason, 'guest');

        return result;
    }
    createComment = async (laundryIdx, userId, star, comment) => {
        const result = await this.laundryRepository.createComment(laundryIdx, userId, star, comment);

        return result;
    }
}

module.exports = LaundryService;