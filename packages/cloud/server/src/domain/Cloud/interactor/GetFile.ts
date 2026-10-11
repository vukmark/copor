import {GetFileDTO} from './dto/GetFileDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetFile extends GetItemUseCase<GetFileDTO> {}
