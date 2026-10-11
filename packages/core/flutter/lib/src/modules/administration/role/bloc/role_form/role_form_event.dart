import 'package:copor_core/src/modules/administration/role/data/model/create_role_dto.dart';
import 'package:equatable/equatable.dart';

sealed class RoleFormEvent extends Equatable {
  const RoleFormEvent();

  @override
  List<Object?> get props => [];
}

class GetRole extends RoleFormEvent {
  final String roleId;
  const GetRole(this.roleId);
}

class CreateRole extends RoleFormEvent {
  final CreateRoleDTO roleToCreate;
  const CreateRole(this.roleToCreate);
}

class UpdateRole extends RoleFormEvent {
  final CreateRoleDTO roleToUpdate;
  const UpdateRole(this.roleToUpdate);
}

class RegisterValidationAndSubmitCallback extends RoleFormEvent {
  final void Function() onValidateAndSubmit;
  const RegisterValidationAndSubmitCallback(this.onValidateAndSubmit);
}

class SaveButtonPressed extends RoleFormEvent {}
