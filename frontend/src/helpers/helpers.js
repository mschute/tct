
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

//TODO Bug to solve time issue

// export function isFirstTwoDigitsOver24 (timeString){
//     const [hours] = timeString.split(':').map(Number);
//     return hours > 24;
// }

// export function calcPastMidnight(startTime, totalTravelTime){
//     const startingTime = timeToMilliseconds(startTime);
//     console.log("Starting time: " + startingTime);
//     const secondsToAdd = totalTravelTime;
//     const currentTime = new Date();
//
//     const newTime = new Date(currentTime.getTime() + secondsToAdd * 1000);
//
//     //const startTimeMilliseconds = timeToMilliseconds(startingTime);
//     const newTimeMilliseconds = newTime.getHours() * 3600000 + newTime.getMinutes() * 60000 + newTime.getSeconds() * 1000;
//
//     if (newTimeMilliseconds < startingTime){
//         return true
//     } else {
//         return false
//     }
// }
//
// const timeToMilliseconds = (time) => {
//     const [hours, minutes, seconds] = time.split(':').map(Number);
//     return hours * 3600000 + minutes * 60000 + seconds * 1000;
// };
