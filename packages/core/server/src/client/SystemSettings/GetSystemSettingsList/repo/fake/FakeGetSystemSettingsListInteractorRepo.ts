import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {SystemSettingsListDTO, SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetSystemSettingsListInteractorRepo implements ListItems<SystemSettingsListDTO> {
	public list(input: ListRepoInputDTO): Promise<SystemSettingsListDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[
					{
						type: 'SMTP',
						url: SystemSettingsType.SMTP
					},
					{
						type: 'GLOBAL',
						url: SystemSettingsType.GLOBAL
					},
					{
						type: 'DISPLAY',
						url: SystemSettingsType.DISPLAY
					},
					{
						type: 'WORKFLOW',
						url: SystemSettingsType.WORKFLOW
					},
					{
						type: 'NOTIFIER',
						url: SystemSettingsType.NOTIFIER
					},
					{
						type: 'PASSWORD',
						url: SystemSettingsType.PASSWORD
					},
					{
						type: 'TIME_ZONE',
						url: SystemSettingsType.TIME_ZONE
					}
				]
			);
		});
	}
}
