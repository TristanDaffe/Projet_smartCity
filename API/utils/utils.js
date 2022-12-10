module.exports.validateString = (string, field) => {
    let errorCode = 202;
    let message = "";
    if ( string === null || string === undefined ){
        errorCode = 412;
        message = field +" can't be null or undefined"
    }
    else{
        if(string.trim() === ""){
            errorCode = 412;
            message = field +" can't be empty"
        }
    }
    return {errorCode, message};
}

module.exports.validateEmail = (email) => {
    let errorCode = 202;
    let message = "";
    if(email === null || email === undefined ){
        errorCode = 412;
        message = "Email is null or undefined";
    }
    else{
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]+');
        if( !regex.test(email) ){
            errorCode = 412;
            message = "Email format is unvalid";
        }
    }
    return {errorCode, message};
}

module.exports.validateDate = (date) =>{
    let errorCode = 202;
    let message = "";

    if(date === null || date === undefined ){
        errorCode = 412;
        message = "Date is null or undefined";
    }
    else{
        let regex = new RegExp('[0-3][0-9]/[0-2][0-9]/[0-9]{4}');
        if(!regex.test(date)){
            errorCode = 412;
            message = "Date format is unvalid (dd/mm/yyyy)";
        }
    }

    return {errorCode, message};
}