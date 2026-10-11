import {ValidateDeleteStateRepo} from '@copor/core/domain/Components/State/repository/ValidateDeleteStateRepo';
import {StateKyselyHelper} from '@copor/core/client/Components/State/repositoryHelper/StateKyselyHelper';

export class KyselyDeleteStateValidatorStorageRepo implements ValidateDeleteStateRepo {
	isInvalidState(id: string | undefined): Promise<boolean> {
		return StateKyselyHelper.isInvalidState(id);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return StateKyselyHelper.hasStateReferences(id);
	}
}