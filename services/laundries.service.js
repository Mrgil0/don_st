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
    findLaundries = async () => {
        const laundries = await this.laundryRepository.findLaundries();

        return laundries;
    }
    findLaundryAndStatus = async (userIdx) => {
        const laundry = await this.laundryRepository.findLaundryAndStatus(userIdx);

        return laundry;
    }
    modifyStatus = async (userIdx) => {
        const result = await this.laundryRepository.modifyStatus(userIdx);

        return result;
    }
}

module.exports = LaundryService;