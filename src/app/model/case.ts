import { Patient } from "./patient";
import { Location } from "./location";
import { CaseInformation } from "./case-information";
import { RouteInformation } from "./route-information";

export class Case {
    caseId: string;
    patient: Patient;
    caseLocation: Location;
    hospitalLocation: Location;
    caseInformation: CaseInformation;
    routingInformation: RouteInformation;
}