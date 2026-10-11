import {GetPhoneNumberDTO} from '../dto/GetPhoneNumberDTO';

export interface GetPhoneNumberListRepo {
	list(listId: string): Promise<GetPhoneNumberDTO[]>
}