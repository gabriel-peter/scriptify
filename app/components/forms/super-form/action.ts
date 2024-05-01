import { ZodType, z } from "zod";
import { FormSubmissionReturn } from "../validation-helpers";


export type FieldErrors<U extends ZodType<any, any, any>> = z.inferFlattenedErrors<U>["fieldErrors"]
export default async function action<T>(userId: string, prevState: any, formData: FormData): Promise<FormSubmissionReturn<FieldErrors<T>>> {
    
}