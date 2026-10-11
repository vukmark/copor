import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetPrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/GetPrivateToDoDTO';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

export class FakeGetPrivateToDoInteractorRepo implements GetItem<GetPrivateToDoDTO> {
	load(id: string): Promise<GetPrivateToDoDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: '1',
					title: 'Complete TypeScript Project',
					priority: Priority.HIGH,
					isDisplayedInCalendar: true,
					progress: Progress.ALMOST_DONE,
					isPinned: false
				}
			);
		});
	}
}
