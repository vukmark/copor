import {BaseController} from '../../BaseController';
import {GetLogoDTO} from '@copor/core/domain/Core/global/Logo/interactor/dto/GetLogoDTO';
import {GetLogoInteractorRepo} from './repo/GetLogoInteractorRepo';

export class GetLogoController extends BaseController<undefined, GetLogoDTO> {
	public async getResponse(): Promise<void> {
		const getLogoRepo: GetLogoInteractorRepo = new GetLogoInteractorRepo(this.container.appContext);
		const response = await getLogoRepo.load();

		this.response.status(200);
		this.response.send(response);
	}
}
