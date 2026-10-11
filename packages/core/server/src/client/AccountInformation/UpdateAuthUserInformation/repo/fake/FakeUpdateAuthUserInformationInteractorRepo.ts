import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';
import {UpdateAuthUserInformationRepo} from '@copor/core/domain/User/repository/UpdateAuthUserInformationRepo';

export class FakeUpdateAuthUserInformationInteractorRepo implements UpdateAuthUserInformationRepo {
	update(input: UpdateAuthUserInformationDTO): Promise<void> {
		return Promise.resolve();
	}
}
