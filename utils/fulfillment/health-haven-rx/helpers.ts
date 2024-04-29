import { BASE_URL, HealthHavenInnerReponse } from "./types/base";

export const getRequestBuilder = (endpoint: string, rawParams?: Record<string, any>): URL => {
    const url = new URL(endpoint, BASE_URL)
    if (rawParams) {
        Object.entries(rawParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
    }
    return url;
}

export const fetchHandler = <T>(request: Request): Promise<HealthHavenInnerReponse<T> | { error: string }> => {
    // add auth header
    if (!process.env.HHRX_API_KEY) {
        throw Error("HHRX API Key is undefined")
    }
    request.headers.set('x-api-key', process.env.HHRX_API_KEY!)
    return fetch(request)
        // HTTP ERRORs
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Something went wrong on API server!");
            }
        })
        // HEALTH HAVEN ERRORs
        .then((response: HealthHavenInnerReponse<T>) => {
            console.debug(response);
            if (response.error) {
                console.log("Custom Health Haven Error:", response.message)
            }
            return response
        })
        .catch((error) => {
            console.error(error);
            return { error }
        })
}