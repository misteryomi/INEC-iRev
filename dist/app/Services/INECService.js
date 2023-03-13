"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../../utils/api"));
class INECService {
    constructor() {
        this.api = new api_1.default(null, process.env.INEC_ENDPOINT);
    }
    fetchElectionTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get("/election-types");
        });
    }
    fetchStatesList(election_type_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get(`/election-types?election_type=${election_type_id}`);
        });
    }
    fetchStatesLGAList(election_type_id, state_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ election_type_id, state_id });
            return this.api.get(`/elections/${election_type_id}/lga/state/${state_id}`);
        });
    }
    fetchWardsPollingUnitsList(election_type_id, ward_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get(`/elections/${election_type_id}/pus?ward=${ward_id}`);
        });
    }
    fetchPollingUnitsResults(election_type_id, polling_unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get(`/elections/${election_type_id}/pu/${polling_unit_id}`);
        });
    }
    fetchLGAWardsList(election_type_id, lga_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get(`/elections/${election_type_id}/lga/${lga_id}`);
        });
    }
}
exports.default = INECService;
//# sourceMappingURL=INECService.js.map