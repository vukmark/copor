/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {GetAllToDosForUserDTO} from '@copor/todo/domain/ToDo/Core/interactor/dto/GetAllToDosForUserDTO';
import {GetAllToDosForUserRepo} from '@copor/todo/domain/ToDo/Core/repository/GetAllToDosForUserRepo';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {ProgressFilterValues} from '@copor/core/domain/Core/enum/ProgressFilterValues';
import {PriorityFilterValues} from '@copor/core/domain/Core/enum/PriorityFilterValues';
import {db} from '@copor/core/client/AppDataSource';
import {SelectQueryBuilder} from 'kysely';
import {DB} from '@copor/core/client/types/db';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {ToDoFilterFieldMap} from '@copor/todo/client/ToDo/GetAllToDosForUser/dto/ToDoFilterFieldMap';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ToDoKyselyHelper} from '@copor/todo/client/ToDo/repositoryHelper/ToDoKyselyHelper';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';

export class KyselyGetAllToDosForUserInteractorRepo
	extends TimeTransformer
	implements GetAllToDosForUserRepo {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		super();
		this.appContext = appContext;
	}

	async load(userId: string, filterList: GetFilterDTO[]): Promise<GetAllToDosForUserDTO[]> {
		const privateTodos = await this.getPrivateTodos(userId, filterList);

		return await this.addTagsToToDos(
			privateTodos.map((todo) => ({...todo, isPrivate: true}))
		);
	}


	private async addTagsToToDos(todosQueryResult: GetAllToDosForUserDTO[]) {
		const allTodos: GetAllToDosForUserDTO[] = await Promise.all(
			todosQueryResult.map(async (todo) => {
				const tagList = await db
					.selectFrom('toDoTagMap')
					.innerJoin('tag', 'tag.id', 'toDoTagMap.tagId')
					.selectAll('tag')
					.where('toDoTagMap.toDoId', '=', todo.id)
					.execute();

				const attachmentList = await ToDoKyselyHelper.getAttachmentListForToDo(todo.id);

				return {
					... todo,
					deadline: todo.deadline ? this.fromUtc(todo.deadline) : undefined,
					tagList: tagList.map((tag) => ({
						... tag,
						description: tag.description ?? undefined
					})),
					attachmentList
				};
			})
		);

		return allTodos;
	}


	/**
	 * OWN scope sees only the requesting user's own todos; TENANT/ALL scope (admin) sees
	 * every private todo, since a single database instance corresponds to one tenant.
	 */
	private async getPrivateTodos(userId: string, filterList: GetFilterDTO[]): Promise<GetAllToDosForUserDTO[]> {
		const permission = await KyselyPermissionHelper.getPermission(userId, ToDoPermission.canGetPrivateToDo);
		const canSeeAllToDos = permission.effect === PermissionEffect.ALLOW && permission.scope !== PermissionScope.OWN;

		let privateToDoQuery: SelectQueryBuilder<DB, any, any> = db
			.selectFrom('privateToDo')
			.leftJoin(
				'toDoTagMap',
				'toDoTagMap.toDoId',
				'privateToDo.id'
			)
			.leftJoin(
				'tag',
				'tag.id',
				'toDoTagMap.tagId'
			)
			.selectAll('privateToDo')
			.groupBy('privateToDo.id');

		if (!canSeeAllToDos)
			privateToDoQuery = privateToDoQuery.where('privateToDo.actorId', '=', userId);

		const privateToDoFieldMap: ToDoFilterFieldMap = {
			title: 'privateToDo.title',
			priority: 'privateToDo.priority',
			progress: 'privateToDo.progress',
			deadline: 'privateToDo.deadline',
			tag: 'tag.id'
		};

		privateToDoQuery = this.applyFilters(filterList, privateToDoQuery, privateToDoFieldMap);
		privateToDoQuery = privateToDoQuery.orderBy('privateToDo.priority', 'asc');

		const privateTodos = await privateToDoQuery.execute();

		return privateTodos.map((todo) => {
			return {
				... todo,
				type: ToDoType.PRIVATE
			};
		}) as GetAllToDosForUserDTO[];
	}

	private applyFilters(
		filterList: GetFilterDTO[],
		dbQuery: SelectQueryBuilder<DB, any, any>,
		fieldMap: ToDoFilterFieldMap
	) {
		for (const filter of filterList) {
			switch (filter.name) {
				case FilterNameValues.DUE_DATE :
					dbQuery = FilterHelper.addDueDateFilter(dbQuery, filter, fieldMap.deadline);
					break;

				case FilterNameValues.PRIORITY :
					dbQuery = FilterHelper.addInFilter(
						dbQuery,
						fieldMap.priority,
						filter.values!.map((v) => PriorityFilterValues[v as keyof typeof PriorityFilterValues])
					);
					break;

				case FilterNameValues.PROGRESS :
					dbQuery = FilterHelper.addInFilter(
						dbQuery,
						fieldMap.progress,
						filter.values!.map((v) => ProgressFilterValues[v as keyof typeof ProgressFilterValues])
					);
					break;
				case FilterNameValues.TAG :
					dbQuery = FilterHelper.addInFilter(
						dbQuery,
						fieldMap.tag,
						filter.values!
					);
					break;

				case FilterNameValues.SEARCH :
					dbQuery = FilterHelper.addSearchFilter(dbQuery, filter, fieldMap.title);
					break;

				case FilterNameValues.SORT_BY_TITLE :
					dbQuery = FilterHelper.addSortFilter(dbQuery, filter, fieldMap.title);
					break;

				case FilterNameValues.SORT_BY_PRIORITY :
					dbQuery = FilterHelper.addSortFilter(dbQuery, filter, fieldMap.priority);
					break;

				case FilterNameValues.SORT_BY_PROGRESS :
					dbQuery = FilterHelper.addSortFilter(dbQuery, filter, fieldMap.progress);
					break;

				case FilterNameValues.SORT_BY_DUE_DATE :
					dbQuery = FilterHelper.addSortFilter(dbQuery, filter, fieldMap.deadline);
					break;
			}
		}
		return dbQuery;
	}
}
