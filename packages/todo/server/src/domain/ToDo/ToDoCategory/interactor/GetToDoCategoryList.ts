import {GetToDoCategoryDTO} from './dto/GetToDoCategoryDTO';
import {ListItemsUseCase} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class GetToDoCategoryList extends ListItemsUseCase<GetToDoCategoryDTO> {}
