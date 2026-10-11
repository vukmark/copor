import {Validator} from './Validator';

export abstract class ValidatorWithRepo<Repo, Input> implements Validator {
	protected readonly repository: Repo;
	protected readonly input: Input | undefined;

	constructor(repo: Repo, input: Input | undefined) {
		this.repository = repo;
		this.input = input;
	}

	public abstract validate(): Promise<void>;
}
