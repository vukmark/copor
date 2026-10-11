import 'package:copor_core/src/utils/constants.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/model/dashboard_models.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/widgets/category_layout.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HelpDashboardPage extends StatelessWidget {
  const HelpDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final translation = context.watch<TranslationBloc<CommonTranslation>>().state.ensuredData;

    final List<DashboardCategory> dashboardItem = [
      DashboardCategory(
        title: translation.HELP,
        items: [
          DashboardItem(
            icon: PhosphorIconsThin.bookOpen,
            title: translation.DOCU,
            route: AppLinks.documentation,
            isExternalLink: true,
          ),
          DashboardItem(
            icon: PhosphorIconsThin.envelope,
            title: translation.CONTACT,
            route: AppLinks.contact,
            isExternalLink: true,
          ),
          DashboardItem(
            icon: PhosphorIconsThin.userGear,
            title: translation.ACCOUNT_DELETION_INFO,
            route: AppLinks.accountDeletion,
            isExternalLink: true,
          ),
        ],
      ),
    ];

    return DSPageWrapper(
      isMobile: context.isMobile,
      scrollable: true,
      children: [CategoryLayout(categories: dashboardItem, hasHeader: false)],
    );
  }
}
