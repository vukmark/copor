import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetLogListInteractorRepo implements ListItems<GetLogDTO> {
	public list(input: ListRepoInputDTO): Promise<GetLogDTO[]> {
		return new Promise((resolve) => {
			resolve([
				{
					id: '1',
					actorId: 'user-123',
					logData: {
						action: 'create',
						target: 'document',
						details: {documentId: 'doc-456'}
					},
					actorUserName: 'johndoe',
					logType: 'CREATE_ACTION',
					createdAt: new Date('2025-06-18T10:00:00Z')
				},
				{
					id: '2',
					actorId: 'user-456',
					logData: {
						action: 'update',
						target: 'profile',
						changes: {field: 'email', oldValue: 'old@example.com', newValue: 'new@example.com'}
					},
					actorUserName: 'janedoe',
					logType: 'UPDATE_ACTION',
					createdAt: new Date('2025-06-18T11:00:00Z')
				}
			]);
		});
	}
}
