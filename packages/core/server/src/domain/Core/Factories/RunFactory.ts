import {Validator} from '../Validations/Validators/Validator';
import {LogAction} from '../Logger/LogAction';
import {UseCase} from '../Interactors/UseCase';
import {ErrorList} from '../Exceptions/ErrorList';

export interface Factory<Response> {
	run(options?: {skipValidation?: boolean}): Promise<Response | ErrorList>
}
export class RunFactory<Response> implements Factory<Response> {
	private validator: Validator;
	private creator: UseCase<Response>;
	private logger: LogAction;

	constructor(validator: Validator, creator: UseCase<Response>, logger: LogAction) {
		this.validator = validator;
		this.creator = creator;
		this.logger = logger;
	}

	public async run(options?: {skipValidation?: boolean}): Promise<Response | ErrorList> {
		if (!options?.skipValidation) {
			const errorList = await this.validator.validate();

			if (errorList)
				return errorList;
		}
		return this.creator.execute().then((response) => {
			void this.logger.log();
			return response;
		});
	}
}

