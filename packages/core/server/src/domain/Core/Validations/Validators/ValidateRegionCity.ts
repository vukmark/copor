import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidRegionCityException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRegionCityException';
import {IsInvalidRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/IsInvalidRegionCityRepo';

export class ValidateRegionCity extends ValidatorWithRepo<IsInvalidRegionCityRepo, string> {
	public validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.repository.isInvalidRegionCity(this.input).then((isInvalidRegionCity) => {
				if (isInvalidRegionCity)
					throw new InvalidRegionCityException();
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}