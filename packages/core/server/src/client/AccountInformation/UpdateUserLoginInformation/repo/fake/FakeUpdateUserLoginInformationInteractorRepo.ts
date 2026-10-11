import {UpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/UpdateUserLoginInformationRepo';
import {UpdateUserLoginInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserLoginInformationDTO';

export class FakeUpdateUserLoginInformationInteractorRepo implements UpdateUserLoginInformationRepo {
	save(saveDTO: UpdateUserLoginInformationDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
