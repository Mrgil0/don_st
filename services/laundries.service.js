const LaundryRepository = require('../repositories/laundries.repository');
const { Laundries } = require("../models/index");

class LaundryService{
    laundryRepository = new LaundryRepository(Laundries);

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
}

module.exports = LaundryService;