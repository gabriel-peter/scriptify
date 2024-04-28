import { fetchHandler, getRequestBuilder } from "../helpers";
import { SearchParams, HealthHavenResponse } from "../types/base";

const LIST_TRANSFERS_ENDPOINT = "api/oauth/v1/partner/transfers"
const DETAIL_TRANSFER_ENDPOINT = (id: number) => `api/oauth/v1/partner/transfers/${id}`
const CREATE_TRANSFER_ENDPOINT = "api/oauth/v1/partner/transfers"
export class Transfers {
    async list(searchParams: SearchParams): Promise<HealthHavenResponse<TransferListResponse>> {
        return fetchHandler(new Request(getRequestBuilder(LIST_TRANSFERS_ENDPOINT, searchParams)))
    }
    async detail(transferId: number): Promise<HealthHavenResponse<TransferDetailResponse>> {
        return fetchHandler(new Request(getRequestBuilder(DETAIL_TRANSFER_ENDPOINT(transferId))))
    }
    async create(payload: ExistingPharmacyAndPatientPayload | NewPatientAndPharmacyPayload | NewPharmacyWithExistingPatientPayload ) {
        return fetchHandler(new Request(CREATE_TRANSFER_ENDPOINT, {
            method: "PUT",
            body: JSON.stringify(payload)
        }))
    }
}
