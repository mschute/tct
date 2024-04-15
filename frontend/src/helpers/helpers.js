
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