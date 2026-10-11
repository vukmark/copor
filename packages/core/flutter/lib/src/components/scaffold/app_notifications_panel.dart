import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Shared notifications inbox shown behind the app-bar bell across every
/// real page — see `ScaffoldUpdater`, which supplies this as the default
/// `endDrawer` unless a page implements `DSPageEndDrawer` itself.
///
/// Reads [DSNotificationCubit.state]'s `inbox`, fed by chat/push notification
/// handlers (`chat_list_bloc.dart`'s websocket path, `notification_service
/// .dart`'s FCM path) alongside the existing toast queue and bell badge.
class AppNotificationsPanel extends StatelessWidget {
  const AppNotificationsPanel({super.key});

  @override
  Widget build(BuildContext context) {
    // Narrowed to just the flag the header row needs (the "Clear all" button's
    // `enabled` state) — DSNotificationInboxList reads the full inbox itself
    // via its own BlocBuilder, so watching it here too would rebuild the
    // header/divider on every inbox emission for no reason.
    final hasNotifications = context.select<DSNotificationCubit, bool>(
      (cubit) => cubit.state.inbox.isNotEmpty,
    );
    final translation = context.watch<TranslationBloc<CommonTranslation>>().state.ensuredData;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IgnorePointer(
                    child: DTButton.floating(
                      icon: DTIcons.notification,
                      label: translation.NOTIFICATIONS,
                      border: false,
                      onPressed: () {},
                    ),
                  ),
                  DTButton.surface(
                    label: translation.CLEAR_ALL,
                    border: false,
                    enabled: hasNotifications,
                    onPressed: () {
                      context.read<DSNotificationCubit>().clearInbox();
                      context.read<DSBadgeCubit>().clearBadgeCount(
                        DSNotificationDestination.bell.key,
                      );
                    },
                  ),
                ],
              ),
              const SizedBox(height: 12),
              const DTDivider(height: 1),
            ],
          ),
        ),
        Expanded(
          child: DSNotificationInboxList(
            expandLabel: translation.EXPAND,
            collapseLabel: translation.COLLAPSE,
            canPressNotification: (notification) => notification.id.isNotEmpty,
            onNotificationPressed: (notification) {
              getIt<AppScaffoldCubit>().closeEndDrawer();

              // The module the notification belongs to opens it.
              for (final module in AppModules.enabled) {
                if (module.openInboxNotification(notification.id)) return;
              }
            },
            emptyState: Center(
              child: DTEmptyState(
                icon: DTIcons.notification,
                title: translation.NO_NOTIFICATIONS_YET,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
