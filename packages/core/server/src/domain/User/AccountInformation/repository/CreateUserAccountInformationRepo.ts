import {SaveUserAccountInformationDTO} from '../interactor/dto/SaveUserAccountInformationDTO';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

export type CreateUserAccountInformationRepo = SaveItem<SaveUserAccountInformationDTO>;
