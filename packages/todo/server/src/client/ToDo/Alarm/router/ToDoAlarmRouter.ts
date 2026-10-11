import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateAlarmController} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/CreateAlarmController';
import {DeleteAlarmController} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/DeleteAlarmController';
import {UpdateAlarmController} from '@copor/todo/client/ToDo/Alarm/UpdateToDoAlarm/UpdateAlarmController';
import {GetAlarmController} from '@copor/todo/client/ToDo/Alarm/GetAlarm/GetAlarmController';
import {GetAlarmListController} from '@copor/todo/client/ToDo/Alarm/GetAlarmList/GetAlarmListController';

export class ToDoAlarmRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/', CreateAlarmController);
		this.delete('/:id', DeleteAlarmController);
		this.patch('/', UpdateAlarmController);
		this.get('/list', GetAlarmListController);
		this.get('/:id', GetAlarmController);
	}
}