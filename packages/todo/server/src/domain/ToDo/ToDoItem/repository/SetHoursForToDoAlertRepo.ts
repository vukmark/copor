import {SetHoursForToDoAlertDTO} from '../interactor/dto/SetHoursForToDoAlertDTO';

export interface SetHoursForToDoAlertRepo {
	setHours(inputDto: SetHoursForToDoAlertDTO): Promise<void>;
}
