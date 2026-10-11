import {ExecuteUseCase} from '../../Core/Interactors/ExecuteUseCase';
import {SetTenantLogoDTO} from './dto/SetTenantLogoDTO';
import {SaveItem} from '../../Core/Repository/SaveItem';

export class SetTenantLogo extends ExecuteUseCase< SetTenantLogoDTO, SaveItem<SetTenantLogoDTO>, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
