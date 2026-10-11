import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

export interface EntityHasForeignKeyReferencesRepo {
	entityHasReferences(id: string): Promise<{tableName: string} | false>;
}

export class ValidateEntityIsNotReferenced extends ValidatorWithRepo<EntityHasForeignKeyReferencesRepo, string> {
	public async validate(): Promise<void> {
		const id = this.input;

		if (!id)
			return;

		const referenceInfo = await this.repository.entityHasReferences(id);

		if (referenceInfo) {
			throw new DeletionNotAllowedException(referenceInfo.tableName);
		}
	}
}