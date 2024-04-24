import {getRoles} from "@testing-library/react";
import rolesService from "../service/RolesService";

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

export function validateMultipleWords(label, text) {
    if (text === null || text === "") {
        return label + ' is required. Please try again.'
    }

    const isWord = new RegExp("^[a-z ]+$", "i");
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

export function validateDate(label, date) {
    if (date === null || date === "" || date === "dd/mm/yyy") {
        return label + ' is required. Please try again.'
    }

    return "";
}

export function validatePrice(label, price) {
    if (price === null || price === "") {
        return label + ' is required. Please try again.'
    }
    
    if (price < 50) {
        return label + ' must be over 50. Please try again.'
    }

    return "";
}

export function validateTime(label, time) {
    if (time === null || time === "" || time === "--:--") {
        return label + ' is required. Please try again.'
    }

    return "";
}

export function validateTimeDifference(label1, label2, time1, time2) {
    if (time1 > time2) {
        return label2 + ' cannot be earlier than ' + label1 + '. Please try again.'
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

export function validateLatitude(label, lat) {
    if (lat === null || lat === "") {
        return label + ' is required. Please try again.'
    }

    const isLat = new RegExp("^([-+]?\d{1,2}([.]\d+)?)$");
    if (isLat.test(lat)) {
        return label + ' is not a valid latitude. Please try again.'
    }
    
    return "";
}

export function validateLongitude(label, lng) {
    if (lng === null || lng === "") {
        return label + ' is required. Please try again.'
    }

    const isLng = new RegExp('^([-+]?\d{1,3}([.]\d+)?)$');
    if (isLng.test(lng)) {
        return label + ' is not a valid longitude. Please try again.'
    }
    
    return "";
}

export function validateNotEmpty(label, value) {
    if (value === null || value === "") {
        return label + ' is required. Please try again.'
    }
    
    return "";
}

export function validateLocations(label, locations) {
    if (locations === null || locations === "") {
        return label + ' is required. Please try again.'
    }

    if (locations.length < 3) {
        return 'At least 3 locations are required. Please try again.'
    }

    return "";
}

export function validateSelection(label, selection) {
    if (selection === null || selection === "") {
        return label + ' is required. Please try again.'
    }

    return "";
}