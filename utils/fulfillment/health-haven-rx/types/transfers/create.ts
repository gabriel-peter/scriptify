// CREATE TRANFER TYPES 
interface ExistingPharmacyAndPatientPayload {
    drugId: string;
    registeredPatientId: number;
    registeredPharmacyId: number;
    notes: string;
    transferStatusId: string;
}

interface NewPatientAndPharmacyPayload {
    drugId: string;
    registeredPatientId: number; // Should be 0 if creating a new patient
    registeredPharmacyId: number; // Should be 0 if the pharmacy is not in the API call
    patientFirstName: string;
    patientLastName: string;
    patientEmail: string;
    patientPhone: string;
    patientDateOfBirth: string;
    pharmacyName: string;
    pharmacyPhone: string;
    notes: string;
    transferStatusId: string;
}

interface NewPatientAndExistingPharmacyPayload {
    drugId: string;
    registeredPatientId: number; // Should be 0 if creating a new patient
    registeredPharmacyId: number;
    patientFirstName: string;
    patientLastName: string;
    patientEmail: string;
    patientPhone: string;
    patientDateOfBirth: string;
    notes: string;
    transferStatusId: string;
}

interface NewPharmacyWithExistingPatientPayload {
    drugId: string;
    registeredPatientId: number;
    registeredPharmacyId: number; // Should be 0 if the pharmacy is not in the API call
    pharmacyName: string;
    pharmacyPhone: string;
    notes: string;
    transferStatusId: string;
}