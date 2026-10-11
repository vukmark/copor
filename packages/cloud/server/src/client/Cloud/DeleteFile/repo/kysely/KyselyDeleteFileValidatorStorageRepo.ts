import {ValidateDeleteFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateDeleteFileRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteFileValidatorStorageRepo implements ValidateDeleteFileRepo {
	async isInvalidFile(id: string | undefined): Promise<boolean> {
		if (!id)
			return true;
		const file = await db.selectFrom('cloudFile')
			.selectAll()
			.where('id', '=', id)
			.executeTakeFirst();

		return !file;
	}
}
