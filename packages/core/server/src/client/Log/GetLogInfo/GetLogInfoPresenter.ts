import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {InfoPresenter} from '@copor/core/client/Core/Info/InfoPresenter';
import {InfoField} from '@copor/core/client/Core/Info/InfoField';
import {LogIdField} from '@copor/core/client/Core/Info/text_inputs/LogIdField';
import {ActorField} from '@copor/core/client/Core/Info/text_inputs/ActorField';
import {ActionTypeField} from '@copor/core/client/Core/Info/text_inputs/ActionTypeField';
import {TimeField} from '@copor/core/client/Core/Info/text_inputs/TimeField';
import {DateTimeFormat} from '@copor/core/domain/Core/Date/DateTimeFormat';
import i18next from 'i18next';
import {KeyValueField} from '@copor/core/client/Core/Info/text_inputs/KeyValueField';

export class GetLogInfoPresenter
	extends InfoPresenter<GetLogDTO> {
	protected getInfoFields(): InfoField[] {
		i18next.setDefaultNamespace('log_type');

		const createdAt = new DateTimeFormat(
			this.input.createdAt,
			i18next.language
		).format();

		return [
			new LogIdField(this.input.id),
			new ActorField(this.input.actorId ?? '-'),
			new ActionTypeField(i18next.t('translationStringList.' + this.input.logType)),
			new TimeField(createdAt)
		];
	}

	protected getLogDataFields(): InfoField[] {
		return Object.entries(this.input.logData ?? {}).map(([key, value]) => new KeyValueField(key, value));
	}
}