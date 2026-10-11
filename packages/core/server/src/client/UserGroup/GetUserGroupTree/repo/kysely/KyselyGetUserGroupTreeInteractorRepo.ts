import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {db} from '@copor/core/client/AppDataSource';
import {GetUserGroupTreeDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupTreeDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

interface FlatUserGroupRow {
	id: string;
	name: string;
	isSpecial: boolean;
	parentId: string | null;
}

export class KyselyGetUserGroupTreeInteractorRepo
implements ListItems<GetUserGroupTreeDTO> {
	public async list(
		filters: ListRepoInputDTO
	): Promise<GetUserGroupTreeDTO[]> {
		const rows = await this.fetchFlatUserGroupRows();
		const nodeMap = this.buildNodeMap(rows);

		return this.buildTree(rows, nodeMap);
	}

	private async fetchFlatUserGroupRows(): Promise<FlatUserGroupRow[]> {
		return await db
			.selectFrom('userGroup')
			.leftJoin('userGroupClosure', (join) => join
				.onRef(
					'userGroupClosure.descendantId',
					'=',
					'userGroup.id'
				)
				.on('userGroupClosure.depth', '=', 1)
			)
			.select([
				'userGroup.id as id',
				'userGroup.name as name',
				'userGroup.isSpecial as isSpecial',
				'userGroupClosure.ancestorId as parentId'
			])
			.orderBy('userGroup.name')
			.execute();
	}

	private buildNodeMap(rows: FlatUserGroupRow[]): Map<string, GetUserGroupTreeDTO> {
		const nodeMap = new Map<string, GetUserGroupTreeDTO>();

		for (const row of rows) {
			nodeMap.set(row.id, this.toTreeNode(row));
		}

		return nodeMap;
	}

	private toTreeNode(row: FlatUserGroupRow): GetUserGroupTreeDTO {
		return {
			id: row.id,
			name: row.name,
			canEditName: this.canEditName(row),
			canEditMembers: this.canEditMembers(row),
			canCreateChildren: this.canCreateChildren(row),
			children: []
		};
	}

	private canEditName(row: FlatUserGroupRow): boolean {
		return !row.isSpecial;
	}

	private canEditMembers(row: FlatUserGroupRow): boolean {
		return !row.isSpecial;
	}

	private canCreateChildren(row: FlatUserGroupRow): boolean {
		return !row.isSpecial;
	}

	private buildTree(
		rows: FlatUserGroupRow[],
		nodeMap: Map<string, GetUserGroupTreeDTO>
	): GetUserGroupTreeDTO[] {
		const rootList: GetUserGroupTreeDTO[] = [];

		for (const row of rows) {
			const node = nodeMap.get(row.id)!;
			const parent = row.parentId ? nodeMap.get(row.parentId) : undefined;

			if (parent) {
				parent.children.push(node);
			} else {
				rootList.push(node);
			}
		}

		return rootList;
	}
}