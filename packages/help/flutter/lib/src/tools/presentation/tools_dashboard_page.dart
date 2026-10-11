import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/model/dashboard_models.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/widgets/category_layout.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';

class ToolsDashboardPage extends StatelessWidget {
  const ToolsDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final translation = context.watch<TranslationBloc<CommonTranslation>>().state.ensuredData;

    final List<DashboardCategory> dashboardItem = [
      DashboardCategory(
        title: translation.HELP,
        // Add links to your app's external tools here.
        items: [],
      ),
    ];

    return DSPageWrapper(
      isMobile: context.isMobile,
      scrollable: true,
      children: [CategoryLayout(categories: dashboardItem, hasHeader: false)],
    );
  }
}
