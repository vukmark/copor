import {ValidateGetFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateGetFileRepo';

export class FakeGetFileValidatorStorageRepo implements ValidateGetFileRepo {
	isInvalidCloudFile(fileId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidFile(fileId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
