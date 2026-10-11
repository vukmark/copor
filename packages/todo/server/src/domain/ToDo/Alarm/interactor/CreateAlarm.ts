import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveAlarmDTO} from './dto/SaveAlarmDTO';

export class CreateAlarm extends CreateUseCase<SaveAlarmDTO> {}