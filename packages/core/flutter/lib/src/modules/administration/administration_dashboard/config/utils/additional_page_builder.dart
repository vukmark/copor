import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:flutter/widgets.dart';

class AdditionalPageBuilder {
  final String pageKey;
  final Widget Function(String? id) pageBuilder;
  final String Function(CommonTranslation) title;

  AdditionalPageBuilder({required this.pageKey, required this.pageBuilder, required this.title});
}
