import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/administration/user/data/model/user_model.dart';
import 'package:copor_core/src/modules/administration/user/data/repository/user_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class UserLocalDataSourceImpl extends BaseListLocalDataSource<UserModel>
    implements UserLocalDataSource {
  UserLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<UserModel>> getUserList() async {
    return await getData(UserModel.namespaceStatic, null);
  }

  @override
  Future<List<UserModel>> getUserSearchList() async {
    return await getData(UserModel.namespaceStatic, null);
  }

  @override
  Future<void> setUserList(List<UserModel> userModel) async {
    return await saveData(userModel, null);
  }

  @override
  UserModel fromJsonSingle(Map<String, dynamic> json) {
    return UserModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(UserModel model) {
    return model.toJson();
  }
}
