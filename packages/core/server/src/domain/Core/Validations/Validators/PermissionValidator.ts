import {Validator} from './Validator';
import {PermissionRepository} from '../PermissionRepository';
import {ForbiddenAccessException} from '../../Exceptions/ForbiddenAccessException';
import {PermissionType} from '../../Permission/PermissionType';
import {InvalidUserIdException} from '../../Exceptions/invalid/InvalidUserIdException';

export abstract class PermissionValidator<TContext = undefined> implements Validator {
	private readonly permissionRepository: PermissionRepository<TContext>;
	private readonly actorId: string;
	private readonly context?: TContext;

	constructor(
		permissionRepository: PermissionRepository<TContext>,
		actorId: string,
		context?: TContext
	) {
		this.permissionRepository = permissionRepository;
		this.actorId = actorId;
		this.context = context;
	}

	public async validate(): Promise<void> {
		if (!this.actorId) {
			throw new InvalidUserIdException();
		}
		const isAllowed = await this.permissionRepository.isAllowed(
			this.actorId,
			this.getPermissionType(),
			this.context
		);

		if (!isAllowed) {
			throw new ForbiddenAccessException();
		}
	}

	public abstract getPermissionType(): PermissionType;
}