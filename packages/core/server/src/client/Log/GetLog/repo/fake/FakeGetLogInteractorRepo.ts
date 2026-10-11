import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';

export class FakeGetLogInteractorRepo implements GetItem<GetLogDTO> {
	load(id: string): Promise<GetLogDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'log-123',
					actorId: 'actor-123',
					logData: {},
					actorUserName: 'actor',
					logType: 'type',
					createdAt: new Date()
				}
			);
		});
	}
}