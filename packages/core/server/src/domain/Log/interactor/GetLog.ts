import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';

export class GetLog extends GetItemUseCase<GetLogDTO> {}