import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {PostalCodeField} from '@copor/core/client/Core/Form/text_inputs/PostalCodeField';
import {CountryField} from '@copor/core/client/Core/Form/drop_down/CountryField';
import {StateField} from '@copor/core/client/Core/Form/drop_down/StateField';
import {GetStateDTOHelper} from '@copor/core/client/Components/State/Helper/GetStateDTOHelper';

interface GetRegionFormPresenterDTO {
	region: GetRegionDTO;
	countryList: GetCountryDTO[];
	stateList: GetStateDTO[];
}

export class GetRegionFormPresenter
	extends FormPresenter<GetRegionFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/region';
	}
	protected getFormFields(): FormField[] {
		const region = this.input.region;
		//const germany = this.input.countryList.find((country) => country.code === 'DE') ?? region.country;

		return [
			// new CountryField(
			// 	{id: germany.id, name: germany.name},
			// 	[{id: germany.id, name: germany.name}]
			// ),
			new StateField(
				{id: region.state.id, name: region.state.name},
				GetStateDTOHelper.toNameAndIdDTO(this.input.stateList)
			),
			new PostalCodeField(region.postalCode)
		];
	}
}
