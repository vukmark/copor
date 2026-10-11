import {ValidatorWithRepo} from './ValidatorWithRepo';
import {InvalidRegionException} from '../../Exceptions/invalid/InvalidRegionException';
import {IsInvalidRegionRepo} from '../../../Components/Region/repository/IsInvalidRegionRepo';

export class ValidateRegion extends ValidatorWithRepo<IsInvalidRegionRepo, string | undefined> {
	public validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.repository.isInvalidRegion(this.input).then((isInvalidRegion) => {
				if (isInvalidRegion)
					throw new InvalidRegionException();
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}