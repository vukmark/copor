import {AuthenticationType} from '../../../Core/enum/AuthenticationType';

export interface SaveSettingsDTO {
	id: string;
	darkMode: boolean;
	expertMode: boolean;
	waiAria: boolean;
	avatar: string;
	authentication?: AuthenticationType[];
	actorId: string;
}