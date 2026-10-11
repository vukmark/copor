import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {GetStateDTOHelper} from '@copor/core/client/Components/State/Helper/GetStateDTOHelper';

export class GetStateSimpleListPresenter extends PresenterInstance<GetStateDTO[], PaginatedResponse<NameAndIdDTO>> {
	public present(): PaginatedResponse<NameAndIdDTO> {
		return {
			items: GetStateDTOHelper.toNameAndIdDTO(this.input)
		};
	}
}
