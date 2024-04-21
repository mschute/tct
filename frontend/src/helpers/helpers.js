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