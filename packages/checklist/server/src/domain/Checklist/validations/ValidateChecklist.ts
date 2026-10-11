import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidChecklistException} from '@copor/checklist/domain/Checklist/exception/InvalidChecklistException';
import {IsInvalidChecklistRepo} from '@copor/checklist/domain/Checklist/repository/IsInvalidChecklistRepo';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';

export class ValidateChecklist extends ValidatorWithRepo<IsInvalidChecklistRepo, string | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidChecklist(this.input).then((isInvalidChecklist) => {
				if (isInvalidChecklist) {
					throw new InvalidChecklistException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
