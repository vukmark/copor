import {ToggleUserActiveStatusRepo} from '@copor/core/domain/User/repository/ToggleUserActiveStatusRepo';

export class FakeToggleUserActiveStatusInteractorRepo implements ToggleUserActiveStatusRepo {
	updateIsActive(id: string, isActive: boolean): Promise<void> {
		return Promise.resolve(undefined);
	}
}
