import 'dart:async';
import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/data/model/authorization/authorization_tokens_model.dart';
import 'package:copor_core/src/data/repository_impl/authorization/authorization_repository_impl.dart';
import 'package:copor_core/src/utils/typedef.dart';

class AuthorizationLocalDataSourceImpl extends BaseLocalDataSource<AuthorizationTokensModel>
    implements AuthorizationLocalDataSource {
  final StreamController<AuthorizationTokensModel> _configController =
      StreamController<AuthorizationTokensModel>();

  AuthorizationLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  AuthorizationTokensModel fromJson(JSON json) {
    return AuthorizationTokensModel.fromJson(json);
  }

  @override
  JSON toJson(AuthorizationTokensModel model) {
    return model.toJson();
  }

  @override
  Stream<AuthorizationTokensModel> getTokensStream() {
    return _configController.stream;
  }

  @override
  Future<void> clearData() async {
    await removeData(AuthorizationTokensModel.namespaceStatic, null);
  }

  @override
  Future<void> stashTokens(AuthorizationTokensModel authorizationTokensModel) async {
    return await saveData(authorizationTokensModel, null);
  }

  @override
  Future<AuthorizationTokensModel> getTokens() async {
    return await getData(AuthorizationTokensModel.namespaceStatic, null);
  }
}
