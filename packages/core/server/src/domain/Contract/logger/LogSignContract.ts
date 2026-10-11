import {TypedLogger} from '../../Core/Logger/Logger';
import {ContractType} from '../../Core/enum/ContractType';

export interface LogDataForSignContract {
	contractType: ContractType;
}

export class LogSignContract extends TypedLogger<LogDataForSignContract> {
	getType(): string {
		return 'signContract';
	}
}