// Round a number to 2 decimal places
const roundToTwo = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

// Get the start and end of the current month as ISO strings
const getCurrentMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
    return { start, end };
};

module.exports = { roundToTwo, getCurrentMonthRange };