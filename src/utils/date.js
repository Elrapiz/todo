export function getCurrentDateVerbose() {
    const currentDate = new Date();

    return formatVerbose(currentDate);
}

export function getVerboseDate(date) {
    return formatVerbose(date);
}

function formatVerbose(date) {
    const formatter = Intl.DateTimeFormat('en-PH', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return formatter.format(new Date(date));
}