import {ValidatorWithRepo} from './ValidatorWithRepo';
import {InvalidRoleException} from '../../Exceptions/invalid/InvalidRoleException';
import {IsInvalidRoleRepo} from '@copor/core/domain/Components/Role/repository/IsInvalidRoleRepo';
import {InvalidIDException} from '../../Exceptions/invalid/InvalidIDException';

export class ValidateRole extends ValidatorWithRepo<IsInvalidRoleRepo, string> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidRole(this.input).then((isInvalidRole) => {
				if (isInvalidRole) {
					throw new InvalidRoleException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}