import {ValidatorWithRepo} from './ValidatorWithRepo';
import {IsInvalidNativeLanguageRepo} from '../../../Components/NativeLanguage/repository/IsInvalidNativeLanguageRepo';
import {InvalidNativeLanguageException} from '../../Exceptions/invalid/InvalidNativeLanguageException';
import {InvalidIDException} from '../../Exceptions/invalid/InvalidIDException';

export class ValidateNativeLanguage extends ValidatorWithRepo<IsInvalidNativeLanguageRepo, string | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidNativeLanguage(this.input).then((isInvalidNativeLanguage) => {
				if (isInvalidNativeLanguage) {
					throw new InvalidNativeLanguageException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
