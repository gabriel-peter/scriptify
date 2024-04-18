import { z } from 'zod';

const formDataSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(1),
    // .regex(/^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/),
    streetAddress: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    postalCode: z.string().min(1)
    // .regex(/^\d{5}(?:[-\s]\d{4})?$/),
});

// Custom validation function for credit card numbers
function isValidCreditCard(value: string): boolean {
    // Implement your credit card validation logic here
    // For simplicity, let's assume a regex pattern for a Visa card
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    return visaRegex.test(value);
}

// Custom validation function for CVV (Card Verification Value)
function isValidCVV(value: string): boolean {
    // Implement your CVV validation logic here
    // For simplicity, let's assume a regex pattern for a 3 or 4-digit CVV
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(value);
}

// Define the schema for credit card information
const creditCardSchema = z.object({
    // cardHolderFirstName: z.string().min(1),
    // cardHolderLastName: z.string().min(1),
    creditCardNumber: z.string().refine(isValidCreditCard, {
        message: 'Invalid credit card number',
    }),
    cvv: z.string().refine(isValidCVV, {
        message: 'Invalid CVV',
    }),
    expiration: z.string().regex(/^\d{2}\/\d{2}$/, {
        message: 'Invalid expiration date. Use format MM/YY',
    }),
});

// Example usage
const creditCardInfo = {
    creditCardNumber: '4111111111111111',
    cvv: '123',
    expiration: '12/23',
};

export type CreditCardFormvalidatedFieldsType = z.inferFlattenedErrors<typeof creditCardSchema>["fieldErrors"]
export async function savePatientPaymentInformation(userId: string, prevState: any, formData: FormData) {
    const rawFormData = {
        creditCardNumber: formData.get("card-number"),
        expiration: formData.get("card-expiration-date"),
        cvv: formData.get("card-cvc")
    }
    const validationResult = creditCardSchema.safeParse(rawFormData);

    if (!validationResult.success) {
        console.log('Valid credit card information');
        console.log(validationResult.error.flatten().fieldErrors)
        return {
            error: validationResult.error.flatten().fieldErrors
        }
    } else {
        return {
            message: "SUCCESS"
        }
    }

}
