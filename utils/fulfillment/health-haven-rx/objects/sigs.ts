import { fetchHandler, getRequestBuilder } from "../helpers";
import { HealthHavenResponse, SearchParams } from "../types/base";

interface SigResponse {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const LIST_SIGS_ENDPOINT = "api/oauth/v1/partner/sigs"
export class Sigs {
    async list(searchParams: SearchParams): Promise<HealthHavenResponse<SigResponse[]>> {
        return fetchHandler(new Request(getRequestBuilder(LIST_SIGS_ENDPOINT, searchParams)))
    }
}