import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetLogListController} from '@copor/core/client/Log/GetLogList/GetLogListController';
import {GetLogTableController} from '@copor/core/client/Log/GetLogTable/GetLogTableController';
import {GetLogController} from '@copor/core/client/Log/GetLog/GetLogController';
import {GetLogInfoController} from '@copor/core/client/Log/GetLogInfo/GetLogInfoControlller';

export class LogRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/table', GetLogTableController);
		this.get('/', GetLogListController);
		this.get('/:id', GetLogController);
		this.get('/info/:id', GetLogInfoController);
	}
}