import { Database, type Tables } from "@/types_db";
import { da, faker } from '@faker-js/faker';
import { createClient } from "@supabase/supabase-js";
import { ACCOUNT_TYPE } from "../enums";
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
    }).then((user) => supabase.from('profiles').insert({ // TODO need to update on boarding table....
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
    }).throwOnError());

}

async function seed() {
    for (let i = 0; i < 10; i++) {
        const result = await insertProfiles();
        console.log('Inserted profiles:', result);
    };
}


seed()
