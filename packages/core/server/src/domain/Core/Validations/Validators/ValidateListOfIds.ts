import {Validator} from './Validator';
import {EmptyIDInListException} from '../../Exceptions/empty/EmptyIDInListException';

export class ValidateListOfIds implements Validator {
	private listOfIds: string[];

	constructor(listOfIds: string[]) {
		this.listOfIds = listOfIds;
	}

	public async validate(): Promise<void> {
		if (this.listOfIds.some((id) => id.trim() === '')) {
			throw new EmptyIDInListException();
		}
	}
}