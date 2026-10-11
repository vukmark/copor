import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class HelpDashboardScaffold implements DSPageDrawer, DSAppBarTitle {
  const HelpDashboardScaffold();

  @override
  Widget getTitle() =>
      ScaffoldTitlePill(icon: (_) => PhosphorIconsThin.bank, label: (t) => t.HELP);
}
