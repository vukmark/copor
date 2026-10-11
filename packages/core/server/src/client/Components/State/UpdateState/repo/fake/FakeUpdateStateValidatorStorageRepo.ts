import {ValidateUpdateStateRepo} from '@copor/core/domain/Components/State/repository/ValidateUpdateStateRepo';

export class FakeUpdateStateValidatorStorageRepo implements ValidateUpdateStateRepo {
	public isInvalidState(stateId: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	public isInvalidCountry(countryId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
