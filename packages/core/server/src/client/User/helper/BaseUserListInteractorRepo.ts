import {AppContext} from '@copor/core/client/Interface/AppContext';
import {SelectQueryBuilder} from 'kysely';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export abstract class BaseUserListInteractorRepo<T> {
	protected appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	protected async getPermissions(actorId: string, permissionType: PermissionType) {
		return KyselyPermissionHelper.getPermission(actorId, permissionType);
	}

	protected applySearchFilter<TQuery extends SelectQueryBuilder<any, any, any>>(
		query: TQuery,
		filter: GetFilterDTO,
		fields: string[]
	): TQuery {
		let value = filter.values?.[0];

		if (value) {
			value = value.trim().replace(/\s+/g, '%');
			query = query.where((eb) => eb.or(fields.map((f) => eb(f, 'like', `%${value}%`)))
			) as TQuery;
		}
		return query;
	}

	protected applyMultiTokenSearchFilter<TQuery extends SelectQueryBuilder<any, any, any>>(
		query: TQuery,
		filter: GetFilterDTO,
		fields: string[]
	): TQuery {
		const value = filter.values?.[0]?.trim();

		if (value) {
			const tokens = value.split(/\s+/);

			query = query.where((eb) => eb.and(
				tokens.map((token) => eb.or(
					fields.map((f) => eb(f as any, 'like', `%${token}%`))
				))
			)) as TQuery;
		}

		return query;
	}

	public abstract list(input: ListRepoInputDTO): Promise<T[]>;

	protected abstract applyScope(
		query: SelectQueryBuilder<any, any, any>,
		scope: PermissionScope,
		actorId: string,
		ids?: string[]
	): SelectQueryBuilder<any, any, any>;
}
