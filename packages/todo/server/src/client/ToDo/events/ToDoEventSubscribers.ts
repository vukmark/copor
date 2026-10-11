import {db} from '@copor/core/client/AppDataSource';
import {ModuleEventSubscribers} from '@copor/core/client/Core/Module/ModuleEvents';

export const toDoEventSubscribers: ModuleEventSubscribers = {
	// to_do_tag_map has no foreign key to tag, so nothing cascades.
	tagDeleted: async ({tagId}) => {
		await db
			.deleteFrom('toDoTagMap')
			.where('tagId', '=', tagId)
			.execute();
	}
};
