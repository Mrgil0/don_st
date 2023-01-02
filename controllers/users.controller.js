const UserService = require('../services/users.service');
const jwt = require("jsonwebtoken");

class UsersController{
    userService = new UserService(); 

    loginUser = async (req, res, next) => {
        const { id_give, pw_give } = req.body;

        const user = await this.userService.findUser(id_give, pw_give);
        if(!user){
            return res.send({'msg': false});
        }
        const accessToken = await jwt.sign({userId: user.userId}, 'sparta-secret-key', {expiresIn: '1d'})
        const refreshToken = await jwt.sign({}, 'sparta-secret-key', {expiresIn: '7d'})

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);
        return res.send({'msg': true});
    }

    checkId = async (req, res, next) => {
        const { userId } = req.params;

        const findUser = await this.userService.findUserbyId(userId);
        if(findUser.length > 0){
            console.log(findUser.length)
            return res.send({'msg': true})
        }
        return res.send({'msg': false});
    }

    registerUser = async (req, res, next) => {
        const { id_give, pw_give, ph_give, cate_give } = req.body;
        const createUser = await this.userService.createUser(id_give, pw_give, ph_give, cate_give);

        if(createUser){
            console.log('회원가입 성공')
            return res.status(201).send({ 'msg': true });
        } else{
            console.log('회원가입 실패')
            return res.status(201).send({ 'msg': false });
        }
        
    }
}

module.exports = UsersController;