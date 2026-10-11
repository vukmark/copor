import {GetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetContactInfoForUserDTO';

export interface GetContactInfoForUserRepo {
	load(userId: string): Promise<GetContactInfoForUserDTO>;
}