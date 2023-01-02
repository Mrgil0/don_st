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
}

module.exports = LaundryService;