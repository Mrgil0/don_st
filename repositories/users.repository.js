const { user : Users } = require('../models');

class UserRepository {
    findUser = async (id, password) => {
        const user = await Users.findOne({
            where: { id: id, password: password}
        });

        return user;
    }
    findUserbyId = async (id) => {
        const user = await Users.findAll({
            where: {
                id,
            }
        })
        return user;
    }
    createUser = async (nickname, password) => {
        try{
            await Users.create({nickname, password})
        }catch(err){
            console.log('##유저 가입 에러' + err);
            return false;
        }
        return true;
    }
}