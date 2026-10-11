import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class SearchScaffold implements DSPageDrawer, DSAppBarTitle {
  const SearchScaffold();

  @override
  Widget getTitle() => ScaffoldTitlePill(icon: (_) => DTIcons.search, label: (t) => t.SEARCH);
}
