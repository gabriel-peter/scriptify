import { z } from 'zod';

// Custom date validation function
const isTodayOrLater = (value: string | number | Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    return selectedDate >= currentDate;
};

// Custom Zod schema for MM-DD-YYYY date format
export const customDateSchema = z.string().refine((value) => {
    // Validate the format using a regular expression
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(value) && isTodayOrLater(value);
}, {
    message: 'Invalid date format or date must be today or later',
});



// TEST
// Example usage
const testDate = '04-18-2024';
const validationResult = customDateSchema.safeParse(testDate);

if (validationResult.success) {
    console.log('Valid date:', validationResult.data);
} else {
    console.error('Validation error:', validationResult.error.errors);
}