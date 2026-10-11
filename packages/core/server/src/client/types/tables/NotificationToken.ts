import {Generated} from './Generated';

export interface NotificationToken {
	id: string;
	token: string;
	type: 'android' | 'ios' | 'web' | 'ios_voip';
	userId: Generated<string | null>;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
