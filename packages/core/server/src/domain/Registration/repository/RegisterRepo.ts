import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/SaveRegistrationDTO';

// Creates the inactive account and its verification code, then emails the code.
export type RegisterRepo = SaveItem<SaveRegistrationDTO>;
