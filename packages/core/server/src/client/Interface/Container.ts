import {NextFunction, Response, Request} from 'express';
import {AppContext} from './AppContext';
import {
	ControllerConstructor,
	FactoryConstructor,
	InteractorConstructor,
	LoggerConstructor, NewRepositoryPickerConstructor, PresenterConstructor, RepositoryConstructor,
	RepositoryPickerConstructor, SystemSettingsPresenterConstructor,
	ValidatorConstructor
} from '../Core/ContainerInstance';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {Factory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Controller} from './Controller';
import {Presenter, SystemSettingsFormPresenter} from './Presenter';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';

export interface Container {
	appContext: AppContext;

	getRepoPicker<RepoInterface>(
		repoPickerToConstruct: RepositoryPickerConstructor<RepoInterface>,
		fakeRepo: new () => RepoInterface,
		realRepo: Record<string, new () => RepoInterface>
	): RepoInterface

	getNewRepoPicker<RepoInterface>(
		repoPickerToConstruct: NewRepositoryPickerConstructor<RepoInterface>,
	): RepoInterface;

	getRepository<Repository>(
		repositoryToCreate: RepositoryConstructor<Repository>,
	): Repository;

	getValidator<Input, PermissionRepository, StorageRepository>(
		validatorToCreate: ValidatorConstructor<Input, PermissionRepository, StorageRepository>,
		input: Input,
		permissionRepository: PermissionRepository,
		storageRepository: StorageRepository
	): Validator;

	getInteractor<Input, Repository, Output>(
		interactorToCreate: InteractorConstructor<Input, Repository, Output>,
		interactorRepository: Repository,
		input: Input
	): UseCase<Output>;

	getLogger<Repository, LogDetails, LogData>(
		loggerToCreate: LoggerConstructor<Repository, LogDetails, LogData>,
		loggerRepository: Repository,
		logDetails: LogDetails,
		logData: LogData
	): LogAction;

	getFactory<Output>(
		factoryMethodToCreate: FactoryConstructor<Output>,
		validator: Validator | undefined,
		interactor: UseCase<Output>,
		logger: LogAction
	): Factory<Output>;

	getController(
		controllerToCreate: ControllerConstructor,
		container: Container,
		request: Request,
		response: Response,
		next: NextFunction
	): Controller;

	getPresenter<Input, ViewModel>(
		presenterToCreate: PresenterConstructor<Input, ViewModel>,
		input: Input,
	): Presenter<ViewModel>;

	getPresenter<Input, ViewModel>(
		presenterToCreate: new (input: Input, context: AppContext) => PresenterInstance<Input, ViewModel>,
		input: Input,
		context: AppContext
	): Presenter<ViewModel>;

	getPresenter<Input, ViewModel>(
		presenterToCreate: new (input: Input, appContext: AppContext, paginationParams?: PaginationParams)
		=> PresenterInstance<Input, ViewModel>,
		input: Input,
		appContext: AppContext,
		paginationParams: PaginationParams
	): Presenter<ViewModel>;

	getPresenter<Input, ViewModel>(
		presenterToCreate: new (input: Input, appContext: AppContext, paginationParams: PaginationParams)
		=> PresenterInstance<Input, ViewModel>,
		input: Input,
		appContext: AppContext,
		paginationParams: PaginationParams
	): Presenter<ViewModel>;

	getSystemSettingsPresenter<Input, ViewModel>(
		presenterToCreate: SystemSettingsPresenterConstructor<Input, ViewModel>,
		input: Input,
	): SystemSettingsFormPresenter<ViewModel>;

	getActorId(): string;
}
