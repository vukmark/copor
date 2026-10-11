import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_core/src/modules/my_account/data/repository/account_info_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class AccountInfoLocalDataSourceImpl extends BaseLocalDataSource<AccountInfoModel>
    implements AccountInfoLocalDataSource {
  AccountInfoLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<AccountInfoModel> getAccountInfo() async {
    return await getData(AccountInfoModel.namespaceStatic, null);
  }

  @override
  Future<void> setAccountInfo(AccountInfoModel accountInfoModel) async {
    return await saveData(accountInfoModel, null);
  }

  @override
  Future<void> clearAccountInfo() async {
    return await removeData(AccountInfoModel.namespaceStatic, null);
  }

  @override
  AccountInfoModel fromJson(Map<String, dynamic> json) {
    return AccountInfoModel.fromJson(json);
  }

  @override
  JSON toJson(AccountInfoModel model) {
    return model.toJson();
  }
}
