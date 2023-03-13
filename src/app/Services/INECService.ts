import API from "../../utils/api";

export default class INECService {

    private api: any;

    constructor() {
        this.api = new API(null, process.env.INEC_ENDPOINT);
    }

    async fetchElectionTypes() {

        return this.api.get("/election-types");

    }

    async fetchStatesList(election_type_id: string) {

        return this.api.get(`/election-types?election_type=${election_type_id}`);

    }

    async fetchStatesLGAList(election_type_id: string, state_id: number) {

        console.log({ election_type_id, state_id })
        return this.api.get(`/elections/${election_type_id}/lga/state/${state_id}`);

    }


    async fetchWardsPollingUnitsList(election_type_id: string, ward_id: number) {

        return this.api.get(`/elections/${election_type_id}/pus?ward=${ward_id}`);

    }

    async fetchPollingUnitsResults(election_type_id: string, polling_unit_id: number) {

        return this.api.get(`/elections/${election_type_id}/pu/${polling_unit_id}`);

    }



    async fetchLGAWardsList(election_type_id: string, lga_id: number) {

        return this.api.get(`/elections/${election_type_id}/lga/${lga_id}`);

    }


}