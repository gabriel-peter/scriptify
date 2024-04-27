// Sub-types

interface Drug {
    id: number;
    name: string | null;
    label: string;
    price: string;
    quantity: string;
    ndc: string;
    dosage: string | null;
    drugFormId: string;
    drugCategoryId: string;
    drugClassId: string;
    drugTypeId: string;
    ageGroupId: string;
    refillable: boolean;
    refillLimit: string;
    tierOne: string;
    tierTwo: string;
    tierThree: string;
    tierFour: string;
    tierFive: string;
    erxRequired: string;
    active: boolean;
    minQuantity: string;
    maxQuantity: string;
    quantityAllowed: string;
    softDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Pharmacy {
    id: number;
    name: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    secondaryAddress: string | null;
    city: string;
    stateId: string;
    zipCode: string;
    partnerId: string | null;
    dob: string;
    gender: string;
    deletedAt: string | null;
    isDeleted: null; // Please confirm the type of this field
    softDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface TransferStatus {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Partner {
    id: number;
    name: string;
    website: string;
    address: string;
    secondaryAddress: string | null;
    city: string;
    stateId: string;
    zipCode: string;
    brandBox: string;
    tier: "tier_one" | "tier_two" | "tier_three"; // Assuming tier has one of these specific values
    sandBoxKey: string | null;
    liveKey: string;
    softDeleted: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    partnerId: number | null;
}


interface TransferDay {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

// Full Responses

interface TransferListResponse {
    id: number;
    name: string | null;
    customerId: string;
    partnerId: string;
    pharmacyId: string;
    transferDrugId: number;
    sigId: string;
    transferDayId: number;
    transferStatusId: string;
    providerName: string;
    notes: string;
    providerPhone: string;
    createdAt: Date;
    updatedAt: Date;
    Drug: Drug;
    Pharmacy: Pharmacy;
    Customer: Customer;
    TransferStatus: TransferStatus;
    Partner: Partner;
}[]

interface TransferDetailResponse {
    id: number;
    name: string | null;
    customerId: string;
    partnerId: string;
    pharmacyId: string;
    transferDrugId: number;
    sigId: string | null;
    transferDayId: number;
    transferStatusId: string;
    providerName: string;
    notes: string;
    providerPhone: string;
    createdAt: Date;
    updatedAt: Date;
    TransferStatus: TransferStatus;
    Sig: null;
    Customer: Customer;
    Pharmacy: Pharmacy;
    Drug: Drug;
    TransferDay: TransferDay;
    Partner: Partner;
}