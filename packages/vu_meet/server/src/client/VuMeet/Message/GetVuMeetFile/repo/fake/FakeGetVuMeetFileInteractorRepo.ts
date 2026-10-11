import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetVuMeetFileDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetVuMeetFileDTO';

export class FakeGetVuMeetFileInteractorRepo implements GetItem<GetVuMeetFileDTO> {
	load(id: string): Promise<GetVuMeetFileDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					file: Buffer.from('test buffer'),
					fileName: 'name.jpeg'
				}
			);
		});
	}
}