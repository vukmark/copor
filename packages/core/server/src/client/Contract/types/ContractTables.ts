import {ContractTypeTable} from '@copor/core/client/Contract/types/ContractTypeTable';

// The Contract module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		contractType: ContractTypeTable;
	}
}
