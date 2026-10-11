import {Generated} from './Generated';

export interface UnexpectedError {
	id: string;
	actorId: string | null;
	message: string;
	method: string | null;
	path: string | null;
	stack: string | null;
	createdAt: Generated<Date>;
}
