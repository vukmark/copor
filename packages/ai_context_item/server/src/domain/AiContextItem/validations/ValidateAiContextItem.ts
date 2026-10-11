import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/IsInvalidAiContextItemRepo';
import {InvalidAiContextItemException} from '@copor/ai_context_item/domain/AiContextItem/exception/InvalidAiContextItemException';

export class ValidateAiContextItem extends ValidatorWithRepo<IsInvalidAiContextItemRepo, string | undefined> {
	public validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.repository.isInvalidAiContextItem(this.input).then((isInvalidAiContextItem) => {
				if (isInvalidAiContextItem)
					throw new InvalidAiContextItemException();
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}