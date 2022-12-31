const UserRepository = require('../repositories/users.repository');

class UserService {
    userRepository = new UserRepository();
    
    findUser = async (id, password) => {
        const users = await userRepository.finduser(id, password);

        return users
    }

    findUserbyId = async (id) => {
        const users = await userRepository.findUserbyId(id);

        return users;
    }

    createUser = async (id, password) => {
        const users = await userRepository.createUser(id, password);

        return users;
    }
}