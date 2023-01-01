const { user : Users } = require('../models');

class UserRepository {
    constructor(Users){
        this.Users = Users;
    }
    findUser = async (id, password) => {
        const user = await Users.findOne({
            where: { userId: id, password: password}
        });

        return user;
    }
    findUserbyId = async (id) => {
        try{
            const user = await Users.findAll({
                where: {
                    userId : id,
                }
            })
            return user;
        }
        catch(err){
            console.log('찾기 실패')
            return false;
        }
    }
    createUser = async (id, password, phone, category) => {
        let point = 0;
        if(category === '손님'){
            point = 100000
        }
        try{
            await Users.create({userId:id, password, phone, category, point: point})
        }catch(err){
            console.log('##유저 가입 에러' + err);
            return false;
        }
        return true;
    }
}

module.exports = UserRepository;