import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {ValidateUpdateAuthUserInformationRepo}
	from '@copor/core/domain/User/repository/ValidateUpdateAuthUserInformationRepo';
import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';
import {AuthUserEmailAlreadyInUseException}
	from '@copor/core/domain/User/exception/AuthUserEmailAlreadyInUseException';

export class ValidateUniqueAuthUserEmail extends ValidatorWithRepo<
	ValidateUpdateAuthUserInformationRepo,
	UpdateAuthUserInformationDTO
> {
	public async validate(): Promise<void> {
		if (await this.repository.isNotValidUser(this.input!.id))
			return;

		if (await this.repository.isEmailUsedByAnotherUser(this.input!.id, this.input!.email!))
			throw new AuthUserEmailAlreadyInUseException();
	}
}
