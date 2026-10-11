import {ValidatorWithRepo} from '../../../Core/Validations/Validators/ValidatorWithRepo';
import {SpecialUserGroupException} from '../../exception/SpecialUserGroupException';
import {IsUserGroupSpecialRepo} from '../../repository/IsUserGroupSpecialRepo';

export class ValidateIsGroupSpecial extends ValidatorWithRepo<IsUserGroupSpecialRepo, string> {
	async validate(): Promise<void> {
		if (await this.repository.isUserGroupSpecial(this.input))
			throw new SpecialUserGroupException();
	}
}