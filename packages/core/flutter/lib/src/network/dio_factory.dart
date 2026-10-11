import 'dart:async';

import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_core/src/data/repository_impl/config/config_repository_impl.dart';
import 'package:copor_core/src/network/dio_web_configuration.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

const String applicationJson = "application/json";
const String accept = "accept";
const int apiTimeOut = 60000;

class DioFactory {
  static final DioFactory _instance = DioFactory._internal();

  factory DioFactory() => _instance;

  DioFactory._internal();

  final Dio _dio = Dio();
  late StreamSubscription _configSubscription;

  Future<void> initialize(ConfigLocalDataSource configLocalDataSource) async {
    configureDioForWeb(_dio);
    final config = await configLocalDataSource.getConfig();
    _updateDio(config);

    _configSubscription = configLocalDataSource.getConfigStream().listen((newConfig) {
      _updateDio(newConfig);
    });
  }

  void _updateDio(ConfigModel config) {
    _dio.options = BaseOptions(
      baseUrl: config.baseUrl,
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-version': config.version,
        'Accept-Language': config.language.code,
      },
      receiveTimeout: const Duration(milliseconds: 150000),
      sendTimeout: kIsWeb ? null : const Duration(milliseconds: 150000),
      connectTimeout: const Duration(milliseconds: 150000),
    );
  }

  Dio get dio => _dio;

  void dispose() {
    _configSubscription.cancel();
  }
}
