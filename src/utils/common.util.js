const bcrypt = require('bcryptjs');

const getEnum = (obj) => {
    return Object.keys((obj))
            .map((key) => {
                return obj[key];
            })
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const SUCCESS_RESPONSE = (data=null, message="", status=200) => {
    return {status, success: true, data, message};
}

const ERROR_RESPONSE = (err=null, message="INTERNAL SERVER ERROR", status=500) => {
    return {status, success: false, err, message};
}

const generateCalculations = (obj) => {

    const totalMarks = parseInt(obj.mathMarks) + parseInt(obj.englishMarks) +  parseInt(obj.kinyarwandaMarks) + 
                        parseInt(obj.socialMarks) + parseInt(obj.frenchMarks);
    
    const averageMarks = (totalMarks / 5);

    const percentage = (totalMarks / obj.totalFullMarks * 100);

    return {totalMarks, averageMarks, percentage};
};


const generateTotalsCalculations = (obj) => {

    const totalMarks = parseInt(obj.totalMathMarks) + parseInt(obj.totalEnglishMarks) +  parseInt(obj.totalKinyarwandaMarks) + 
                        parseInt(obj.totalSocialMarks) + parseInt(obj.totalFrenchMarks);
    

    return totalMarks;
};


module.exports = { 
    getEnum, 
    generateTotalsCalculations,
    generateCalculations,
    hashPassword,
    SUCCESS_RESPONSE, ERROR_RESPONSE
}