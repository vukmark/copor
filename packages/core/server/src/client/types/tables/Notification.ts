import {Generated} from './Generated';

export interface Notification {
	id: string;
	description: Generated<string | null>;
	seen: boolean;
	title: string;
	userId: Generated<string | null>;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
