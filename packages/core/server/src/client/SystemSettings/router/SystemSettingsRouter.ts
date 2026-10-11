import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetSMTPSystemSettingsController} from '@copor/core/client/SystemSettings/GetSMTPSystemSettings/GetSMTPSystemSettingsController';
import {UpdateSMTPSystemSettingsController} from '@copor/core/client/SystemSettings/UpdateSMTPSystemSettings/UpdateSMTPSystemSettingsController';
import {
	GetSystemSettingsListController
} from '@copor/core/client/SystemSettings/GetSystemSettingsList/GetSystemSettingsListController';
import {
	GetGlobalSystemSettingsController
} from '@copor/core/client/SystemSettings/GetGlobalSystemSettings/GetGlobalSystemSettingsController';
import {
	UpdateGlobalSystemSettingsController
} from '@copor/core/client/SystemSettings/UpdateGlobalSystemSettings/UpdateGlobalSystemSettingsController';
import {
	GetDisplaySystemSettingsController
} from '@copor/core/client/SystemSettings/GetDisplaySystemSettings/GetDisplaySystemSettingsController';
import {
	UpdateDisplaySystemSettingsController
} from '@copor/core/client/SystemSettings/UpdateDisplaySystemSettings/UpdateDisplaySystemSettingsController';
import {
	GetWorkflowSystemSettingsController
} from '@copor/core/client/SystemSettings/GetWorkflowSystemSettings/GetWorkflowSystemSettingsController';
import {
	UpdateWorkflowSystemSettingsController
} from '@copor/core/client/SystemSettings/UpdateWorkflowSystemSettings/UpdateWorkflowSystemSettingsController';
import {
	GetNotifierSystemSettingsController
} from '@copor/core/client/SystemSettings/GetNotifierSystemSettings/GetNotifierSystemSettingsController';
import {
	UpdateNotifierSystemSettingsController
} from '@copor/core/client/SystemSettings/UpdateNotifierSystemSettings/UpdateNotifierSystemSettingsController';
import {SendTestEmailController} from '@copor/core/client/SystemSettings/SendTestEmail/SendTestEmailController';
import {SendTestEmailFormController} from '@copor/core/client/SystemSettings/SendTestEmail/SendTestEmailFormController';
import {
	GetPasswordSystemSettingsController
} from '@copor/core/client/SystemSettings/GetPasswordSystemSettings/GetPasswordSystemSettingsController';
import {
	UpdatePasswordSystemSettingsController
} from '@copor/core/client/SystemSettings/UpdatePasswordSystemSettings/UpdatePasswordSystemSettingsController';
import {
	GetTimeZoneSystemSettingsController
} from '@copor/core/client/SystemSettings/GetTimeZoneSystemSettings/GetTimeZoneSystemSettingsController';
import {
	UpdateTimeZoneSystemSettingsController
} from '@copor/core/client/SystemSettings/UpdateTimeZoneSystemSettings/UpdateTimeZoneSystemSettingsController';

export class SystemSettingsRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/table', GetSystemSettingsListController);
		this.get('/form/smtp', GetSMTPSystemSettingsController);
		this.get('/form/global', GetGlobalSystemSettingsController);
		this.get('/form/display', GetDisplaySystemSettingsController);
		this.get('/form/workflow', GetWorkflowSystemSettingsController);
		this.get('/form/notifier', GetNotifierSystemSettingsController);
		this.get('/form/password', GetPasswordSystemSettingsController);
		this.get('/form/time-zone', GetTimeZoneSystemSettingsController);
		this.patch('/smtp', UpdateSMTPSystemSettingsController);
		this.patch('/global', UpdateGlobalSystemSettingsController);
		this.patch('/display', UpdateDisplaySystemSettingsController);
		this.patch('/workflow', UpdateWorkflowSystemSettingsController);
		this.patch('/notifier', UpdateNotifierSystemSettingsController);
		this.patch('/password', UpdatePasswordSystemSettingsController);
		this.patch('/time-zone', UpdateTimeZoneSystemSettingsController);
		this.get('/form/smtp-test', SendTestEmailFormController);
		this.patch('/smtp/test', SendTestEmailController);
	}
}