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
