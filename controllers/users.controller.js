const UserService = require('../services/users.service');
const jwt = require("jsonwebtoken");
const validateService = require('../services/validates.service')

class UserController{
    userService = new UserService(); 

    loginUser = async (req, res, next) => {
        const { id, password } = req.body;

        if(validateService.validateTwoData(id, password) === 'twoEmpty'){
            return res.status(404).json({success: false, message: '아이디와 비밀번호를 입력해주세요.'});
        }

        const user = await this.userService.findUser(id, password);
        if(!user){
            return res.status(404).json({success: false, message: '아이디나 비밀번호가 틀렸습니다.'});
        }
        const accessToken = await jwt.sign({id: existUsers.id}, 'sparta-secret-key', {expiresIn: '1d'})
        const refreshToken = await jwt.sign({}, 'sparta-secret-key', {expiresIn: '7d'})

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);
        res.send({
            accessToken
        })
    }

    signupUser = async (req, res) => {
        const { id, password, confirmPassword } = req.body;

        const validateUser = validateService.validateUserData(id, password, confirmPassword);
        if(validateUser){
            return res.status(412).json(validateUser)
        }

        const findUser = await this.userService.findUserbyId(id);

        if(findUser.length > 0){
            return res.status(412).json({success: false, message: '중복된 닉네임입니다.'})
        }
        const createUser = await this.userService.createUser(id, password);

        if(createUser){
            res.status(201).send({ message: "회원 가입에 성공하였습니다." });
        } else{
            return res.status(500).json({success: false, message: '삭제에 실패했습니다.'})
        }
        
    }
}

module.exports = UsersController;