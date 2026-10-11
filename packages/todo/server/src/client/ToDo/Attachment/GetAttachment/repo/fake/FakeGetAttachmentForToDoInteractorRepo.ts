import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/GetAttachmentForToDoDTO';

export class FakeGetAttachmentForToDoInteractorRepo implements GetItem<GetAttachmentForToDoDTO> {
	load(id: string): Promise<GetAttachmentForToDoDTO> {
		return Promise.resolve({
			file: Buffer.from('fake-file-contents'),
			fileName: 'attachment.pdf'
		});
	}
}
