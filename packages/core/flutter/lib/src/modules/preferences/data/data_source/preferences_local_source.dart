import 'dart:async';
import 'dart:convert';
import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';
import 'package:copor_core/src/modules/preferences/data/repository/preference_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class PreferencesLocalDataSourceImpl extends BaseLocalDataSource<PreferencesModel>
    implements PreferencesLocalDataSource {
  PreferencesLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<PreferencesModel> getPreferences() async {
    return await getData(PreferencesModel.namespaceStatic, null);
  }

  @override
  PreferencesModel? getCachedPreferences() {
    final key = keyGenerator.generateKey(PreferencesModel.namespaceStatic, null);
    final jsonString = sharedPreferences.getString(key);
    if (jsonString == null) return null;
    try {
      return PreferencesModel.fromJson(json.decode(jsonString));
    } catch (_) {
      return null;
    }
  }

  @override
  Future<void> setPreferences(PreferencesModel preferencesModel) async {
    return await saveData(preferencesModel, null);
  }

  @override
  PreferencesModel fromJson(JSON json) {
    return PreferencesModel.fromJson(json);
  }

  @override
  JSON toJson(PreferencesModel model) {
    return model.toJson();
  }
}
