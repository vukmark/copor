import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/IsInvalidChecklistItemRepo';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';
import {InvalidChecklistItemException} from '@copor/checklist/domain/ChecklistItem/exception/InvalidChecklistItemException';

export class ValidateChecklistItem extends ValidatorWithRepo<IsInvalidChecklistItemRepo, string > {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidChecklistItem(this.input).then((isInvalidChecklistItem) => {
				if (isInvalidChecklistItem) {
					throw new InvalidChecklistItemException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}