import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import i18next from 'i18next';

export class PublishStatusHelper {
	public static toNameAndIdDTO(): NameAndIdDTO<PublishStatus>[] {
		return Object.values(PublishStatus).map((status) => ({
			id: status,
			name: i18next.t('translationStringList.' + status)
		}));
	}
}