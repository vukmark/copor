import {
	GetUserAccountInformationForDisplayDTO
} from '@copor/core/domain/User/AccountInformation/interactor/dto/GetUserAccountInformationForDisplayDTO';

export interface GetUserAccountInformationForDisplayRepo {
	load(userId: string): Promise<GetUserAccountInformationForDisplayDTO>;
}
