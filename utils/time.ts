export function toHumanReadableTime(dateString: string, local?: boolean) {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
        // timeZoneName: "short",
    };

    if (local) {
        return date.toLocaleString("en-US", options);
    }
    return Intl.DateTimeFormat("en-US", options).format(date);
}

export function toHumanReadableDate(options: Intl.DateTimeFormatOptions, dateString: string, local?: boolean) {
    const date = new Date(dateString);

    if (local) {
        return date.toLocaleString("en-US", options);
    }
    return Intl.DateTimeFormat("en-US", options).format(date);
}

export function localizedDate(date: Date) {
    return date.toLocaleDateString('en-US', { timeZone: 'UTC', day: "numeric", month: 'long', year: 'numeric' })
}

export function formatDateWithTimezoneOffset(date: Date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
}

// AI-Generated
export function generateTimeOptions(startTime: string, intervalMinutes: number, endTime: number) {
    const times: string[] = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00`);

    while (currentTime.getHours() < endTime) {
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();

        // Format the hours and minutes to HH:MM
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        times.push(formattedTime);

        // Add interval
        currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }

    return times;
}