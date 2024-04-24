export function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return (`${hours} hours ${minutes} mins`);
}

export function formatToClock(totalSeconds) {
    const endHours = Math.floor(totalSeconds / 3600);
    const endMinutes = Math.floor((totalSeconds % 3600) / 60);
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
}

export function formatCamelCase(input) {
    const words = input.split(/(?=[A-Z)])/);
    const formatted = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return formatted;
}

export function isValidStartTime(time) {
    const parts = time.split(':');
    return parts.length === 3;
}

export function isFirstTwoDigitsOver24(timeString) {
    const time = formatToClock(timeString)
    const [hours] = time.split(':').map(Number);

    return hours >= 24;
}

export function calculateTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = tomorrow.getMonth() + 1;
    const day = tomorrow.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

export function validateWord(label, text) {
    if (text === null || text === "") {
        return label + ' is required. Please try again'
    }

    const isWord = new RegExp("^[a-z]+$", "i");
    if (!isWord.test(text)) {
        return label + ' is not a valid word. Please try again'
    }

    return "";
}

export function validateDOB(label, dob) {
    if (dob === null || dob === "") {
        return label + ' is required. Please try again'
    }
    
    const today = new Date();
    const date = new Date(dob);
    const lowerLimit = new Date();
    lowerLimit.setFullYear(today.getFullYear() - 110);
    const upperLimit = new Date();
    upperLimit.setFullYear(today.getFullYear() - 16);
    
    if (date < lowerLimit) {
        return label + ' cannot be over 110 years ago. Please try again'
    }

    if (date > upperLimit) {
        return label + ' cannot be less than 16 years ago. Please try again'
    }

    return "";
}