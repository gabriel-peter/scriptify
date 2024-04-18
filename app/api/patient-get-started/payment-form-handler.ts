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

export async function savePatientPaymentInformation(userId: string, prevState: any, formData: FormData) {

}
