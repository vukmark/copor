import {ContractsSignedCheckResultDTO} from '@copor/core/domain/Login/interactor/dto/ContractsSignedCheckResultDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface LoginPresenterInput {
	contractResult: ContractsSignedCheckResultDTO | null;
	role?: RoleType;
	authToken: string;
	refreshToken: string;
}
