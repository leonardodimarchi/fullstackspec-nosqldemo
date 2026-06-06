
export const handleError = (res, error, defaultMessage) => {
    const statusCode = error?.statusCode || 400;
    return res.status(statusCode).json({ error: defaultMessage, details: error.message });
};