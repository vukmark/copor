import {UpdateUserAccountInformationDTO} from '../interactor/dto/UpdateUserAccountInformationDTO';

export interface UpdateUserAccountInformationRepo {
	 save(input: UpdateUserAccountInformationDTO): Promise<void>;
}
