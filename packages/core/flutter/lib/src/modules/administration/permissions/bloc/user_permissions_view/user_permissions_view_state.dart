import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';

sealed class UserPermissionsViewState {
  const UserPermissionsViewState();
}

class UserPermissionsViewInitial extends UserPermissionsViewState {
  const UserPermissionsViewInitial();
}

class UserPermissionsViewLoading extends UserPermissionsViewState {
  const UserPermissionsViewLoading();
}

class UserPermissionsViewLoaded extends UserPermissionsViewState {
  final List<RoleFeaturePermissionsModel> featurePermissions;

  const UserPermissionsViewLoaded(this.featurePermissions);
}

class UserPermissionsViewError extends UserPermissionsViewState {
  final Failure failure;

  const UserPermissionsViewError(this.failure);
}
