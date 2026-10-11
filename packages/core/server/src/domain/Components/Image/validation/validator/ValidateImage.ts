import {ValidatorWithRepo} from '../../../../Core/Validations/Validators/ValidatorWithRepo';
import {InvalidImageException} from '../../exception/InvalidImageException';

import {IsInvalidImageRepo} from "../../repository/IsInvalidImageRepo";

export class ValidateImage extends ValidatorWithRepo<IsInvalidImageRepo, string> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidImage(this.input)) {
			throw new InvalidImageException();
		}
	}
}