import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class ToolsDashboardScaffold implements DSPageDrawer, DSAppBarTitle {
  const ToolsDashboardScaffold();

  @override
  Widget getTitle() =>
      ScaffoldTitlePill(icon: (_) => PhosphorIconsThin.wrench, label: (t) => t.TOOLS);
}
