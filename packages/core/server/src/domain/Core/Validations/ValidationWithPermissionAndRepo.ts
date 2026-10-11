import {ValidationWithPermission} from './ValidationWithPermission';
import {PermissionRepository} from './PermissionRepository';


export abstract class ValidationWithPermissionAndRepo<InputForValidation, Repository, PermissionRepositoryContext = undefined>
	extends ValidationWithPermission<InputForValidation, PermissionRepositoryContext> {
	protected readonly storageRepo: Repository;

	constructor(
		input: InputForValidation,
		permissionRepository: PermissionRepository<PermissionRepositoryContext>,
		storageRepo: Repository) {
		super(input, permissionRepository);
		this.storageRepo = storageRepo;
	}
}
