// API Documentation: https://documenter.getpostman.com/view/26207264/2s9YeG7Xho#intro
// DTM = Drug Therapy Management

import { Transfers } from "./objects/transfers"
import { getRequestBuilder } from "./helpers"
import { Drugs } from "./objects/drugs"

// TODO do singleton pattern so it can be imported everywhere without new instantiation
namespace HealthHavenClient {} // Consider this pattern?




const GET_CUSTOMER_LIST = "api/oauth/v1/partner/customers"
const GET_CUSTOMER_DETAILS = (customerId: number) => `api/oauth/v1/partner/customers/${customerId}`

const POST_CUSTOMER = "api/oauth/v1/partner/customers"



const x = {
    search: "others",
    pageSize: 100,
    sortByName: "name",
    sortOrder: "desc"
}

// const client.transfers.get({}) GOAL STATE

class HealthHavenClient {
    transfers: Transfers = new Transfers()
    drugs: Drugs = new Drugs()
}

const client = new HealthHavenClient()
export default client;

// TESTS
console.log(getRequestBuilder(GET_DRUG_CLASSES, x ).toString())

// TRANSFERS
