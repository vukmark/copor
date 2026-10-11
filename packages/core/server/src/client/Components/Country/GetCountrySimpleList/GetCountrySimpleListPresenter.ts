import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';

export class GetCountrySimpleListPresenter extends PaginatedPresenter<GetCountryDTO, NameAndIdDTO> {
	protected mapItem(input: GetCountryDTO): NameAndIdDTO<string> {
		return {
			id: input.id,
			name: input.name
		};
	}
}
