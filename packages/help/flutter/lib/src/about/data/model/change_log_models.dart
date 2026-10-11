import 'package:flutter/material.dart';

class ReleaseAsset {
  final String platform;
  final IconData icon;
  final String url;

  const ReleaseAsset({required this.platform, required this.icon, required this.url});
}

class ParsedChangeLog {
  final String markdownContent;
  final List<ReleaseAsset> releases;

  const ParsedChangeLog({required this.markdownContent, required this.releases});
}

class ChangeLogVersionInfo {
  final String version;
  final String? publishDate;

  const ChangeLogVersionInfo({required this.version, this.publishDate});

  factory ChangeLogVersionInfo.fromJson(Map<String, dynamic> json) =>
      ChangeLogVersionInfo(version: json['version'] as String, publishDate: json['publishDate'] as String?);
}
