import {Id} from '@copor/core/domain/Core/Repository/Id';

export interface SaveAttachmentForToDoDTO extends Id {
	todoId: string;
	actorId: string;
	name: string;
	size: number;
	creationDateTime: Date;
}
