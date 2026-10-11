import {ListItemsUseCase} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';

export class GetPublicTagList extends ListItemsUseCase<GetTagDTO> {}