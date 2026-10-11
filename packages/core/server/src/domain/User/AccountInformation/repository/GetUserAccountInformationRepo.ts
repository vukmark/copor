import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';

export interface GetUserAccountInformationRepo {
	load(userId: string): Promise<GetUserAccountInformationDTO>;
}
