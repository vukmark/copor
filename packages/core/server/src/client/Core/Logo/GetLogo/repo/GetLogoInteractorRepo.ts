import {GetLogoDTO} from '@copor/core/domain/Core/global/Logo/interactor/dto/GetLogoDTO';
import {GetLogoRepo} from '@copor/core/domain/Core/global/Logo/repository/interactor/GetLogoRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class GetLogoInteractorRepo implements GetLogoRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	load(): Promise<GetLogoDTO> {
		const applicationType = this.appContext.envVariables!.APPLICATION_TYPE ?? 'copor';

		return Promise.resolve({
			fileName: applicationType + '.png'
		});
	}
}
