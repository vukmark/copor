
import {InvalidTagException} from '../../Exceptions/invalid/InvalidTagException';
import {ValidatorWithRepo} from './ValidatorWithRepo';
import {IsInvalidTagRepo} from '../../../Components/Tag/repository/IsInvalidTagRepo';
import {InvalidIDException} from '../../Exceptions/invalid/InvalidIDException';

export class ValidateTag extends ValidatorWithRepo<IsInvalidTagRepo, string | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidTag(this.input).then((isInvalidTag) => {
				if (isInvalidTag) {
					throw new InvalidTagException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
