import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';
import {GetCountryWithStateListDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryWithStateListDTO';

export class GetCountry extends GetItemUseCase<GetCountryWithStateListDTO> {}
