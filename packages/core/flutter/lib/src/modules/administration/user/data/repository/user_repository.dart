import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/user/data/model/create_user_dto.dart';
import 'package:copor_core/src/modules/administration/user/data/model/user_search_list_response.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import '../../../../../bloc/utils/bloc_state.dart';
import '../model/user_model.dart';

abstract class UserRepository {
  Future<Either<Failure, Result<List<UserModel>>>> getUserList(FilterListDTO filterList);
  Future<Either<Failure, Result<void>>> deleteUser(String userId);
  Future<Either<Failure, Result<UserModel>>> getUser(String userId);
  Future<Either<Failure, Result<void>>> createUser(CreateUserDTO userToCreate);
  Future<Either<Failure, Result<void>>> updateUser(UserModel userToUpdate);
  Future<Either<Failure, Result<List<UserModel>>>> getUserSearchList(FilterListDTO filterList);
}

abstract class UserLocalDataSource {
  Future<List<UserModel>> getUserList();
  Future<void> setUserList(List<UserModel> todoList);
  Future<List<UserModel>> getUserSearchList();
}

abstract class UserRemoteDataSource {
  Future<CoporTableModel> getUserList(FilterListDTO filterList);
  Future<UserSearchListResponse> getUserSearchList(FilterListDTO filterList);
  Future<UserModel> getUser(String userId);
  Future<void> deleteUser(String userId);
  Future<void> createUser(CreateUserDTO userToCreate);
  Future<void> updateUser(UserModel userToUpdate);
}
