import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';
import {GetTagDTO} from './dto/GetTagDTO';

export class GetTag extends GetItemUseCase<GetTagDTO> {}