import {GetUserContactInformationDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetUserContactInformationDTO';

export interface GetUserContactInformationRepo {
	load(userId: string): Promise<GetUserContactInformationDTO>
}