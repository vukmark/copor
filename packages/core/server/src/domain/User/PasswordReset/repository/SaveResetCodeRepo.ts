import {CreateNewItem} from '@copor/core/domain/Core/Repository/CreateNewItem';
import {SaveResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/SaveResetCodeDTO';

export type SaveResetCodeRepo = CreateNewItem<SaveResetCodeDTO>;


