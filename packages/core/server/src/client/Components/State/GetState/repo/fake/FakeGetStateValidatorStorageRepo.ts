import {ValidateGetStateRepo} from '@copor/core/domain/Components/State/repository/ValidateGetStateRepo';

export class FakeGetStateValidatorStorageRepo implements ValidateGetStateRepo {
	public isInvalidState(stateId: string): Promise<boolean> {
		return new Promise((resolve) => {
			resolve(false);
		});
	}
}