const LaundryService = require('../services/laundries.service');

class LaundryController{
    laundryService = new LaundryService();

    createLaundry = async (req, res) => {
        const { address, picture, request } = req.body;
    }
}