import {SaveCountryDTO} from './dto/SaveCountryDTO';
import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';

export class CreateCountry extends CreateUseCase<SaveCountryDTO> {
}
