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
        console.log('서비스', id);
        const users = await this.userRepository.createUser(id, password, phone, category);

        return users;
    }
}

module.exports = UserService;