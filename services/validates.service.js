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
}