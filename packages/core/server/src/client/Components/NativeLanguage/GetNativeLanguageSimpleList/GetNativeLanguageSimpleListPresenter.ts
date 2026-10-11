import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';

export class GetNativeLanguageSimpleListPresenter extends PaginatedPresenter<GetNativeLanguageDTO, NameAndIdDTO> {
	protected mapItem(dto: GetNativeLanguageDTO): NameAndIdDTO {
		return {id: dto.id, name: dto.name};
	}
}
