import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';

export class CreateNews extends CreateUseCase<SaveNewsDTO> {}