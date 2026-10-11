import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';

export class GetNews extends GetItemUseCase<GetNewsDTO> {}