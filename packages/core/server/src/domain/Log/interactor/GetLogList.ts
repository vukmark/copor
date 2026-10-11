import {GetLogDTO} from './dto/GetLogDTO';
import {ListItemsUseCase} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class GetLogList extends ListItemsUseCase<GetLogDTO> {}
