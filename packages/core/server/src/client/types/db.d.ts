/**
 * Table interfaces live under ./tables/*. This file only holds the DB interface mapping table names to their types.
 */

import {Address} from './tables/Address';
import {AuthUser} from './tables/AuthUser';
import {Contract} from './tables/Contract';
import {Country} from './tables/Country';
import {TenantContract} from './tables/TenantContract';
import {Image} from './tables/Image';
import {Language} from './tables/Language';
import {NativeLanguage} from './tables/NativeLanguage';
import {Notification} from './tables/Notification';
import {NotificationToken} from './tables/NotificationToken';
import {PhoneNumber} from './tables/PhoneNumber';
import {Role} from './tables/Role';
import {RolePermission} from './tables/RolePermission';
import {Tenant} from './tables/Tenant';
import {State} from './tables/State';
import {User} from './tables/User';
import {UserContractMap} from './tables/UserContractMap';
import {UserPermission} from './tables/UserPermission';
import {UserGroupPermission} from './tables/UserGroupPermission';
import {UserPreferences} from './tables/UserPreferences';
import {UserModulePreference} from './tables/UserModulePreference';
import {Region} from './tables/Region';
import {RegionCity} from './tables/RegionCity';
import {TagTable} from './tables/TagTable';
import {LogTable} from './tables/LogTable';
import {UserGroupTable} from './tables/UserGroupTable';
import {UserGroupClosureTable} from './tables/UserGroupClosureTable';
import {UserGroupUserMap} from './tables/UserGroupUserMap';
import {UnexpectedError} from './tables/UnexpectedError';
import {EmailOutBox} from './tables/EmailOutBox';
import {UserPermissionCache} from './tables/UserPermissionCache';
import type {ColumnType} from 'kysely';
import {PasswordResetToken} from '@copor/core/client/types/tables/PasswordResetToken';
import {RegistrationVerification} from '@copor/core/client/types/tables/RegistrationVerification';
import {PasswordHistory} from '@copor/core/client/types/tables/PasswordHistory';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;

export interface DB {
	emailOutbox: EmailOutBox;
	address: Address;
	authUser: AuthUser;
	contract: Contract;
	country: Country;
	tenantContract: TenantContract;
	image: Image;
	language: Language;
	nativeLanguage: NativeLanguage;
	notification: Notification;
	notificationToken: NotificationToken;
	passwordResetToken: PasswordResetToken;
	registrationVerification: RegistrationVerification;
	passwordHistory: PasswordHistory;
	phoneNumber: PhoneNumber;
	region: Region;
	regionCity: RegionCity;
	role: Role;
	rolePermission: RolePermission;
	tenant: Tenant;
	state: State;
	user: User;
	userContractMap: UserContractMap;
	userPermission: UserPermission;
	userGroupPermission: UserGroupPermission;
	userPreferences: UserPreferences;
	userModulePreference: UserModulePreference;
	tag: TagTable;
	log: LogTable;
	userGroup: UserGroupTable;
	userGroupClosure: UserGroupClosureTable;
	userGroupUserMap: UserGroupUserMap;
	unexpectedError: UnexpectedError;
	userPermissionCache: UserPermissionCache;
}
