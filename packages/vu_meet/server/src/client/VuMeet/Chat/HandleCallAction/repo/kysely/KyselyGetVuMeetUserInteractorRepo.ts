import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetVuMeetUserDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetVuMeetUserDTO';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyGetVuMeetUserInteractorRepo implements GetItem<GetVuMeetUserDTO> {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async load(id: string): Promise<GetVuMeetUserDTO> {
		const user = await UserKyselyHelper.getUserData(id, this.appContext);

		if (!user)
			throw new Error(`User with id ${id} not found`);
		return {
			firstName: user.userFirstName!,
			lastName: user.userLastName!,
			imageName: user.imageName ?? undefined,
			imageExtension: user.imageExtension ?? undefined
		};
	}
}