import { z } from 'zod';

// Custom date validation function
const isTodayOrLater = (value: string | number | Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    return selectedDate >= currentDate;
};

const isAtLeast18YearsOld = (value: string | number | Date) => {
    const inputDate = new Date(value);
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return inputDate <= eighteenYearsAgo;
}

// Custom Zod schema for MM-DD-YYYY date format
export const customDateSchema = z.string().refine((value) => {
    // Validate the format using a regular expression
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(value) && isTodayOrLater(value);
}, {
    message: 'Invalid date format or date must be today or later',
});

export const earliestDob = z.string().refine((value) => {
    // Validate the format using a regular expression
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(value) && isAtLeast18YearsOld(value);
}, {
    message: 'Invalid date format or patient is less than 18 years old',
});

// Custom validation function for credit card numbers
export function isValidCreditCard(value: string): boolean {
    // Implement your credit card validation logic here
    // For simplicity, let's assume a regex pattern for a Visa card
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    return visaRegex.test(value);
}

// Custom validation function for CVV (Card Verification Value)
export function isValidCVV(value: string): boolean {
    // Implement your CVV validation logic here
    // For simplicity, let's assume a regex pattern for a 3 or 4-digit CVV
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(value.toString());
}




// // TEST
// // Example usage
// const testDate = '04-18-2024';
// const validationResult = customDateSchema.safeParse(testDate);

// if (validationResult.success) {
//     console.log('Valid date:', validationResult.data);
// } else {
//     console.error('Validation error:', validationResult.error.errors);
// }