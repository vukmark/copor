import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_back_button.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/administration_namespaces.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class AdministrationScaffold implements DSPageDrawer, DSAppBarTitle, DSAppBarLeading {
  final GoRouterState state;

  const AdministrationScaffold(this.state);

  String get _fullPath => state.fullPath ?? '';

  String get _namespace {
    final segments = state.uri.pathSegments;
    final adminIndex = segments.indexOf('administration');
    if (adminIndex != -1 && adminIndex + 1 < segments.length) {
      return segments[adminIndex + 1];
    }
    return '';
  }

  bool get _isEdit => _fullPath.contains('/edit');

  bool get _isCreate => _fullPath.contains('/create');

  bool get _isInfo => _fullPath.contains('/info');

  bool get _isFormPage => _isEdit || _isCreate;

  @override
  Widget getLeading() {
    if (_isFormPage) {
      return AppBarBackButton(
        onPressed: () => goToPage(AdministrationNamespaces.getRoute(_namespace)),
      );
    }

    return BlocBuilder<TranslationBloc<CommonTranslation>, TranslationState<CommonTranslation>>(
      builder: (ctx, translationState) {
        if (translationState.result == null) {
          return const SizedBox.shrink();
        }

        return DTButton.floating(
          icon: PhosphorIconsThin.caretLeft,
          label: '',
          semanticLabel: ctx.getState.commonTranslation.result?.data.BACK ?? '',
          border: !ctx.isMobile,
          onPressed: () {
            if (_isInfo && ctx.isMobile) {
              goToPage(AdministrationNamespaces.getRoute(_namespace));
              return;
            }
            goToPage(AppRoutes.administrationDashboard);
          },
        );
      },
    );
  }

  @override
  Widget getTitle() => ScaffoldTitlePill(
    icon: (_) => _getIcon(),
    label: (t) => AdministrationNamespaces.getTranslatedTitle(_namespace)(t),
  );

  IconData _getIcon() {
    return switch (_namespace) {
      AdministrationNamespaces.deletionRequests => PhosphorIconsThin.trash,
      AdministrationNamespaces.role => PhosphorIconsThin.shieldCheck,
      AdministrationNamespaces.user => PhosphorIconsThin.user,
      AdministrationNamespaces.userGroups => PhosphorIconsThin.users,
      AdministrationNamespaces.contractType => PhosphorIconsThin.fileText,
      AdministrationNamespaces.level => PhosphorIconsThin.stairs,
      AdministrationNamespaces.tag => PhosphorIconsThin.tag,
      AdministrationNamespaces.log => PhosphorIconsThin.clockCounterClockwise,
      AdministrationNamespaces.region => PhosphorIconsThin.mapTrifold,
      AdministrationNamespaces.regionCity => PhosphorIconsThin.city,
      AdministrationNamespaces.language => PhosphorIconsThin.globe,
      AdministrationNamespaces.tenant => PhosphorIconsThin.bank,
      AdministrationNamespaces.featureFlags => PhosphorIconsThin.toggleRight,
      AdministrationNamespaces.permissions => PhosphorIconsThin.lockKey,
      AdministrationNamespaces.systemSettings => PhosphorIconsThin.gear,
      AdministrationNamespaces.contentItem => PhosphorIconsThin.book,
      AdministrationNamespaces.aiContextItem => PhosphorIconsThin.book,
      AdministrationNamespaces.state => PhosphorIconsThin.mapTrifold,
      AdministrationNamespaces.nativeLanguage => PhosphorIconsThin.globe,
      _ => PhosphorIconsThin.bank,
    };
  }
}

extension AdministrationScaffoldResolver on ScaffoldUpdater {
  Object? resolveAdminScaffold(GoRouterState state, String path) {
    if (path.startsWith('/administration') && path != AppRoutes.administrationDashboard) {
      return AdministrationScaffold(state);
    }
    return null;
  }
}
