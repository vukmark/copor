import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {IsEmailAlreadyInUseRepo} from '@copor/core/domain/Core/Repository/IsEmailAlreadyInUseRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {IsUsernameTakenRepo} from '@copor/core/domain/Registration/repository/IsUsernameTakenRepo';

export interface ValidateRegisterRepo
	extends RegistrationStatusRepo, IsEmailAlreadyInUseRepo, GetPasswordPolicyRepo, IsUsernameTakenRepo {}
