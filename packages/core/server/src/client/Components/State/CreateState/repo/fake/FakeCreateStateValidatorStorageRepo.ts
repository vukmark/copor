import {ValidateCreateStateRepo} from '@copor/core/domain/Components/State/repository/ValidateCreateStateRepo';

export class FakeCreateStateValidatorStorageRepo implements ValidateCreateStateRepo {
	isInvalidCountry(countryId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}