import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_contacts/src/config/contact_routes.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_back_button.dart';
import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class ContactAppBarConstants {
  static const String backButtonKey = 'back_button_contact_details_screen';
}

class ContactsScaffold implements DSPageDrawer, DSAppBarLeading, DSAppBarTitle {
  final GoRouterState _currentRoute;

  ContactsScaffold(this._currentRoute);

  @override
  Widget getLeading() => Builder(
    builder: (context) {
      final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;

      if (BlocStateConditions.hasInitialStates([translationState])) {
        return const SizedBox.shrink();
      }

      final bool isDetails = _currentRoute.fullPath == ContactRoutes.contactDetails;

      if (context.isMobile && isDetails) {
        return AppBarBackButton(onPressed: () => goToPage(ContactRoutes.contacts));
      }

      return Builder(
        builder: (ctx) => ctx.isDesktop
            ? const SizedBox.shrink()
            : DTButton.floating(
                icon: PhosphorIconsThin.list,
                label: '',
                semanticLabel: 'Menu',
                border: !ctx.isMobile,
                onPressed: () => Scaffold.of(ctx).openDrawer(),
              ),
      );
    },
  );

  @override
  Widget getTitle() =>
      ScaffoldTitlePill(icon: (_) => PhosphorIconsThin.addressBook, label: (t) => t.CONTACTS);
}
