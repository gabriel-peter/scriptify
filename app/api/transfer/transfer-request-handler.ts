"use client"
import { z } from 'zod';
import { customDateSchema } from '../utils/schema-validators';

// Define the schema for transferring pharmacy information
const transferringPharmacySchema = z.object({
    ncpdp: z.string().min(2).max(20),
    transferringPharmacistFirstName: z.string().min(2).max(50),
    transferringPharmacistLastName: z.string().min(2).max(50),
    transferringPharmacistLicenseNumber: z.string().min(2).max(20),
});

// Define the schema for prescription information
const prescriptionSchema = z.object({
    rxName: z.string().min(2).max(100),
    drugName: z.string().min(2).max(100),
    estimatedDateToFill: customDateSchema, // You can further specify the date format if needed
});

// Define the schema for the entire form
const transferPrescriptionFormSchema = z.object({
    transferringPharmacy: transferringPharmacySchema,
    prescriptions: z.array(prescriptionSchema),
});

export type TransferringPharmacyValidatedFieldType = z.inferFlattenedErrors<typeof transferringPharmacySchema>["fieldErrors"]
export type TransferPrescriptionFormValidatedFieldsType = z.inferFormattedError<typeof transferPrescriptionFormSchema>
export type PrescriptionFormatedErrorType = z.inferFormattedError<typeof prescriptionSchema>
export default function handlePrescriptionTransferRequestForm(userId: string, prevState: any, formData: FormData) {
    const transferringPharmacyData = {
        ncpdp: formData.get('ncpdp'),
        transferringPharmacistFirstName: formData.get('transferring-pharmacist-first-name'),
        transferringPharmacistLastName: formData.get('transferring-pharmacist-last-name'),
        transferringPharmacistLicenseNumber: formData.get('transferring-pharmacist-license-number'),
    };

    // Extract prescriptions array from FormData
    const prescriptionsData: any[] = [];
    console.log("KEYS", formData.keys()) // Get all implies array structure.
    const prescriptionCountStr = formData.get("prescription-count")
    if (prescriptionCountStr === null) {
        throw Error("prescription count element was omitted.")
    } else {
    }
    const prescriptionCount: number | null = Number.parseInt(prescriptionCountStr.toString())
    for (let i = 1; i <= prescriptionCount; i++) { // Assuming there are 2 prescriptions, adjust as needed
        const rxName = formData.get(`rx-name-${i}`);
        const drugName = formData.get(`drug-name-${i}`);
        const estimatedDateToFill = formData.get(`estimated-date-to-fill-${i}`);
        console.log(estimatedDateToFill)
        prescriptionsData.push({
            rxName,
            drugName,
            estimatedDateToFill,
        });
    }

    // Combine all extracted data
    const formDataObject = {
        transferringPharmacy: transferringPharmacyData,
        prescriptions: prescriptionsData,
    };
    const validationResult = transferPrescriptionFormSchema.safeParse(formDataObject);

    if (validationResult.success) {
        console.log('Valid form data');
        return {
            message: "SUCCESS"
        }
    } else {
        const formattedErrors = validationResult.error.format()
        console.error(formattedErrors);
        return {
            error: formattedErrors
        }
    }

}