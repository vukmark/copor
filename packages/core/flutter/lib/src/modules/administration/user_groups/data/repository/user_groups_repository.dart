import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_users_request.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_users_response.dart';

abstract class UserGroupsRepository {
  Future<Either<Failure, Result<List<UserGroupModel>>>> getUserGroupTree();

  Future<Either<Failure, Result<void>>> deleteUserGroup(String userGroupId);

  Future<Either<Failure, Result<UserGroupUsersResponse>>> getUserGroupUsers(
    UserGroupUsersRequest request,
  );
}

abstract class UserGroupsRemoteDataSource {
  Future<List<UserGroupModel>> getUserGroupTree();

  Future<void> deleteUserGroup(String userGroupId);

  Future<UserGroupUsersResponse> getUserGroupUsers(UserGroupUsersRequest request);
}
