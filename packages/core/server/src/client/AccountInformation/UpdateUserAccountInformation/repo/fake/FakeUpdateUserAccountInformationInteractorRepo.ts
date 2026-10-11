import {
	UpdateUserAccountInformationRepo
} from '@copor/core/domain/User/repository/UpdateUserAccountInformationRepo';
import {
	UpdateUserAccountInformationDTO
} from '@copor/core/domain/User/interactor/dto/UpdateUserAccountInformationDTO';

export class FakeUpdateUserAccountInformationInteractorRepo implements UpdateUserAccountInformationRepo {
	save(saveDTO: UpdateUserAccountInformationDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
