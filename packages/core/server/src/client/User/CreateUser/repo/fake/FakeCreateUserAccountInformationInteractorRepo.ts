import {CreateUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/CreateUserAccountInformationRepo';
import {SaveUserAccountInformationDTO} from '@copor/core/domain/User/AccountInformation/interactor/dto/SaveUserAccountInformationDTO';

export class FakeCreateUserAccountInformationInteractorRepo implements CreateUserAccountInformationRepo {
	save(saveDTO: SaveUserAccountInformationDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
