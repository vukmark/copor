import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {db} from '@copor/core/client/AppDataSource';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetRoleByRoleTypeRepo} from '@copor/core/domain/Components/Role/interactor/GetRoleByRoleType';
import {Kysely, Transaction} from 'kysely';
import {DB} from '@copor/core/client/types/db';

export class KyselyGetRoleByRoleTypeInteractorRepo implements GetRoleByRoleTypeRepo {
	private dbInstance: Kysely<DB> | Transaction<DB> = db;

	public useTransaction(trx: Transaction<DB>): this {
		this.dbInstance = trx;

		return this;
	}
	async load(input: RoleType): Promise<GetRoleDTO> {
		const loadRole = await this.dbInstance
			.selectFrom('role')
			.selectAll()
			.where('type', '=', input)
			.where('isDefaultForRoleType', '=', true)
			.executeTakeFirst();

		return loadRole!;
	}
}