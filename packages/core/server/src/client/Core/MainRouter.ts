import {UserRouter} from '../User/router/UserRouter';
import {UserDeletionRequestsRouter} from '@copor/core/client/User/router/UserDeletionRequestsRouter';
import {BaseRouter} from './BaseRouter';
import {getRegisteredModules} from '@copor/core/client/Core/Module/ModuleRegistry';
import {LocaleController} from '../Locale/LocaleController';
import {PublicAssetsDownloadController} from './Assets/controller/PublicAssetsDownloadController';
import {StateRouter} from '../Components/State/router/StateRouter';
import {LoginRouter} from '../Login/router/LoginRouter';
import {TagRouter} from '../Components/Tag/router/TagRouter';
import {LanguageRouter} from '../Components/Language/router/RouterLanguage';
import {NativeLanguageRouter} from '../Components/NativeLanguage/router/RouterNativeLanguage';
import {CountryRouter} from '../Components/Country/router/CountryRouter';
import {NotificationTokenRouter} from '../Components/NotificationToken/router/RouterNotificationToken';
import {NotificationRouter} from '../Components/Notification/router/RouterNotification';
import {UserPreferencesRouter} from '@copor/core/client/User/UserPreferences/router/RouterUserPreferences';
import {RoleRouter} from '../Components/Role/router/RouterRole';
import {PermissionRouter} from '../Components/Permission/router/PermissionRouter';
import {TenantRouter} from '../Components/Tenant/router/TenantRouter';
import {RegionRouter} from '../Components/Region/router/RouterRegion';
import {DoctorController} from './Doctor/DoctorController';
import {PhoneNumberRouter} from '../Global/PhoneNumber/router/PhoneNumberRouter';
import {GetLogoController} from './Logo/GetLogo/GetLogoController';
import {InitialsAvatarController} from './Avatar/InitialsAvatarController';
import {ImageRouter} from '@copor/core/client/Components/Image/router/RouterImage';
import {FeatureListRouter} from '@copor/core/client/FeatureList/router/FeatureListRouter';
import {DashboardMenuRouter} from '@copor/core/client/DashboardMenu/router/DashboardMenuRouter';
import {WebSocketConfigController} from '@copor/core/client/Core/WebSocket/WebSocketConfigController';
import {GetOnlineUserListController} from '@copor/core/client/Core/WebSocket/GetOnlineUserListController';
import {EnvironmentConfigController} from '@copor/core/client/Core/Environment/EnvironmentConfigController';
import {LogRouter} from '@copor/core/client/Log/router/LogRouter';
import {PublicRefdataRouter} from '@copor/core/client/Components/PublicRefdata/router/PublicRefdataRouter';
import {GetFilterListController} from '@copor/core/client/Filter/GetFilterList/GetFilterListController';
import {SystemSettingsRouter} from '@copor/core/client/SystemSettings/router/SystemSettingsRouter';
import {DocumentsRouter} from '@copor/core/client/Core/Documents/router/DocumentsRouter';
import {PasswordValidationRouter} from '@copor/core/client/Core/PasswordValidation/router/PasswordValidationRouter';
import {RouterRegionCity} from '@copor/core/client/Components/RegionCity/router/RouterRegionCity';
import {UserGroupRouter} from '@copor/core/client/UserGroup/router/UserGroupRouter';
import {EmailOutboxRouter} from '@copor/core/client/Core/EmailOutbox/router/EmailOutboxRouter';
import {AccountInformationRouter} from '@copor/core/client/AccountInformation/router/AccountInformationRouter';
import {HtmlPagesRouter} from '@copor/core/client/InfoPages/router/HtmlPagesRouter';
import {RegistrationRouter} from '@copor/core/client/Registration/router/RegistrationRouter';

export class MainRouter extends BaseRouter {
	protected initializeRoutes() {
		this.nextRouter('/login', LoginRouter);
		this.get('/locale/:ns', LocaleController);
		this.get('/logo', GetLogoController);
		this.get('/assets/*', PublicAssetsDownloadController);
		this.get('/avatar/initials/:name', InitialsAvatarController);
		this.nextRouter('/country', CountryRouter);
		this.nextRouter('/state', StateRouter);
		// /user/account-information must be above /user, otherwise /user will override it.
		this.nextRouter('/user/account-information', AccountInformationRouter);
		this.nextRouter('/user', UserRouter);
		this.nextRouter('/deletion-requests', UserDeletionRequestsRouter);
		this.nextRouter('/language', LanguageRouter);
		this.nextRouter('/native-language', NativeLanguageRouter);
		this.nextRouter('/region', RegionRouter);
		this.nextRouter('/tag', TagRouter);
		this.nextRouter('/notification-token', NotificationTokenRouter);
		this.nextRouter('/notification', NotificationRouter);
		this.nextRouter('/user-preferences', UserPreferencesRouter);
		this.nextRouter('/role', RoleRouter);
		this.nextRouter('/documents', DocumentsRouter);
		this.nextRouter('/permission', PermissionRouter);
		this.nextRouter('/tenant', TenantRouter);
		this.nextRouter('/phone-number', PhoneNumberRouter);
		this.nextRouter('/image', ImageRouter);
		this.get('/wsconfig', WebSocketConfigController);
		this.get('/online-users', GetOnlineUserListController);
		this.get('/envconfig', EnvironmentConfigController);
		this.get('/', DoctorController);
		this.nextRouter('/feature-list', FeatureListRouter);
		this.nextRouter('/dashboard-menu', DashboardMenuRouter);
		this.nextRouter('/log', LogRouter);
		this.nextRouter('/password', PasswordValidationRouter);
		this.nextRouter('/refdata/', PublicRefdataRouter);
		this.nextRouter('/system-settings/', SystemSettingsRouter);
		this.nextRouter('/region-city/', RouterRegionCity);
		this.nextRouter('/user-group', UserGroupRouter);
		this.nextRouter('/email', EmailOutboxRouter);
		this.get('/filter/:page', GetFilterListController);
		this.nextRouter('/info', HtmlPagesRouter);
		this.nextRouter('/registration', RegistrationRouter);

		this.registerModuleRoutes();
	}

	private registerModuleRoutes() {
		for (const module of getRegisteredModules()) {
			for (const route of module.routes ?? []) {
				this.nextRouter(route.path, route.router);
			}
		}
	}
}

