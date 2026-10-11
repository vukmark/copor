import 'dart:async';
import 'dart:convert';
import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/utils/typedef.dart';
import '../../model/config/config_model.dart';
import '../../repository_impl/config/config_repository_impl.dart';

class ConfigLocalDataSourceImpl extends BaseLocalDataSource<ConfigModel>
    implements ConfigLocalDataSource {
  final StreamController<ConfigModel> _configController = StreamController<ConfigModel>();

  ConfigLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Stream<ConfigModel> getConfigStream() {
    return _configController.stream;
  }

  @override
  Future<ConfigModel> getConfig() async {
    // On a fresh install nothing has ever been persisted yet — getData()
    // throws CacheNotFoundException in that case. Fall back to the same
    // default getCachedConfig() already uses, so callers (ConfigBloc's
    // _applyHardcodedBaseUrl in particular) always get a usable config
    // instead of the whole getConfig() call failing on first launch.
    ConfigModel model;
    try {
      model = await getData(ConfigModel.namespaceStatic, null);
    } on CacheNotFoundException {
      model = ConfigModel.defaultConfig(version: '');
    }
    _configController.add(model);
    return model;
  }

  @override
  Future<void> setConfig(ConfigModel model) async {
    return await saveData(model, null);
  }

  @override
  ConfigModel? getCachedConfig() {
    final key = keyGenerator.generateKey(ConfigModel.namespaceStatic, null);
    final jsonString = sharedPreferences.getString(key);
    if (jsonString == null) return null;
    try {
      return ConfigModel.fromJson(json.decode(jsonString));
    } catch (_) {
      return null;
    }
  }

  @override
  ConfigModel fromJson(JSON json) {
    return ConfigModel.fromJson(json);
  }

  @override
  JSON toJson(ConfigModel model) {
    return model.toJson();
  }
}
