import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCreateFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateCreateFileDTO';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCreateFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateCreateFileRepo';
import {ValidateFileSize} from '@copor/core/domain/Core/Validations/Validators/ValidateFileSize';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {ValidateCanCreateUserGroupFile} from '@copor/cloud/domain/Cloud/validation/validator/ValidateCanCreateUserGroupFile';
import {ValidateCanCreatePublicFile} from '@copor/cloud/domain/Cloud/validation/validator/ValidateCanCreatePublicFile';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';
import {ValidateIsUserInUserGroup} from '@copor/cloud/domain/Cloud/validation/validator/ValidateIsUserInUserGroup';
import {ValidateUserIsVisible} from '@copor/core/domain/User/VisibleUsers/validation/ValidateUserIsVisible';
import {ValidateCanGetShareRecipientList} from '@copor/cloud/domain/Cloud/validation/validator/ValidateCanGetShareRecipientList';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';

export class ValidateCreateFile extends ValidationWithPermissionAndRepo<ValidateCreateFileDTO, ValidateCreateFileRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateFileSize(this.storageRepo, this.input.buffer)
		];

		if (this.input.sharingType == SharingType.PUBLIC) {
			validators.push(new ValidateCanCreatePublicFile(this.permissionRepo, this.input.actorId));

			// Uploading into another user's Public folder: the target must be one
			// the recipient picker (POST /cloud/recipients) could list for the
			// actor. Uploading into your own (userId === actorId) needs only the
			// permission above.
			if (this.input.sharingParticipants.userId !== this.input.actorId) {
				validators.push(new ValidateCanGetShareRecipientList(this.permissionRepo, this.input.actorId));
				validators.push(new ValidateUserIsVisible(this.storageRepo, {
					actorId: this.input.actorId,
					userId: this.input.sharingParticipants.userId,
					permissionType: CloudPermission.canGetShareRecipientList,
					activeOnly: true
				}));
			}
		}

		if (this.input.sharingType == SharingType.USER_GROUP) {
			validators.push(new ValidateCanCreateUserGroupFile(this.permissionRepo, this.input.actorId));
			validators.push(new ValidateUserGroup(this.storageRepo, this.input.sharingParticipants.userGroupId));
			validators.push(new ValidateIsUserInUserGroup(this.storageRepo,
				{
					userId: this.input.actorId,
					userGroupId: this.input.sharingParticipants.userGroupId
				}));
		}

		return validators;
	}
}
