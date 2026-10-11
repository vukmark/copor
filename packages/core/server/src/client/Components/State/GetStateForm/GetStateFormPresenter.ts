import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {FormField} from '@copor/core/client/Core/Form/FormField';
import {NameField} from '@copor/core/client/Core/Form/text_inputs/NameField';
import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {PublishStatusField} from '@copor/core/client/Core/Form/drop_down/PublishStatusField';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {HiddenTextField} from '@copor/core/client/Core/Form/text_inputs/HiddenTextField';

interface GetStateFormPresenterDTO {
	state?: GetStateDTO;
	countryList: GetCountryDTO[];
	germanyCountryId: string;
}

export class GetStateFormPresenter
	extends FormPresenter<GetStateFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/state';
	}

	protected getFormFields(): FormField[] {
		const state = this.input.state;
		const germanyCountryId = this.input.germanyCountryId;

		return [
			new NameField(state?.name ?? ''),
			new StateCodeField(state?.code ?? ''),
			new StateCountryField(germanyCountryId, 'COUNTRY', 'countryId'),
			new PublishStatusField(state?.publishStatus ?? PublishStatus.unpublished)
		];
	}
}

class StateCodeField extends TextField {
	protected getLabel(): string {
		return 'CODE';
	}

	protected getName(): string {
		return 'code';
	}
}

class StateCountryField extends HiddenTextField {
}
