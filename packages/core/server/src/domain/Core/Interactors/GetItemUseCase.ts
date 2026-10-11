import {ExecuteUseCase} from './ExecuteUseCase';
import {GetItem} from '../Repository/GetItem';

export abstract class GetItemUseCase<RepoResponseDTO> extends ExecuteUseCase<string, GetItem<RepoResponseDTO>, RepoResponseDTO> {
	public async execute(): Promise<RepoResponseDTO> {
		return await this.repository.load(this.input);
	}
}