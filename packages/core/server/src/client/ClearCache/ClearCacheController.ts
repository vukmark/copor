import {KyselyClearUserPermissionCacheRepo} from '@copor/core/client/ClearCache/repo/KyselyClearCacheController';

export class ClearCacheController {
	private readonly repo: KyselyClearUserPermissionCacheRepo;

	constructor(repo: KyselyClearUserPermissionCacheRepo) {
		this.repo = repo;
	}

	async execute(): Promise<void> {
		await this.repo.execute();
	}
}