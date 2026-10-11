import {GetChecklistDTO} from './dto/GetChecklistDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetChecklist extends GetItemUseCase<GetChecklistDTO> {}