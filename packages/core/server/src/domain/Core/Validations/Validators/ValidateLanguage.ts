import {ValidatorWithRepo} from './ValidatorWithRepo';
import {IsInvalidLanguageRepo} from '../../../Components/Language/repository/IsInvalidLanguageRepo';
import {InvalidLanguageException} from '../../Exceptions/invalid/InvalidLanguageException';
import {InvalidIDException} from '../../Exceptions/invalid/InvalidIDException';

export class ValidateLanguage extends ValidatorWithRepo<IsInvalidLanguageRepo, string | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidLanguage(this.input).then((isInvalidLanguage) => {
				if (isInvalidLanguage) {
					throw new InvalidLanguageException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}