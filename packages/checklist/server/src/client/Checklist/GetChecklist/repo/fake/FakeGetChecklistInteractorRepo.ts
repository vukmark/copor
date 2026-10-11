import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/GetChecklistDTO';

export class FakeGetChecklistInteractorRepo implements GetItem<GetChecklistDTO> {
	load(id: string): Promise<GetChecklistDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'id',
					title: 'title'
				}
			);
		});
	}
}