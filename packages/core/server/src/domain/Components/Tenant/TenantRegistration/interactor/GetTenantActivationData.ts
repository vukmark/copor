import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';
import {GetTenantActivationDataDTO} from './dto/GetTenantActivationDataDTO';

export class GetTenantActivationData extends GetItemUseCase<GetTenantActivationDataDTO> {}