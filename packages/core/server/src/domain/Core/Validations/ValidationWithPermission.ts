import {Validation} from './Validation';
import {PermissionRepository} from './PermissionRepository';

export abstract class ValidationWithPermission<InputForValidation, PermissionRepositoryContext = undefined>
	extends Validation<InputForValidation> {
	protected readonly permissionRepo: PermissionRepository<PermissionRepositoryContext>;

	constructor(input: InputForValidation,
		permissionRepo: PermissionRepository<PermissionRepositoryContext>
	) {
		super(input);
		this.permissionRepo = permissionRepo;
	}
}