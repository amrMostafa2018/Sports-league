import { GetAllTeamMemberModel } from "./GetAllTeamMemberModel";
import { GetAllTeamModel } from "./GetAllTeamModel";

export class GetTeamDetailsResponse{
    teamDetails! : GetAllTeamModel;
    teamMembers! : GetAllTeamMemberModel[];
}



