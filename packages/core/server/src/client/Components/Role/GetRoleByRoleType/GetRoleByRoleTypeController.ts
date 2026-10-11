import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetRoleByRoleTypeInteractorRepoPicker} from './repo/repoPicker/GetRoleByRoleTypeInteractorRepoPicker';
import {
	GetRoleByRoleType
} from '@copor/core/domain/Components/Role/interactor/GetRoleByRoleType';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';

interface GetRoleByRoleTypeParams {
	type: RoleType;
}

export class GetRoleByRoleTypeController extends BaseController<undefined, GetRoleDTO> {
	async getResponse(): Promise<void> {
		const params: GetRoleByRoleTypeParams = this.request.params as GetRoleByRoleTypeParams;
		const role = await this.interactor(params.type);

		this.response.status(200);
		this.response.send(role);
	}

	private async interactor(roleType: RoleType): Promise<GetRoleDTO> {
		const interactorRepository = this.container.getNewRepoPicker(GetRoleByRoleTypeInteractorRepoPicker);

		const interactorUseCase = this.container.getInteractor(
			GetRoleByRoleType,
			interactorRepository,
			roleType
		);

		return await interactorUseCase.execute();
	}
}
