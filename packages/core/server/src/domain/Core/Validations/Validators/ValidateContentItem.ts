import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidContentItemRepo} from '@copor/core/domain/ContentItem/repository/IsInvalidContentItemRepo';
import {InvalidContentItemException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidContentItemException';

export class ValidateContentItem extends ValidatorWithRepo<IsInvalidContentItemRepo, string | undefined> {
	public validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.repository.isInvalidContentItem(this.input).then((isInvalidContentItem) => {
				if (isInvalidContentItem)
					throw new InvalidContentItemException();
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}