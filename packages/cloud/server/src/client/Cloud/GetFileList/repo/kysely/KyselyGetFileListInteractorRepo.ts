import {GetFileListDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileListDTO';
import {db} from '@copor/core/client/AppDataSource';
import {GetFileListRepo} from '@copor/cloud/domain/Cloud/repository/GetFileListRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export class KyselyGetFileListInteractorRepo implements GetFileListRepo {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	async getUserUserGroupList(userId: string): Promise<NameAndIdDTO<string>[]> {
		return await db
			.selectFrom('userGroupUserMap as map')
			.innerJoin('userGroup as ug', 'ug.id', 'map.userGroupId')
			.select([
				'ug.id as id',
				'ug.name as name'
			])
			.where('map.userId', '=', userId)
			.groupBy('map.userGroupId')
			.execute();
	}

	public async getFileList(actorId: string): Promise<GetFileListDTO[]> {
		const publicFiles = await this.getPublicFiles(actorId);
		const customGroupFiles = await this.getCustomGroupFiles(actorId);
		const privateFiles = await this.getPrivateFiles(actorId);

		return [
			... publicFiles,
			... customGroupFiles,
			... privateFiles
		];
	}

	// PUBLIC files: the actor's own Public folder (files placed in it, i.e.
	// `fum.userId = actor`). GetFileListForUser routes each into the right folder.
	private async getPublicFiles(actorId: string): Promise<GetFileListDTO[]> {
		const files = await db
			.selectFrom('cloudFile as f')
			.innerJoin('fileUserMap as fum', 'fum.fileId', 'f.id')
			.where('f.sharingType', '=', SharingType.PUBLIC)
			.where('fum.userId', '=', actorId)
			.select([
				'f.id as id',
				'f.name as name',
				'f.description as description',
				'f.createdBy as createdBy',
				'f.path as path',
				'f.sharingType as sharingType',
				'f.createdAt as createdAt',
				'f.size as size',
				'fum.userId as targetUserId'
			])
			.groupBy(['f.id', 'fum.userId'])
			.execute();

		return this.addCreatorDataToFiles(files);
	}

	private async getCustomGroupFiles(actorId: string): Promise<GetFileListDTO[]> {
		const files = await db
			.selectFrom('cloudFile as f')
			.innerJoin('fileUserGroupMap as map', 'map.fileId', 'f.id')
			.innerJoin('userGroup', 'map.userGroupId', 'userGroup.id')
			.innerJoin('userGroupUserMap', 'userGroupUserMap.userGroupId', 'map.userGroupId')
			.where('userGroupUserMap.userId', '=', actorId)
			.select([
				'f.id as id',
				'f.description as description',
				'f.name as name',
				'f.createdBy as createdBy',
				'f.path as path',
				'f.sharingType as sharingType',
				'userGroup.id as userGroupId',
				'userGroup.name as userGroupName',
				'f.createdAt as createdAt',
				'f.size as size'
			])
			.groupBy(['f.id', 'userGroup.id'])
			.execute();

		return await this.addCreatorDataToFiles(files);
	}

	private async getPrivateFiles(actorId: string) {
		const files = await db
			.selectFrom('cloudFile as f')
			.where('f.sharingType', '=', SharingType.PRIVATE)
			.where('f.createdBy', '=', actorId)
			.select([
				'f.id as id',
				'f.name as name',
				'f.description as description',
				'f.createdBy as createdBy',
				'f.path as path',
				'f.sharingType as sharingType',
				'f.createdAt as createdAt',
				'f.size as size'
			])
			.groupBy('f.id')
			.execute();

		return this.addCreatorDataToFiles(files);
	}

	private async addCreatorDataToFiles(files: FileListDBResponse[]): Promise<GetFileListDTO[]> {
		// Many files share the same creator/target (e.g. one user's files shared with a whole
		// group, or several files shared to the same user's Public folder) -- fetching per-file
		// instead of per-unique-user turned a page load into hundreds of concurrent DB round trips
		// once PUBLIC sharing started being used at realistic volume, exhausting the connection pool
		// (mysql2 "Queue limit reached"). Deduping by user id alone wasn't enough at real data
		// volume (still one query per unique user, still unbounded) -- these now run in small
		// concurrency-limited batches so a page with hundreds of distinct creators/targets can't
		// still exhaust the pool the same way.
		const uniqueUserIds = [... new Set(
			files.flatMap((file) => [file.createdBy, file.targetUserId].filter((id): id is string => !!id))
		)];
		const userDataById = new Map(
			await KyselyGetFileListInteractorRepo.batchLoadUserData(uniqueUserIds, this.appContext)
		);

		return files.map((file: FileListDBResponse) => {
			const creatorData = userDataById.get(file.createdBy)!;
			const targetUserData = file.targetUserId ? userDataById.get(file.targetUserId) : undefined;

			return {
				sharingType: file.sharingType as SharingType,
				name: file.name,
				id: file.id,
				creatorId: file.createdBy,
				path: file.path,
				creatorFirstName: creatorData.userFirstName ?? '',
				creatorLastName: creatorData.userLastName ?? '',
				groupId: file.userGroupId,
				groupName: file.userGroupName,
				targetUserId: file.targetUserId,
				targetUserFirstName: targetUserData?.userFirstName ?? undefined,
				targetUserLastName: targetUserData?.userLastName ?? undefined,
				createdAt: file.createdAt,
				size: file.size,
				description: file.description ?? undefined
			};
		});
	}

	// Kept well under the connection pool's connectionLimit (10) so this alone can never exhaust
	// it, even before accounting for whatever else is concurrently using the pool for other
	// requests.
	private static readonly userDataBatchSize = 5;

	private static async batchLoadUserData(
		userIds: string[],
		appContext: AppContext
	): Promise<(readonly [string, Awaited<ReturnType<typeof UserKyselyHelper.getUserData>>])[]> {
		const results: (readonly [string, Awaited<ReturnType<typeof UserKyselyHelper.getUserData>>])[] = [];

		for (let i = 0; i < userIds.length; i += KyselyGetFileListInteractorRepo.userDataBatchSize) {
			const batch = userIds.slice(i, i + KyselyGetFileListInteractorRepo.userDataBatchSize);
			const batchResults = await Promise.all(
				batch.map(async (userId) => [userId, await UserKyselyHelper.getUserData(userId, appContext)] as const)
			);

			results.push(...batchResults);
		}

		return results;
	}
}
interface FileListDBResponse {
	id: string;
	name: string;
	description?: string | null;
	createdBy: string;
	path: string;
	sharingType: string;
	userGroupId?: string;
	userGroupName?: string;
	targetUserId?: string;
	createdAt: Date;
	size: number;
}
