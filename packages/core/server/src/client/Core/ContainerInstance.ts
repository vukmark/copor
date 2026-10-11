import {Controller} from '../Interface/Controller';
import {AppContext} from '../Interface/AppContext';
import {BaseTableController} from '@copor/core/client/Core/Controller/BaseTableController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {Factory} from '@copor/core/domain/Core/Factories/RunFactory';
import {NextFunction, Response, Request} from 'express';
import {Container} from '../Interface/Container';
import {Presenter, SystemSettingsFormPresenter} from '../Interface/Presenter';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {RepoPicker} from './RepositoryPicker';
import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {PaginatedTableModelDTO, TableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';

export class ContainerInstance implements Container {
	appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	public getRepoPicker<RepoInterface>(
		repoPickerToConstruct: RepositoryPickerConstructor<RepoInterface>,
		fakeRepo: new () => RepoInterface,
		realRepo: Record<string, new () => RepoInterface>
	): RepoInterface {
		return new repoPickerToConstruct(this.appContext, fakeRepo, realRepo);
	}

	public getNewRepoPicker<RepoInterface>(
		repoPickerToConstruct: NewRepositoryPickerConstructor<RepoInterface>
	): RepoInterface {
		const picker = new repoPickerToConstruct(this.appContext);

		return picker.getRepository();
	}

	public getRepository<Repository>(
		repositoryToCreate: RepositoryConstructor<Repository>
	): Repository {
		return new repositoryToCreate(this.appContext);
	}

	public getValidator<Input, PermissionRepository, StorageRepository>(
		validatorToCreate: ValidatorConstructor<Input, PermissionRepository, StorageRepository>,
		input: Input,
		permissionRepository: PermissionRepository,
		storageRepository: StorageRepository
	): Validator {
		return new validatorToCreate(input, permissionRepository, storageRepository);
	}

	public getInteractor<Input, Repository, Output>(
		interactorToCreate: InteractorConstructor<Input, Repository, Output>,
		interactorRepository: Repository,
		input: Input
	): UseCase<Output> {
		return new interactorToCreate(input, interactorRepository);
	}

	public getLogger<Repository, LogDetails, LogData>(
		loggerToCreate: LoggerConstructor<Repository, LogDetails, LogData>,
		loggerRepository: Repository,
		logDetails: LogDetails,
		logData: LogData
	): LogAction {
		return new loggerToCreate(loggerRepository, logDetails, logData);
	}

	public getFactory<Output>(
		factoryMethodToCreate: FactoryConstructor<Output>,
		validator: Validator,
		interactor: UseCase<Output>,
		logger: LogAction
	): Factory<Output> {
		return new factoryMethodToCreate(validator, interactor, logger);
	}

	public getController(
		controllerToCreate: ControllerConstructor,
		container: Container,
		request: Request,
		response: Response,
		next: NextFunction
	): Controller {
		return new controllerToCreate(container, request, response, next);
	}

	public getPresenter<Input, ViewModel>(
		presenterToCreate: PresenterConstructor<Input, ViewModel>,
		input: Input
	): Presenter<ViewModel>;

	public getPresenter<Input, ViewModel>(
		presenterToCreate: new (
			input: Input,
			context: AppContext,
			paginationParams: PaginationParams
		) => PresenterInstance<Input, ViewModel>,
		input: Input,
		context: AppContext,
		paginationParams: PaginationParams
	): Presenter<ViewModel>;

	public getPresenter<Input, ViewModel>(
		presenterToCreate: new (
			input: Input,
			context: AppContext,
			paginationParams?: PaginationParams
		) => PresenterInstance<Input, ViewModel>,
		input: Input,
		context?: AppContext,
		paginationParams?: PaginationParams
	): Presenter<ViewModel> {
		return new presenterToCreate(input, context!, paginationParams);
	}

	public getSystemSettingsPresenter<Input, ViewModel>(
		presenterToCreate: SystemSettingsPresenterConstructor<Input, ViewModel>,
		input: Input,
		context?: AppContext): SystemSettingsFormPresenter<ViewModel> {
		return new presenterToCreate(input, context!);
	}

	public getActorId(): string {
		return this.appContext.authenticationMiddleware!.getActorId();
	}
}

export type NewRepositoryPickerConstructor<Repository> = new (appContext: AppContext) => RepoPicker<Repository>;
export type RepositoryPickerConstructor<Repository> =
	new (
		appContext: AppContext,
		fakeRepository: new () => Repository, realRepositoryList: Record<string, new () => Repository>
	) => Repository;
export type RepositoryConstructor<Repository> = new (context: AppContext) => Repository;
export type ValidatorConstructor<Input, PermissionRepository, StorageRepository> = new (
	input: Input,
	permissionRepo: PermissionRepository,
	storageRepo: StorageRepository
) => Validator;
export type InteractorConstructor<Input, Repository, Output> = new (
	input: Input,
	repo: Repository
) => UseCase<Output>;
export type LoggerConstructor<Repository, LogDetails, LogData> = new (
	loggerRepository: Repository,
	logDetails: LogDetails,
	logData: LogData
) => LogAction;
export type FactoryConstructor<Output> = new (
	validator: Validator,
	interactor: UseCase<Output>,
	logger: LogAction
) => Factory<Output>;
export type ControllerConstructor = new (
	container: Container,
	request: Request,
	response: Response,
	next: NextFunction
) => Controller;

export type TableControllerConstructor = new (
	container: Container,
	request: Request,
	response: Response,
	next: NextFunction
) => BaseTableController;

export type PresenterConstructor<Input, ViewModel> = new (
	input: Input,
	context: AppContext
) => Presenter<ViewModel>;

export type SystemSettingsPresenterConstructor<Input, ViewModel> = new (
	input: Input,
	context: AppContext
) => SystemSettingsFormPresenter<ViewModel>;


export type TablePresenterConstructor<
	Output
> = new (
	input: Output[],
	context: AppContext,
	paginationParams?: PaginationParams
) => PresenterInstance<Output[], TableModelDTO | PaginatedTableModelDTO>;

export type {Container};