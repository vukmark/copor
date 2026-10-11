import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';

export class GetDefaultCountry extends GetItemUseCase<GetCountryDTO[]> {}
