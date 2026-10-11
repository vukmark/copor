import {Generated} from './Generated';

export interface AuthUser {
	id: string;
	email: string | null;
	password: string;
	userName: string;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
