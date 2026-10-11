import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveTenantDTO} from './dto/SaveTenantDTO';

export class CreateTenant extends CreateUseCase<SaveTenantDTO> {}
