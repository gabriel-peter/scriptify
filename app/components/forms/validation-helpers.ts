import { ZodType, z, TypeOf } from "zod";

export enum Status {
    NOT_SUBMITTED,
    SUCCESS,
    ERROR
}

export type FormSubmissionReturn<T> = {status: Status; message?: string; error?: T; }
export class ValidationParseError<T extends ZodType<any, any, any>> extends Error {
    errors
    constructor(msg: string, errors: z.inferFlattenedErrors<T>["fieldErrors"]) {
        super(msg);
        this.errors = errors;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ValidationParseError.prototype);
    }

    getFieldErrors() {
        return this.errors
    }
}

export async function asyncFieldValidation<U extends ZodType<any, any, any>>(formDataSchema: z.ZodObject<TypeOf<U>>, rawFormData: any): Promise<z.SafeParseSuccess<TypeOf<U>>> {
    const validatedFields = formDataSchema.safeParse(rawFormData)
    // Throw early if the form data is invalid
    if (!validatedFields.success) {
        console.debug("Validation Failed for ", typeof formDataSchema)
        console.log(validatedFields.error.flatten().fieldErrors)
        throw new ValidationParseError("Validation Failed.", validatedFields.error.format())
    }
    return validatedFields
}

export function errorHandler<T>(error: any) {
    console.error("Error occurred:", error)
    if (error instanceof ValidationParseError) {
        return {
            status: Status.ERROR,
            error: error.getFieldErrors() as T 
        }
    }
    return {
        status: Status.ERROR,
        message: "Unknown Error Occurred"
    }
}
