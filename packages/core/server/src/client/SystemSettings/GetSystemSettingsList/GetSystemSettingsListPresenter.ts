import {SystemSettingsListDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {ColumnHeader, SimpleTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import {ActionCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import i18next from 'i18next';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {Alignment} from "@copor/core/client/Core/Table/enum/Alignment";

export class GetSystemSettingsListPresenter extends SimpleTablePresenter<SystemSettingsListDTO> {
	protected getActions(item: SystemSettingsListDTO): RowAction[] {
		return [
			new EditAction('system-settings')
		];
	}

	protected getHeader(): ColumnHeader[] {
		i18next.setDefaultNamespace('system_settings');
		return [
			new SystemSettingsHeaderName(),
			new SystemSettingsHeaderAction()
		];
	}

	protected getRowCells(item: SystemSettingsListDTO): TableCell[] {
		return [
			new TextCell(item.type.toString()),
			new ActionCell(this.getActions(item), item.url)
		];
	}
}

class SystemSettingsHeaderName implements ColumnHeader {
	getColumnHeader(): ColumnHeaderDTO {
		return {
			name: getTranslation('SYSTEM_SETTINGS_NAME')
		};
	}
}

class SystemSettingsHeaderAction implements ColumnHeader {
	getColumnHeader(): ColumnHeaderDTO {
		return {
			name: getTranslation('ACTIONS'),
			fixedWidth: 110,
			alignment: Alignment.right
		};
	}
}

function getTranslation(translationKey: string): string {
	return i18next.t(`translationStringList.${translationKey}`);
}
