
export function validateWord(label, text) {
    if (text === null || text === "") {
        return label + ' is required. Please try again.'
    }

    const isWord = new RegExp("^[a-z]+$", "i");
    if (!isWord.test(text)) {
        return label + ' is not a valid word. Please try again.'
    }

    return "";
}

export function validateDrivingLicense(label, text) {
    if (text === null || text === "") {
        return label + ' is required. Please try again'
    }

    const isLicense = new RegExp("^[A-Z 0-9]+$");
    if (!isLicense.test(text)) {
        return label + ' can only include capital letters, numbers and spaces. Please try again.'
    }

    return "";
}

export function validateDOB(label, dob) {
    if (dob === null || dob === "") {
        return label + ' is required. Please try again.'
    }

    const today = new Date();
    const date = new Date(dob);
    const lowerLimit = new Date();
    lowerLimit.setFullYear(today.getFullYear() - 110);
    const upperLimit = new Date();
    upperLimit.setFullYear(today.getFullYear() - 16);

    if (date < lowerLimit) {
        return label + ' cannot be over 110 years ago. Please try again.'
    }

    if (date > upperLimit) {
        return label + ' cannot be less than 16 years ago. Please try again.'
    }

    return "";
}

export function validateNumber(label, number) {
    if (number === null || number === "") {
        return label + ' is required. Please try again.'
    }

    const isNumber = new RegExp("^[a-z]+$", "i");
    if (isNumber.test(number)) {
        return label + ' is not a valid number. Please try again.'
    }
    
    if(number < 1){
        return label + ' cannot be 0 or below. Please try again.'
    }

    return "";
}