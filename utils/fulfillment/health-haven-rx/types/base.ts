export const BASE_URL = "https://sandbox.healthhavenrx.com/"
export const ERROR_CODES = {
    200: "OK",
    403: "Bad Request",
    404: "Unauthorized"
}

export type HealthHavenInnerReponse<T> = {
    statusCode: number,
    wasSuccess: boolean,
    message: string,
    isAuthorized: boolean
    response: T,
    error: boolean
}

export type HealthHavenResponse<T> = HealthHavenInnerReponse<T> | { error: string }

export type SearchParams = {
    search: number,
    pageSize: number,
    sortByName: string,
    sortOrder: "desc" | "asc"
}