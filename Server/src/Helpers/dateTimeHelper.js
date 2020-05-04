export const msToStringHour = ms => {
    const hour = Math.floor(ms / 36e5)
    const hourStr = (hour < 10 ? '0' : '') + hour
    const minutes = Math.round(60 * ((ms / 36e5) % 1))
    const minutesStr = (minutes < 10 ? '0' : '') + minutes
    return `${hourStr}:${minutesStr}`
}