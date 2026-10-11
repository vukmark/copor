import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import i18next from 'i18next';

export class RoleTypeDTOHelper {
	public static toNameAndIdDTO(): NameAndIdDTO<RoleType>[] {
		return Object.values(RoleType).map((roleType) => ({
			id: roleType,
			name: i18next.t('translationStringList.' + roleType)
		}));
	}
}