import { sleep } from "../../utils/helpers";
import StateSchema from "../Models/State.schema";
import INECService from "../Services/INECService"

export default class INECController {

    private inecService;

    constructor() {
        this.inecService = new INECService();
    }
    //Data Fetcher 

    async dataFetcher() {
        // Fetch Election Type. Ensure Sleep on each for loops.

        const ELECTION_TYPE = '63f8f25b594e164f8146a213' // presidential

        //The Fetch and store States
        const states = await this.inecService.fetchStatesList(ELECTION_TYPE);

        if (states.data && states.data.length > 0) {
            states.data.forEach(async (state: any) => {
                sleep();

                await StateSchema.create(state);
                await this.processLGAFetch(ELECTION_TYPE, state);
            });
        } else {
            console.log('No states');
        }
        console.log({ states });
        // For Each state, fetch and store LGAS
        // For each LGA, fetch and store Wards
        // For each Ward, fetch and store PUs
        // For each PU, fetch and store results. // Store on AWS as well.
    }

    async processLGAFetch(election_type_id: string, state: any) {
        const lgas = await this.inecService.fetchStatesLGAList(election_type_id, state.election_type_id);

        console.log({ lgas })
        if (lgas.data && lgas.data?.length > 0) {

            await this.processWardsFetch(election_type_id, lgas.data)
        } else {
            console.log('No LGAs');
        }

    }

    async processWardsFetch(election_type_id: string, lgas: string[]) {
        lgas.forEach(async (lga: any) => {
            sleep();

            // console.log('lga', lga?.wards?.toString())
            // const wards = await this.inecService.fetchLGAWardsList(election_type_id, lga._id);
            const wards = lga.wards;

            if (wards.length > 0) {

                await this.processPollingUnitsFetch(election_type_id, wards)
            } else {
                console.log('No Wards');
            }

        });
    }

    async processPollingUnitsFetch(election_type_id: string, wards: string[]) {
        wards.forEach(async (ward: any) => {
            sleep();

            const polling_units = await this.inecService.fetchWardsPollingUnitsList(election_type_id, ward._id);

            if (polling_units.data && polling_units.data.length > 0) {

                await this.processPollingUnitsFetch(election_type_id, polling_units)
            } else {
                console.log('No PUs');
            }

        });
    }

    async processPollingUnitResults(election_type_id: string, polling_units: string[]) {
        polling_units.forEach(async (polling_unit: any) => {
            sleep();

            const results = await this.inecService.fetchPollingUnitsResults(election_type_id, polling_unit._id);

            if (results.data && results.data.length > 0) {

                await this.processResultsStore(election_type_id, results)
            } else {
                console.log('No PU results');
            }

        });
    }

    async processResultsStore(election_type_id: string, results: string[]) {
        results.forEach(async (result: any) => {
            sleep();

            console.log('result', { result: result.toString() })

        });
    }
}