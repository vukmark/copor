import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetVuMeetUserDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetVuMeetUserDTO';

export class FakeGetVuMeetUserInteractorRepo implements GetItem<GetVuMeetUserDTO> {
	load(id: string): Promise<GetVuMeetUserDTO> {
		return Promise.resolve({
			firstName: 'Mirko',
			lastName: 'Mirkovic',
			imageName: 'default',
			imageExtension: 'jpg'
		});
	}
}