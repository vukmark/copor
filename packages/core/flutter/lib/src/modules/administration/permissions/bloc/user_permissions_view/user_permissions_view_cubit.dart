import 'package:copor_core/src/modules/administration/permissions/data/repository/permissions_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'user_permissions_view_state.dart';

class UserPermissionsViewCubit extends Cubit<UserPermissionsViewState> {
  final PermissionsRepository permissionsRepository;

  UserPermissionsViewCubit({required this.permissionsRepository})
    : super(const UserPermissionsViewInitial());

  Future<void> load(String userId) async {
    emit(const UserPermissionsViewLoading());

    final result = await permissionsRepository.getUserPermissions(userId);

    result.fold(
      (failure) => emit(UserPermissionsViewError(failure)),
      (success) => emit(UserPermissionsViewLoaded(success.data)),
    );
  }
}
