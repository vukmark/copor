import {ListItemsUseCase} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';

export class GetNewsList extends ListItemsUseCase<GetNewsDTO> {}