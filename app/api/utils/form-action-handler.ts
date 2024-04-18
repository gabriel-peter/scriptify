import { z } from 'zod'

// TODO
// export function handleFormValidation<T>(formDataSchema: z.ZodObject<T>, ) {
//     const validatedFields = formDataSchema.safeParse(rawFormData)
//     console.log(userId)
//     // Return early if the form data is invalid
//     if (!validatedFields.success) {
//         console.log("Validation Failed.")
//         console.log(validatedFields.error.flatten().fieldErrors)
//         return {
//             error: validatedFields.error.flatten().fieldErrors,
//         }
//     } else {
//         console.log(validatedFields.data);
//         // redirect('/get-started/patient/transfer') // Navigate to the new page
//         // SAVE DATA TO DB
//         // mutate data
//         // revalidate cache
//         // Advance Page,
//         return {
//             message: "SUCCESS"
//         }

//     }
// }