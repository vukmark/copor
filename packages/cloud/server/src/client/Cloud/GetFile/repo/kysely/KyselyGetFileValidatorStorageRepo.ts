import {ValidateGetFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateGetFileRepo';
import {db} from '@copor/core/client/AppDataSource';


export class KyselyGetFileValidatorStorageRepo implements ValidateGetFileRepo {
	async isInvalidCloudFile(fileId: string | undefined): Promise<boolean> {
		if (!fileId)
			return true;
		const file = await db.selectFrom('cloudFile')
			.select('id')
			.where('id', '=', fileId)
			.executeTakeFirst();

		return !file;
	}
}
