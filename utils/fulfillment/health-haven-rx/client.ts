// API Documentation: https://documenter.getpostman.com/view/26207264/2s9YeG7Xho#intro
// DTM = Drug Therapy Management
import { Transfers } from "./objects/transfers"
import { Drugs } from "./objects/drugs"
import { Customers } from "./objects/customers"
import { Sigs } from "./objects/sigs"

class HealthHavenClient {
    transfers: Transfers = new Transfers()
    drugs: Drugs = new Drugs()
    customers: Customers = new Customers()
    sigs: Sigs = new Sigs()
}

const client = new HealthHavenClient()
export default client;