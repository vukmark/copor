import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_users_request.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_users_response.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/repository/user_groups_repository.dart';

class UserGroupsRepositoryImpl extends BaseRepository implements UserGroupsRepository {
  final UserGroupsRemoteDataSource remoteDataSource;

  UserGroupsRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<UserGroupModel>>>> getUserGroupTree() async {
    return performOperationAndMapToResult<List<UserGroupModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<UserGroupModel>>(() async {
          return await remoteDataSource.getUserGroupTree();
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteUserGroup(String userGroupId) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          return await remoteDataSource.deleteUserGroup(userGroupId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<UserGroupUsersResponse>>> getUserGroupUsers(
    UserGroupUsersRequest request,
  ) async {
    return performOperationAndMapToResult<UserGroupUsersResponse>(
      remoteOperation: () async {
        return performNetworkOperation<UserGroupUsersResponse>(() async {
          return await remoteDataSource.getUserGroupUsers(request);
        });
      },
    );
  }
}
