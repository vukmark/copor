import {IsInvalidAlarmRepo} from './IsInvalidAlarmRepo';
import {IsInvalidAlarmableRepo} from '@copor/todo/domain/ToDo/Alarm/repository/IsInvalidAlarmableRepo';

export interface ValidateUpdateAlarmRepo extends IsInvalidAlarmRepo, IsInvalidAlarmableRepo {
}
