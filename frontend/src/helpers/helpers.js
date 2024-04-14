// export function calcTotalTime(locations) {
//     let totalTimeSeconds = 0;
//
//     locations.forEach(location => {
//         totalTimeSeconds += location.stopOver * 60 || 0;
//
//         if (location.travelTimeNextLocale) {
//             totalTimeSeconds += location.travelTimeNextLocale;
//         }
//     });
//     return formatTime(totalTimeSeconds)
// }

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