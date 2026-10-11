import {Presenter} from '../../Interface/Presenter';
import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';
import {SimpleDateTime} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDateTime';
import {SimpleTime} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleTime';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
export abstract class PresenterInstance<Input, ViewModel>
	extends TimeTransformer
	implements Presenter<ViewModel> {
	protected readonly input: Input;
	protected readonly context: AppContext;

	constructor(input: Input, context: AppContext) {
		super();
		this.input = input;
		this.context = context;
	}

	protected get appContext(): AppContext {
		return this.context;
	}

	private presentSimpleTime(key: unknown) {
		const simpleTime = key as SimpleTime;

		return {
			hours: simpleTime.getHours(),
			minutes: simpleTime.getMinutes(),
			seconds: simpleTime.getSeconds()
		};
	}
	private presentSimpleDate(key: unknown) {
		const simpleDate = key as SimpleDate;

		return {
			day: simpleDate.getDay(),
			month: simpleDate.getMonth(),
			year: simpleDate.getYear()
		};
	}
	private presentSimpleDateTime(key: unknown) {
		const simpleDateTime = key as SimpleDateTime;
		const date = this.presentSimpleDate(simpleDateTime.getDate());
		const time = this.presentSimpleTime(simpleDateTime.getTime());

		return {
			date,
			time
		};
	}
	public abstract present(): ViewModel;
}