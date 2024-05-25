"use server"
import { customDateSchema } from '@/app/actions/schema-validators';
import { FormSubmissionReturn, Status, asyncFieldValidation, errorHandler } from '@/app/actions/validation-helpers';
import { createClient } from '@/utils/supabase/server';
import { TypeOf, z } from 'zod';

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
const supabase = createClient()
export default async function handlePrescriptionTransferRequestForm(tranferRequestId: string, prevState: any, formData: FormData):
    Promise<FormSubmissionReturn<TransferPrescriptionFormValidatedFieldsType>> {
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

    // SAVE TO DATABASE
    return await asyncFieldValidation(transferPrescriptionFormSchema, formDataObject)
        .then((validatedFields) => savePrescriptionTransfers(validatedFields, tranferRequestId))
        .then(() => updateTransferRequestStatus(tranferRequestId))
        .then(() => { return { status: Status.SUCCESS } })
        .catch(errorHandler<TransferPrescriptionFormValidatedFieldsType>)
}

async function updateTransferRequestStatus(tranferRequestId: string) {
    return await supabase.from("transfer_requests").update({
        request_status: "pharmacist-filled"
    }).eq("id", tranferRequestId).throwOnError()
}

async function savePrescriptionTransfers(validatedFields: z.SafeParseSuccess<TypeOf<typeof transferPrescriptionFormSchema>>, tranferRequestId: string) {
    validatedFields.data.prescriptions.forEach(async (prescription) => {
        const { error } = await supabase.from("prescription_transfers").insert({
            transfer_request_id: tranferRequestId,
            created_at: new Date().toISOString(),
            drug_name: prescription.drugName,
            rx_name: prescription.rxName,
            refill_date: prescription.estimatedDateToFill,
            pharmacist_first_name: validatedFields.data.transferringPharmacy.transferringPharmacistFirstName,
            pharmacist_last_name: validatedFields.data.transferringPharmacy.transferringPharmacistLastName,
            pharmacist_license_number: validatedFields.data.transferringPharmacy.transferringPharmacistLicenseNumber
        })
        console.log(error)
    })
}