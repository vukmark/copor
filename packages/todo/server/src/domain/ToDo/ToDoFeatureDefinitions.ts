import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {ToDoFeature} from '@copor/todo/domain/ToDo/ToDoFeature';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';

export const toDoFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: ToDoFeature.TODO,
		viewPermission: ToDoPermission.canViewTodoFeature,
		menuItem: {icon: 'listCheck', labelKey: 'TODO', order: 10}
	}
];
