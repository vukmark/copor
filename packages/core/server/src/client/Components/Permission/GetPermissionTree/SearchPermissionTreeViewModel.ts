import {GetPermissionTreeViewModel} from './GetPermissionTreeViewModel';

export interface SearchPermissionTreeViewModel extends GetPermissionTreeViewModel {
	limit?: string;
	offset?: string;
}
