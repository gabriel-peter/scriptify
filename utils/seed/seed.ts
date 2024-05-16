import { Database, type Tables } from "@/types_db";
import { da, faker } from '@faker-js/faker';
import { User, createClient } from "@supabase/supabase-js";
import { ACCOUNT_TYPE } from "../enums";
import { updateOnBoardingStep } from "@/app/api/get-started/update-onboarding-progress";
import { transferPrescription } from "@/components/forms/transfer/transfer-request-form-handler";
import { Status } from "@/components/forms/validation-helpers";
const supabase = createClient<Database>(
    'http://127.0.0.1:54321',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
)

// Function to generate a random US state
const getRandomState = () => {
    const states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
        'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    return states[Math.floor(Math.random() * states.length)];
};

// Insert dummy data into 'profiles' table
const insertProfiles = async () => {
    const data = {
        email: faker.internet.email(),
        password: "password",
        options: {
            data: {
                account_type: faker.helpers.arrayElement(Object.values(ACCOUNT_TYPE))
            }
        }
    }
    console.log(data)

    return await supabase.auth.signUp(data).then(async ({ error, data: { user } }) => {
        if (error) { console.error(error); throw new Error(error.message) }
        if (user?.user_metadata['account_type'] as ACCOUNT_TYPE === ACCOUNT_TYPE.PATIENT) {
            console.log("patient_on_boaring_complete being created")
            await supabase.from("patient_on_boaring_complete").insert({ user_id: user!.id }).throwOnError()
        }
        if (user?.user_metadata['account_type'] as ACCOUNT_TYPE === ACCOUNT_TYPE.PHARMACIST) {
            console.log("pharmacist_on_boaring_complete being created")
            await supabase.from("pharmacist_on_boarding_complete").insert({ user_id: user!.id }).throwOnError()
        }

        return user;
    }).then(async (user) => {
        await supabase.from('profiles').insert({ // TODO need to update on boarding table....
            id: user?.id,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            sex: faker.person.sex().toLocaleUpperCase(),
            address1: faker.address.streetAddress(),
            city: faker.address.city(),
            state_enum: getRandomState() as Tables<"profiles">['state_enum'],
            zip_code: faker.address.zipCode(),
            date_of_birth: faker.date.past(50).toISOString(), // Generate date of birth within the last 50 years
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }).throwOnError()
        return user
    }).then((user) => {
        updateOnBoardingStep(user!.id, "personal_info", true, supabase)
        return user
    });

}

const testPharmacyNames = [
    'Healthy Choice Pharmacy',
    'Rainbow Pharmacy',
    'Wellcare Pharmacy',
    'Sunshine Pharmacy',
    'Vitality Pharmacy',
    'Emerald Pharmacy',
    'Harmony Pharmacy',
    'Peak Pharmacy',
    'Brightside Pharmacy',
    'Starlight Pharmacy'
]

async function createTransferRequests(userId: string, pharmacists: User[]) {
    var pharmacist = pharmacists[Math.floor(Math.random() * pharmacists.length)];
    console.log(pharmacist)
    const rawFormData = new FormData()
    rawFormData.append('pharmacy-name', faker.helpers.arrayElement(testPharmacyNames)),
        rawFormData.append('email', pharmacist.email as string),
        rawFormData.append('phone-number', faker.phone.number()),
        rawFormData.append("email-body", "TEST"),
        rawFormData.append("email-heading", "TEST")

    const result = await transferPrescription(userId, new FormData(), rawFormData, supabase)
    console.log(result)
}

async function seed(profileCount: number, transferCount: number) {
    const users = []
    for (let i = 0; i < profileCount; i++) {
        const user = await insertProfiles();
        users.push(user)
        console.log('Inserted profiles:', user);
    };
    const patients = users.filter(user => user?.user_metadata['account_type'] === ACCOUNT_TYPE.PATIENT)
    console.log("PATIENTS", patients)
    const pharmacists = users.filter(user => user?.user_metadata['account_type'] === ACCOUNT_TYPE.PHARMACIST).filter(e => e !== null)
    console.log("PHARMACISTS", pharmacists)
    for (let i = 0; i < patients.length; i++) {
        for (let j = 0; j < transferCount; j++) {
            createTransferRequests(patients[i]!.id, pharmacists)
        }
    }
    return users
}

seed(50, 3)
