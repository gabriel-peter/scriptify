import { fetchHandler, getRequestBuilder } from "../helpers"
import { HealthHavenResponse } from "../types/base"

const LIST_CUSTOMERS_ENDPOINT = "api/oauth/v1/partner/customers"
const GET_CUSTOMER_DETAILS = (customerId: number) => `api/oauth/v1/partner/customers/${customerId}`
const POST_CUSTOMER = "api/oauth/v1/partner/customers"

interface CustomerListSearchParam {
    email: string;
    pageSize: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
}

export class Customers {
    async list(searchParams: CustomerListSearchParam): Promise<HealthHavenResponse<CustomerRepsonse[]>> {
        return fetchHandler(new Request(getRequestBuilder(LIST_CUSTOMERS_ENDPOINT, searchParams)))
    }
    async details(customerId: number): Promise<HealthHavenResponse<CustomerRepsonse>> {
        return fetchHandler(new Request(getRequestBuilder(GET_CUSTOMER_DETAILS(customerId))))
    }
    async create(payload: CreateCustomer): Promise<HealthHavenResponse<CustomerRepsonse>> {
        return fetchHandler(new Request(POST_CUSTOMER, {
            method: "PUT",
            body: JSON.stringify(payload)
        }))
    }
}