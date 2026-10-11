import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/administration/role/data/model/role_model.dart';
import 'package:copor_core/src/utils/typedef.dart';

import '../repository/role_repository.dart';

class RoleLocalDataSourceImpl extends BaseListLocalDataSource<RoleModel>
    implements RoleLocalDataSource {
  RoleLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<RoleModel>> getRoleList() async {
    return await getData(RoleModel.namespaceStatic, null);
  }

  @override
  Future<void> setRoleList(List<RoleModel> roleListModel) async {
    return await saveData(roleListModel, null);
  }

  @override
  RoleModel fromJsonSingle(JSON json) {
    return RoleModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(RoleModel model) {
    return model.toJson();
  }
}
