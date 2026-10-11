import 'dart:convert';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:shared_preferences/shared_preferences.dart';

abstract class BaseLocalDataSource<T extends BaseModel> {
  final SharedPreferences sharedPreferences;
  final KeyGenerator keyGenerator;

  BaseLocalDataSource({required this.sharedPreferences, required this.keyGenerator});

  String _generateKey(String namespace, String? language) {
    return keyGenerator.generateKey(namespace, language);
  }

  T fromJson(JSON json);
  JSON toJson(T model);

  Future<T> getData(String namespace, String? languageCode) async {
    final key = _generateKey(namespace, languageCode);
    final jsonString = sharedPreferences.getString(key);

    if (jsonString == null) {
      throw CacheNotFoundException(namespace, languageCode);
    }

    final jsonMap;
    try {
      jsonMap = json.decode(jsonString);
    } on FormatException catch (e) {
      throw CacheException(
        namespace: namespace,
        identifier: languageCode,
        message:
            "Failed to decode json for namespace '$namespace' and identifier '$languageCode'. ${e.message}",
      );
    }
    return fromJson(jsonMap);
  }

  Future<void> saveData(T model, String? languageCode) async {
    final key = _generateKey(model.namespace, languageCode);
    final jsonString = json.encode(toJson(model));
    try {
      await sharedPreferences.setString(key, jsonString);
    } catch (error) {
      throw CacheSaveException(model.namespace, languageCode);
    }
  }

  Future<void> removeData(String namespace, String? language) async {
    final key = _generateKey(namespace, language);
    try {
      await sharedPreferences.remove(key);
    } catch (error) {
      throw CacheRemoveException(namespace, language, cause: error.toString());
    }
  }
}

class CacheException implements Exception {
  final String message;
  final String namespace;
  final String? identifier;

  CacheException({required this.message, required this.namespace, this.identifier});

  @override
  String toString() {
    return 'CacheException: $message';
  }
}

abstract class BaseListLocalDataSource<T extends BaseModel> {
  final SharedPreferences sharedPreferences;
  final KeyGenerator keyGenerator;

  BaseListLocalDataSource({required this.sharedPreferences, required this.keyGenerator});

  String _generateKey(String namespace, String? language) {
    return keyGenerator.generateKey(namespace, language);
  }

  T fromJsonSingle(JSON json);

  JSON toJsonSingle(T model);

  Future<List<T>> getData(String namespace, String? languageCode) async {
    final key = _generateKey(namespace, languageCode);
    final jsonString = sharedPreferences.getString(key);

    if (jsonString == null) {
      throw CacheNotFoundException(namespace, languageCode);
    }

    try {
      final jsonList = json.decode(jsonString) as List<dynamic>;

      return jsonList.map((item) => fromJsonSingle(item as Map<String, dynamic>)).toList();
    } on FormatException catch (e) {
      throw CacheException(
        namespace: namespace,
        identifier: languageCode,
        message: "JSON decode error for '$namespace' ($languageCode): ${e.message}",
      );
    } on TypeError catch (e) {
      throw CacheException(
        namespace: namespace,
        identifier: languageCode,
        message: "Type conversion error: ${e.toString()}",
      );
    }
  }

  Future<void> saveData(List<T> modelList, String? languageCode) async {
    if (modelList.isEmpty) return;

    final key = _generateKey(modelList.first.namespace, languageCode);

    final jsonList = modelList.map((model) => toJsonSingle(model)).toList();

    try {
      await sharedPreferences.setString(key, json.encode(jsonList));
    } catch (error) {
      throw CacheSaveException(modelList.first.namespace, languageCode);
    }
  }

  Future<void> clearLocalData(String namespace, String? languageCode) async {
    final key = _generateKey(namespace, languageCode);
    await sharedPreferences.remove(key);
  }

  Future<void> removeData(String namespace, String? language) async {
    final key = _generateKey(namespace, language);
    try {
      await sharedPreferences.remove(key);
    } catch (error) {
      throw CacheRemoveException(namespace, language, cause: error.toString());
    }
  }
}

class CacheNotFoundException extends CacheException {
  CacheNotFoundException(String namespace, String? identifier)
    : super(
        message: "No data found for namespace '$namespace' and identifier '$identifier'",
        namespace: namespace,
        identifier: identifier,
      );
}

class CacheSaveException extends CacheException {
  CacheSaveException(String namespace, String? identifier, {String? cause})
    : super(
        message:
            "Could not save data for namespace '$namespace' and identifier '$identifier' ${cause != null ? 'Cause: $cause' : ''}",
        namespace: namespace,
        identifier: identifier,
      );
}

class CacheRemoveException extends CacheException {
  CacheRemoveException(String namespace, String? identifier, {String? cause})
    : super(
        message:
            "Could not remove data for namespace '$namespace' and identifier '$identifier' ${cause != null ? 'Cause: $cause' : ''}",
        namespace: namespace,
        identifier: identifier,
      );
}
