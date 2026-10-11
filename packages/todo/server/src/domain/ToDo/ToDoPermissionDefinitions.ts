import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {ToDoFeature} from '@copor/todo/domain/ToDo/ToDoFeature';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';

export const toDoPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: ToDoPermission.canGetAllCommentsForToDo,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canCreatePrivateToDo,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canTrashUntrashToDo,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canCreateToDoCategory,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetToDoCategoryList]
	},
	{
		key: ToDoPermission.canUpdatePrivateToDo,
		feature: ToDoFeature.TODO,
		requiresScope: true,
		dependsOn: [ToDoPermission.canGetAllToDosForUser, ToDoPermission.canGetPrivateToDo]
	},
	{
		key: ToDoPermission.canEmptyTrash,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canDeleteToDoCategory,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetToDoCategoryList]
	},
	{
		key: ToDoPermission.canDeletePrivateToDo,
		feature: ToDoFeature.TODO,
		requiresScope: true,
		dependsOn: [ToDoPermission.canGetAllToDosForUser, ToDoPermission.canGetPrivateToDo]
	},
	{
		key: ToDoPermission.canGetToDoCategoryList,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canViewTodoFeature]
	},
	{
		key: ToDoPermission.canGetPrivateToDo,
		feature: ToDoFeature.TODO,
		requiresScope: true,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canUpdateToDoCategory,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetToDoCategoryList]
	},
	{
		key: ToDoPermission.canCreateToDoComment,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllCommentsForToDo]
	},
	{
		key: ToDoPermission.canAssignUsersToToDo,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canCreateAttachmentForToDo,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canDeleteAttachmentForToDo,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canDeleteToDoComment,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllCommentsForToDo, ToDoPermission.canGetToDoComment]
	},
	{
		key: ToDoPermission.canSetHoursForToDoAlert,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canViewTodoFeature]
	},
	{
		key: ToDoPermission.canGetToDoComment,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllCommentsForToDo]
	},
	{
		key: ToDoPermission.canUpdateToDoComment,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllCommentsForToDo, ToDoPermission.canGetToDoComment]
	},
	{
		key: ToDoPermission.canCreateAlarm,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAlarmList]
	},
	{
		key: ToDoPermission.canUpdateAlarm,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAlarmList, ToDoPermission.canGetAlarm]
	},
	{
		key: ToDoPermission.canDeleteAlarm,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAlarmList, ToDoPermission.canGetAlarm]
	},
	{
		key: ToDoPermission.canEditToDo,
		feature: ToDoFeature.TODO
	},
	{
		key: ToDoPermission.canGetAlarm,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAlarmList]
	},
	{
		key: ToDoPermission.canGetAlarmList,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ToDoPermission.canGetAllToDosForUser,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canViewTodoFeature]
	},
	{
		key: ToDoPermission.canViewTodoFeature,
		feature: ToDoFeature.TODO
	},
	{
		key: ToDoPermission.canGetAttachmentForToDo,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	}
];
