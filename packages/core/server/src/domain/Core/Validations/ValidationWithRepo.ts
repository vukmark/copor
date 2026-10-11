import {Validation} from './Validation';

export abstract class ValidationWithRepo<InputForValidation, StorageRepo> extends Validation<InputForValidation> {
	protected readonly storageRepo: StorageRepo;

	constructor(input: InputForValidation, storageRepo: StorageRepo) {
		super(input);
		this.storageRepo = storageRepo;
	}
}
