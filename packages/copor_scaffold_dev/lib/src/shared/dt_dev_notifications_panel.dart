import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Bare-bones notifications end-drawer panel reading the shared
/// `DSNotificationCubit` inbox, used as the default `notificationsPanel` for
/// both [DSScaffoldTesterPage] and [DTShowcasePage] when a host app doesn't
/// supply its own (the same one it shows on every other page).
class DTDevNotificationsPanel extends StatelessWidget {
  const DTDevNotificationsPanel({super.key});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final inbox = context.watch<DSNotificationCubit>().state.inbox;

    // No `mainAxisSize: min` — fills whatever height the end drawer gives
    // it (see `AppNotificationsPanel`, which this mirrors). The header
    // keeps its own padding, but `DSNotificationInboxList` deliberately
    // isn't — it overflows edge-to-edge, touching the popover's own
    // top/bottom edges, rather than sitting inset within it.
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Notifications', style: dt.text.sectionTitle),
              if (inbox.isNotEmpty)
                DTButton.tertiary(
                  label: 'Clear all',
                  onPressed: () =>
                      context.read<DSNotificationCubit>().clearInbox(),
                ),
            ],
          ),
        ),
        Expanded(
          child: DSNotificationInboxList(
            emptyState: Center(
              child: Text('No notifications yet.', style: dt.text.body),
            ),
          ),
        ),
      ],
    );
  }
}
