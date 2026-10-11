import {GetLogoDTO} from '../../interactor/dto/GetLogoDTO';

export interface GetLogoRepo {
	load(): Promise<GetLogoDTO>;
}
