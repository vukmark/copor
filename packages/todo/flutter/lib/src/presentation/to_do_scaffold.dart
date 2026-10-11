import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TodoScaffold implements DSPageDrawer, DSAppBarTitle {
  TodoScaffold(GoRouterState _);

  @override
  Widget getTitle() =>
      ScaffoldTitlePill(icon: (_) => PhosphorIconsThin.listChecks, label: (t) => t.TODO);
}
