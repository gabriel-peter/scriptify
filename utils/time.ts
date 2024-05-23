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