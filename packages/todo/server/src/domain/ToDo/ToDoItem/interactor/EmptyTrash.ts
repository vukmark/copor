import {EmptyTrashRepo} from '../repository/EmptyTrashRepo';

export class EmptyTrash {
	private repository: EmptyTrashRepo;

	constructor(repository: EmptyTrashRepo) {
		this.repository = repository;
	}

	public async execute(): Promise<void> {
		await this.repository.emptyTrash();
	}
}
