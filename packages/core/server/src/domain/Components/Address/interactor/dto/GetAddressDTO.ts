import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';

export interface GetAddressDTO {
	addressId?: string;
	streetAddress?: string;
	postalCode?: string;
	city?: string;
	country?: GetCountryDTO;
	state?: GetStateDTO;
}