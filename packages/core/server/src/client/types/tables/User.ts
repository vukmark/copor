import {Generated} from './Generated';

export interface User {
	id: string;
	authUserId: Generated<string | null>;
	isActive: Generated<number>;
	isDefaultRole: Generated<number>;
	profileImageId: Generated<string | null>;
	roleId: Generated<string | null>;
	tenantId: string | null;
	firstName: string | null;
	lastName: string | null;
	nickname: string | null;
	salutation: string | null;
	qualifications: string | null;
	placeOfBirth: string | null;
	gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
	citizenship: string | null;
	nativeLanguage: string | null;
	addressId: string | null;
	contactNote: string | null;
	lastVisitedAt: Generated<Date | null>;
	deletionRequested: Generated<boolean>;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
