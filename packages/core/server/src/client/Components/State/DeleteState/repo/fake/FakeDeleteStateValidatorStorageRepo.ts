import {ValidateDeleteStateRepo} from '@copor/core/domain/Components/State/repository/ValidateDeleteStateRepo';

export class FakeDeleteStateValidatorStorageRepo implements ValidateDeleteStateRepo {
	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
	isInvalidState(stateId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}