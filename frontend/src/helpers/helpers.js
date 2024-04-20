
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

export function formatCamelCase(input){
    const words = input.split(/(?=[A-Z)])/);
    const formatted = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return formatted;
}

export function isValidStartTime(time) {
    const parts = time.split(':');
    return parts.length === 3;
}

//TODO Bug to solve time issue

// export function isFirstTwoDigitsOver24 (timeString){
//     const [hours] = timeString.split(':').map(Number);
//     return hours > 24;
// }

// export function calcPastMidnight(startTime, totalTravelTime){
//     const startTimeMilliseconds = timeToMilliseconds(startTime);
//     const secondsToAdd = totalTravelTime;
//     const currentTime = new Date();
//
//     const newTime = new Date(currentTime.getTime() + secondsToAdd * 1000);
//
//     const newTimeMilliseconds = newTime.getHours() * 3600000 + newTime.getMinutes() * 60000 + newTime.getSeconds() * 1000;
//    
//     return newTimeMilliseconds < startTimeMilliseconds;
// }
//
// const timeToMilliseconds = (time) => {
//     const [hours, minutes, seconds] = time.split(':').map(Number);
//     return hours * 3600000 + minutes * 60000 + seconds * 1000;
// };

export function calculateTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = tomorrow.getMonth() + 1;
    const day = tomorrow.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}