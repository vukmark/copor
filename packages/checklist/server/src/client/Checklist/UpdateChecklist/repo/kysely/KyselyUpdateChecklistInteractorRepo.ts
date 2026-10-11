import {db} from '@copor/core/client/AppDataSource';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';
import {UpdateChecklistRepo} from '@copor/checklist/domain/Checklist/repository/UpdateChecklistRepo';

export class KyselyUpdateChecklistInteractorRepo implements UpdateChecklistRepo {
	async update(checklistDTO: SaveChecklistDTO): Promise<void> {
		await db
			.updateTable('checklist')
			.set({
				title: checklistDTO.title,
				actorId: checklistDTO.actorId
			})
			.where('id', '=', checklistDTO.id)
			.execute();
	}
}