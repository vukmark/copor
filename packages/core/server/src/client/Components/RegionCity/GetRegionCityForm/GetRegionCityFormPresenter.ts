import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {FormField, RequiredField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {RequiredLatitudeField} from '@copor/core/client/Core/Form/text_inputs/LatitudeField';
import {RequiredLongitudeField} from '@copor/core/client/Core/Form/text_inputs/LongitudeField';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {NameAndIdDTO, NameAndIdDToHelper} from '@copor/core/domain/Core/NamedIdDTO';
import {SearchableDropdownField} from '@copor/core/client/Core/Form/SearchableDropdownField';

interface GetRegionCityFormPresenterDTO {
	regionCity: GetRegionCityDTO;
	currentRegion: GetRegionDTO | null;
}

export class GetRegionCityFormPresenter
	extends FormPresenter<GetRegionCityFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/region-city';
	}

	protected getFormFields(): FormField[] {
		const regionCity = this.input.regionCity;
		const currentRegion = this.input.currentRegion;

		const selectedRegion: NameAndIdDTO<string> = currentRegion
			? {
				id: currentRegion.id,
				name: `${currentRegion.postalCode}, ${currentRegion.country.name}, ${currentRegion.state.name}`
			}
			: NameAndIdDToHelper.emptyString();

		return [
			new RegionField(selectedRegion),
			new CreateRegionButtonField(),
			new CityField(regionCity.city),
			new ProvinceField(regionCity.province),
			new ProvinceCodeField(regionCity.provinceCode),
			new CommunityField(regionCity.community),
			new CommunityCodeField(regionCity.communityCode),
			new RequiredLatitudeField(regionCity.latitude),
			new RequiredLongitudeField(regionCity.longitude)
		];
	}
}

class RegionField extends SearchableDropdownField implements RequiredField {
	getRequiredMessage(): string {
		return 'REGION_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'REGION';
	}

	protected getKey(): string {
		return 'region';
	}

	protected getName(): string {
		return 'regionId';
	}
}

class CreateRegionButtonField extends FormField {
	constructor() {
		super();
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.CREATE_REGION_BUTTON;
	}

	protected getLabel(): string {
		return 'CREATE_REGION';
	}

	protected getName(): string {
		return 'createRegionButton';
	}

	protected getCurrentValue(): FieldValueDTO {
		return {};
	}
}

class CityField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'CITY_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'CITY';
	}

	protected getName(): string {
		return 'city';
	}
}

class ProvinceField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'PROVINCE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'PROVINCE';
	}

	protected getName(): string {
		return 'province';
	}
}

class ProvinceCodeField extends TextField {
	protected getLabel(): string {
		return 'PROVINCE_CODE';
	}

	protected getName(): string {
		return 'provinceCode';
	}
}

class CommunityField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'COMMUNITY_CODE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'COMMUNITY';
	}

	protected getName(): string {
		return 'community';
	}
}

class CommunityCodeField extends TextField {
	protected getLabel(): string {
		return 'COMMUNITY_CODE';
	}

	protected getName(): string {
		return 'communityCode';
	}
}