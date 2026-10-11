import {cloud} from './KnoledgeBase/Cloud';
import {contacts} from './KnoledgeBase/Contacts';
import {help} from './KnoledgeBase/Help';
import {search} from './KnoledgeBase/Search';
import {vuMeet} from './KnoledgeBase/VuMeet';
import {todo} from './KnoledgeBase/Todo';
import type {AiBotUserRole} from '../dto/CreatePrivateMessageReqBodyDTO';

export type KnowledgeBaseUserRole = AiBotUserRole;

export interface KnowledgeBaseFeatureConfig {
	path: string;
	name: string;
	recognitionNames: string[];
	documentation: string;
	allowedRoles?: KnowledgeBaseUserRole[];
	includedByDefaultForRoles?: KnowledgeBaseUserRole[];
}

export const knowledgeBaseFeatureRegistry: KnowledgeBaseFeatureConfig[] = [
	{
		path: '/todo',
		name: 'To Do',
		recognitionNames: ['To Do', 'Tasks'],
		documentation: todo
	},
	{
		path: '/cloud',
		name: 'Cloud',
		recognitionNames: ['Cloud', 'Files', 'Folders'],
		documentation: cloud
	},
	{
		path: '/vu-meet',
		name: 'VuMeet',
		recognitionNames: ['VuMeet', 'Chat', 'Messages', 'Messaging'],
		documentation: vuMeet
	},
	{
		path: '/search',
		name: 'Search',
		recognitionNames: ['Search'],
		documentation: search
	},
	{
		path: '/contacts',
		name: 'Contacts',
		recognitionNames: ['Contacts', 'People', 'Directory'],
		documentation: contacts
	},
	{
		path: '/help',
		name: 'Help',
		recognitionNames: ['Help'],
		documentation: help,
		includedByDefaultForRoles: ['user', 'admin']
	}
];
