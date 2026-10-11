import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';

export type GetAlarmRepo = GetItem<GetAlarmDTO>;
