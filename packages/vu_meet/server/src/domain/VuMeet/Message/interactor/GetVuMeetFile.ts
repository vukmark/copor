import {GetVuMeetFileDTO} from './dto/GetVuMeetFileDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/GetVuMeetFileRepo';
import {GetVuMeetFileInputDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetVuMeetFileInputDTO';

export class GetVuMeetFile extends ExecuteUseCase<GetVuMeetFileInputDTO, GetVuMeetFileRepo, GetVuMeetFileDTO> {
	public execute(): Promise<GetVuMeetFileDTO> {
		return this.repository.load(this.input.messageId, this.input.actorId);
	}
}
