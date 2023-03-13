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
const helpers_1 = require("../../utils/helpers");
const State_schema_1 = __importDefault(require("../Models/State.schema"));
const INECService_1 = __importDefault(require("../Services/INECService"));
class INECController {
    constructor() {
        this.inecService = new INECService_1.default();
    }
    //Data Fetcher 
    dataFetcher() {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch Election Type. Ensure Sleep on each for loops.
            const ELECTION_TYPE = '63f8f25b594e164f8146a213'; // presidential
            //The Fetch and store States
            const states = yield this.inecService.fetchStatesList(ELECTION_TYPE);
            if (states.data && states.data.length > 0) {
                states.data.forEach((state) => __awaiter(this, void 0, void 0, function* () {
                    (0, helpers_1.sleep)();
                    yield State_schema_1.default.create(state);
                    yield this.processLGAFetch(ELECTION_TYPE, state);
                }));
            }
            else {
                console.log('No states');
            }
            console.log({ states });
            // For Each state, fetch and store LGAS
            // For each LGA, fetch and store Wards
            // For each Ward, fetch and store PUs
            // For each PU, fetch and store results. // Store on AWS as well.
        });
    }
    processLGAFetch(election_type_id, state) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const lgas = yield this.inecService.fetchStatesLGAList(election_type_id, state.election_type_id);
            console.log({ lgas });
            if (lgas.data && ((_a = lgas.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                yield this.processWardsFetch(election_type_id, lgas.data);
            }
            else {
                console.log('No LGAs');
            }
        });
    }
    processWardsFetch(election_type_id, lgas) {
        return __awaiter(this, void 0, void 0, function* () {
            lgas.forEach((lga) => __awaiter(this, void 0, void 0, function* () {
                (0, helpers_1.sleep)();
                // console.log('lga', lga?.wards?.toString())
                // const wards = await this.inecService.fetchLGAWardsList(election_type_id, lga._id);
                const wards = lga.wards;
                if (wards.length > 0) {
                    yield this.processPollingUnitsFetch(election_type_id, wards);
                }
                else {
                    console.log('No Wards');
                }
            }));
        });
    }
    processPollingUnitsFetch(election_type_id, wards) {
        return __awaiter(this, void 0, void 0, function* () {
            wards.forEach((ward) => __awaiter(this, void 0, void 0, function* () {
                (0, helpers_1.sleep)();
                const polling_units = yield this.inecService.fetchWardsPollingUnitsList(election_type_id, ward._id);
                if (polling_units.data && polling_units.data.length > 0) {
                    yield this.processPollingUnitsFetch(election_type_id, polling_units);
                }
                else {
                    console.log('No PUs');
                }
            }));
        });
    }
    processPollingUnitResults(election_type_id, polling_units) {
        return __awaiter(this, void 0, void 0, function* () {
            polling_units.forEach((polling_unit) => __awaiter(this, void 0, void 0, function* () {
                (0, helpers_1.sleep)();
                const results = yield this.inecService.fetchPollingUnitsResults(election_type_id, polling_unit._id);
                if (results.data && results.data.length > 0) {
                    yield this.processResultsStore(election_type_id, results);
                }
                else {
                    console.log('No PU results');
                }
            }));
        });
    }
    processResultsStore(election_type_id, results) {
        return __awaiter(this, void 0, void 0, function* () {
            results.forEach((result) => __awaiter(this, void 0, void 0, function* () {
                (0, helpers_1.sleep)();
                console.log('result', { result: result.toString() });
            }));
        });
    }
}
exports.default = INECController;
//# sourceMappingURL=INECController.js.map