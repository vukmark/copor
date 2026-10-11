import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/user/data/model/user_model.dart';
import 'package:copor_core/src/modules/administration/user/data/model/create_user_dto.dart';
import 'package:copor_core/src/modules/administration/user/data/repository/user_repository.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class UserRepositoryImpl extends BaseRepository implements UserRepository {
  final UserRemoteDataSource remoteDataSource;
  final UserLocalDataSource localDataSource;

  UserRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<UserModel>>>> getUserSearchList(
    FilterListDTO filterList,
  ) async {
    return performOperationAndMapToResult<List<UserModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<UserModel>>(() async {
          final response = await remoteDataSource.getUserSearchList(filterList);
          await localDataSource.setUserList(response.items);
          return response.items;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<UserModel>>>> getUserList(FilterListDTO filterList) async {
    return performOperationAndMapToResult<List<UserModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<UserModel>>(() async {
          final localUserList = await localDataSource.getUserList();
          return localUserList;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<List<UserModel>>(() async {
          final tableModel = await remoteDataSource.getUserList(filterList);
          final userList = _extractUsersFromTableModel(tableModel);
          await localDataSource.setUserList(userList);
          return userList;
        });
      },
    );
  }

  List<UserModel> _extractUsersFromTableModel(CoporTableModel tableModel) {
    final List<UserModel> users = [];
    int userIndex = 0;

    for (final row in tableModel.body) {
      try {
        if (row.isEmpty) continue;

        String firstName = '';
        String lastName = '';
        String role = '';
        String userId = '';

        if (row.isNotEmpty && row[0].content.text != null) {
          firstName = row[0].content.text!;
        }
        if (row.length > 1 && row[1].content.text != null) {
          lastName = row[1].content.text!;
        }
        if (row.length > 3 && row[3].content.text != null) {
          role = row[3].content.text!;
        }
        if (row.length > 4 &&
            row[4].content.actionList != null &&
            row[4].content.actionList!.isNotEmpty) {
          final routerPath = row[4].content.actionList![0].routerPath;
          final parts = routerPath.split('/');
          if (parts.length > 2) {
            userId = parts.last;
          }
        }

        if (userId.isEmpty) {
          userId = '${firstName.replaceAll(' ', '')}_${lastName.replaceAll(' ', '')}_$userIndex';
          userIndex++;
        }

        if (firstName.isNotEmpty) {
          users.add(
            UserModel(
              id: userId,
              firstName: firstName,
              lastName: lastName,
              picturePath: '',
              role: role,
              isDefaultRole: true,
              isActive: true,
            ),
          );
        }
      } catch (_) {
        continue;
      }
    }

    return users;
  }

  @override
  Future<Either<Failure, Result<UserModel>>> getUser(String userId) async {
    return performOperationAndMapToResult<UserModel>(
      remoteOperation: () async {
        return performNetworkOperation<UserModel>(() async {
          final user = await remoteDataSource.getUser(userId);
          return user;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteUser(String userId) {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteUser(userId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> createUser(CreateUserDTO userToCreate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.createUser(userToCreate);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> updateUser(UserModel userToUpdate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateUser(userToUpdate);
        });
      },
    );
  }
}
