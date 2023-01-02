const UserRepository = require('../repositories/users.repository');
const { user : Users } = require('../models');

class UserService {
    userRepository = new UserRepository(Users);
    
    findUser = async (id, password) => {
        const users = await this.userRepository.findUser(id, password);

        return users
    }

    findUserbyId = async (id) => {
        const users = await this.userRepository.findUserbyId(id);

        return users;
    }

    createUser = async (id, password, phone, category) => {
        const users = await this.userRepository.createUser(id, password, phone, category);

        return users;
    }
    decreasePoint = async (userIdx, point) => {
        await this.userRepository.decreasePoint(userIdx, point);
    }
}

module.exports = UserService;