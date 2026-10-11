import {IsInvalidTenantRepo} from '../../repository/IsInvalidTenantRepo';
import {NotBaseTenantRepo} from './NotBaseTenantRepo';
import {NotContractSignedRepo} from './NotContractSignedRepo';
import {TenantAlreadyActivatedRepo} from './TenantAlreadyActivatedRepo';

export interface ValidateGetTenantActivationDataRepo extends
	IsInvalidTenantRepo,
	NotBaseTenantRepo,
	NotContractSignedRepo,
	TenantAlreadyActivatedRepo {}