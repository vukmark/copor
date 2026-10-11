import {GetStateDTO} from './dto/GetStateDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetState extends GetItemUseCase<GetStateDTO> {}