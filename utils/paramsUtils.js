
export const parseListParam = (value) => {
    if (typeof value !== 'string' || value.trim() === '') {
        return [];
    }

    return value.split(',').map((item) => item.trim()).filter(Boolean);
};

export const parseDate = (value, fieldName) => {
    if (value === undefined) {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        const error = new Error(`Invalid ${fieldName}`);
        error.statusCode = 400;
        throw error;
    }

    return date;
};