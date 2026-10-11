import {UseCase} from './UseCase';

export abstract class ExecuteUseCase<Input, Repository, Response> implements UseCase<Response> {
	protected repository: Repository;
	protected input: Input;

	constructor(input: Input, repo: Repository) {
		this.input = input;
		this.repository = repo;
	}

	public abstract execute(): Promise<Response>;
}