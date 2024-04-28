interface CustomerRepsonse {
    softDeleted: boolean;
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    secondaryAddress: string;
    city: string;
    stateId: string;
    zipCode: string;
    partnerId: string;
    dob: string;
    gender: string;
    updatedAt: Date;
    createdAt: Date;
    deletedAt: string | null;
    isDeleted: boolean | null;
}

interface CreateCustomer {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    secondaryAddress: string;
    city: string;
    stateId: string;
    zipCode: string;
    dob: string;
    gender: string;
}
