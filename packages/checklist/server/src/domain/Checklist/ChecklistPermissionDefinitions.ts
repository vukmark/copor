import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {ToDoFeature} from '@copor/todo/domain/ToDo/ToDoFeature';
import {ChecklistPermission} from '@copor/checklist/domain/Checklist/ChecklistPermission';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';

export const checklistPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: ChecklistPermission.canGetChecklistItemList,
		feature: ToDoFeature.TODO,
		dependsOn: [ChecklistPermission.canGetChecklist]
	},
	{
		key: ChecklistPermission.canCreateChecklist,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	},
	{
		key: ChecklistPermission.canEditChecklist,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser, ChecklistPermission.canGetChecklist]
	},
	{
		key: ChecklistPermission.canCreateChecklistItem,
		feature: ToDoFeature.TODO,
		dependsOn: [ChecklistPermission.canGetChecklistItemList]
	},
	{
		key: ChecklistPermission.canDeleteChecklist,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser, ChecklistPermission.canGetChecklist]
	},
	{
		key: ChecklistPermission.canDeleteChecklistItem,
		feature: ToDoFeature.TODO,
		dependsOn: [ChecklistPermission.canGetChecklistItemList]
	},
	{
		key: ChecklistPermission.canEditChecklistItem,
		feature: ToDoFeature.TODO,
		dependsOn: [ChecklistPermission.canGetChecklistItemList]
	},
	{
		key: ChecklistPermission.canSetCheckedChecklistItem,
		feature: ToDoFeature.TODO,
		dependsOn: [ChecklistPermission.canGetChecklistItemList]
	},
	{
		key: ChecklistPermission.canGetChecklist,
		feature: ToDoFeature.TODO,
		dependsOn: [ToDoPermission.canGetAllToDosForUser]
	}
];
