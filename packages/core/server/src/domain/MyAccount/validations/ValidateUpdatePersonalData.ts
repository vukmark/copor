import {ValidationWithPermissionAndRepo} from '../../Core/Validations/ValidationWithPermissionAndRepo';
import {SavePersonalDataDTO} from '../interactor/dto/SavePersonalDataDTO';
import {Validator} from '../../Core/Validations/Validators/Validator';
import {ValidateCanUpdatePersonalData} from './permissions/ValidateCanUpdatePersonalData';
import {ValidateEmptyId} from '../../Core/Validations/Validators/ValidateEmptyId';
import {ValidateUpdatePersonalDataRepo} from '../repository/ValidateUpdatePersonalDataRepo';
import {ValidateUser}                   from '../../User/validation/validator/ValidateUser';
import {ValidateRole}                   from '../../Core/Validations/Validators/ValidateRole';
import {ValidateFirstName} from '../../Core/Validations/Validators/ValidateFirstName';
import {ValidateLastName} from '../../Core/Validations/Validators/ValidateLastName';

export class ValidateUpdatePersonalData extends ValidationWithPermissionAndRepo<SavePersonalDataDTO, ValidateUpdatePersonalDataRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdatePersonalData(this.permissionRepo, this.input.actorId),
			new ValidateFirstName(this.input.firstName),
			new ValidateLastName(this.input.lastName),
			new ValidateEmptyId(this.input.id),
			new ValidateUser(this.storageRepo, this.input.actorId),
			new ValidateRole(this.storageRepo, this.input.userRole)
		];
	}
}