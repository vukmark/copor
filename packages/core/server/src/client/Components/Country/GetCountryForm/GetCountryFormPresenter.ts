import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {FormField} from '@copor/core/client/Core/Form/FormField';
import {NameField} from '@copor/core/client/Core/Form/text_inputs/NameField';
import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {PublishStatusField} from '@copor/core/client/Core/Form/drop_down/PublishStatusField';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CountryField} from '@copor/core/client/Core/Form/drop_down/CountryField';
import {GetStateDTOHelper} from '@copor/core/client/Components/State/Helper/GetStateDTOHelper';

interface GetCountryFormPresenterDTO {
	country?: GetCountryDTO;
	stateList: GetStateDTO[];
}

export class GetCountryFormPresenter
	extends FormPresenter<GetCountryFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/country';
	}

	protected getFormFields(): FormField[] {
		return [
			new NameField(this.input.country?.name),
			new CountryCodeField(this.input.country?.code),
			new PublishStatusField(this.input.country?.publishStatus ?? PublishStatus.unpublished),
			//@TODO see on old web site
			new CountryField(
				{id: this.input.country?.id ?? '', name: this.input.country?.name ?? ''},
				GetStateDTOHelper.toNameAndIdDTO(this.input.stateList)
			)
		];
	}
}

class CountryCodeField extends TextField {
	protected getLabel(): string {
		return 'CODE';
	}

	protected getName(): string {
		return 'code';
	}
}
