import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ListItemsUseCaseInput} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';
import {ListVisibleUsersRepo} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';

// The users the actor may see, for picking people (contacts, share recipients,
// chat members). The repository narrows the list to the actor's scope for
// `permissionType` (OWN: nobody else, TENANT: same tenant, ALL: everyone). Core
// has no route for it: each module subclasses it with its own permission and
// exposes it under its own path, so the module decides who may pick whom.
export abstract class ListVisibleUsers
	extends ExecuteUseCase<ListItemsUseCaseInput, ListVisibleUsersRepo, VisibleUserDTO[]> {
	protected abstract permissionType: PermissionType;
	// True to leave out deactivated users (e.g. nobody starts a chat with one).
	protected activeOnly = false;

	public execute(): Promise<VisibleUserDTO[]> {
		return this.repository.list({
			filters: this.input.filters,
			actorId: this.input.actorId!,
			permissionType: this.permissionType,
			activeOnly: this.activeOnly,
			limit: this.input.limit,
			offset: this.input.offset
		});
	}
}
