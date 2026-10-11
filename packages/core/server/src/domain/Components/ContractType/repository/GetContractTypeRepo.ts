import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';

export type GetContractTypeRepo = GetItem<GetContractTypeDTO>;