import { fetchHandler, getRequestBuilder } from "../helpers";
import { SearchParams, HealthHavenResponse } from "../types/base";

const LIST_TRANSFERS_ENDPOINT = "api/oauth/v1/partner/transfers"
export class Transfers {
    async list(searchParams: SearchParams): Promise<HealthHavenResponse<TransferListResponse>> {
        return fetchHandler<TransferListResponse>(new Request(getRequestBuilder(LIST_TRANSFERS_ENDPOINT, searchParams)))
    }
}
