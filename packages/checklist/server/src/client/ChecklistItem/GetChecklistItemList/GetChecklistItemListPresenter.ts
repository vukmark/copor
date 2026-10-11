import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetChecklistItemViewModel} from '@copor/checklist/client/ChecklistItem/GetChecklistItemList/GetChecklistItemViewModel';
import {GetChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/interactor/dto/GetChecklistItemDTO';

export class GetChecklistItemListPresenter extends PresenterInstance<GetChecklistItemDTO[], GetChecklistItemViewModel[]> {
	public present(): GetChecklistItemViewModel[] {
		return this.input.map((result) => {
			return {
				id: result.id,
				checklistId: result.checklistId,
				isChecked: result.isChecked,
				description: result.description
			};
		});
	}
}
