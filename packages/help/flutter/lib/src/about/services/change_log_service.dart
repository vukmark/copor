import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_help/src/about/data/model/change_log_models.dart';

/// The changelog the server's Help module serves (public, so it also works on
/// the app installation page before login): `GET /help/changelog` and
/// `GET /help/changelog/<version | latest>`. Throws on failure, including a
/// version that doesn't exist (404).
class ChangeLogService {
  static const String _path = '/help/changelog';
  static const String _latest = 'latest';

  static Dio get _dio => getIt<Dio>();

  /// Every version with its date, newest first.
  static Future<List<ChangeLogVersionInfo>> getChangeLogList() async {
    final response = await _dio.get<List<dynamic>>(_path);
    return (response.data ?? const [])
        .map((item) => ChangeLogVersionInfo.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  static Future<ParsedChangeLog> loadChangeLog(String version) async {
    final response = await _dio.get<Map<String, dynamic>>('$_path/${Uri.encodeComponent(version)}');
    final json = response.data!;
    final releases = (json['releases'] as List<dynamic>? ?? const [])
        .map((item) => item as Map<String, dynamic>)
        .map((item) {
          final platform = item['platform'] as String;
          return ReleaseAsset(platform: platform, icon: _platformIcon(platform), url: item['url'] as String);
        })
        .toList();

    return ParsedChangeLog(markdownContent: json['content'] as String? ?? '', releases: releases);
  }

  static Future<ParsedChangeLog> loadLatestChangeLog() => loadChangeLog(_latest);

  static IconData _platformIcon(String platform) => switch (platform) {
    'IOS' => PhosphorIconsFill.appleLogo,
    'ANDROID' => PhosphorIconsFill.androidLogo,
    _ => PhosphorIconsThin.download,
  };
}
