import {Generated} from './Generated';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

export interface TenantContract {
	id: string;
	contractType: ContractType;
	contractSigningDate: Date;
	contractPdfPath: string;
	signedBy: string;
	tenantId: string;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
