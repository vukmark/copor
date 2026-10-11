import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class NewsScaffold implements DSPageDrawer, DSAppBarTitle {
  const NewsScaffold();

  @override
  Widget getTitle() =>
      ScaffoldTitlePill(icon: (_) => PhosphorIconsThin.newspaper, label: (t) => t.NEWS);
}
