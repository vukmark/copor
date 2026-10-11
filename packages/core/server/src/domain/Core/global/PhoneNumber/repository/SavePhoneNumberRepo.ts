import {SavePhoneNumberDTO} from '../dto/SavePhoneNumberDTO';

export interface SavePhoneNumberRepo {
	save(saveDTO: SavePhoneNumberDTO[]): Promise<void>;
}