import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidNewsRepo} from '@copor/news/domain/News/repository/IsInvalidNewsRepo';
import {InvalidNewsException} from '@copor/news/domain/News/exception/InvalidNewsException';

export class ValidateNews extends ValidatorWithRepo<IsInvalidNewsRepo, string | undefined> {
	public validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.repository.isInvalidNews(this.input).then((isInvalidNews) => {
				if (isInvalidNews)
					throw new InvalidNewsException();
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}