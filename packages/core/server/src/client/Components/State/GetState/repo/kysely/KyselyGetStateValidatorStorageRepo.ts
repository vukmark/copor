import {ValidateGetStateRepo} from '@copor/core/domain/Components/State/repository/ValidateGetStateRepo';
import {StateKyselyHelper} from '@copor/core/client/Components/State/repositoryHelper/StateKyselyHelper';

export class KyselyGetStateValidatorStorageRepo implements ValidateGetStateRepo {
	isInvalidState(stateId: string | undefined): Promise<boolean> {
		return StateKyselyHelper.isInvalidState(stateId);
	}
}