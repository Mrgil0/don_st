class validateData{
    validateTwoData = async (data1, data2) => {
        if ([data1, data2].includes('')){
            return 'twoEmpty';
        }
    }
    validateOneData = async (data) => {
        if (data === '' || data === undefined){
            return 'oneEmpty';
        }
    }
    validateUserData = async (nickname, password, confirmPassword) => {
        const idRegex = /^[a-zA-Z0-9]{3,15}$/     // 영어 & 숫자가 나오면서 3-15글자 사이여야 통과됨
        const pwRegex = /^[a-zA-Z0-9]{4,15}$/
        if(password != confirmPassword){
            return {success: false, message: '패스워드가 일치하지 않습니다.'}
        } else if(idRegex.test(nickname) === false){
            return {success: false, message: 'ID 형식이 일치하지 않습니다.'}
        } else if(pwRegex.test(password) === false){
            return {success: false, message: '패스워드 형식이 일치하지 않습니다.'}
        } else if(password.includes(nickname)){
            return {success: false, message: '패스워드에 닉네임이 포함되어 있습니다.'}
        }
        return false;
    }
}