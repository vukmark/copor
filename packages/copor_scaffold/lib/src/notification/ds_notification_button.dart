import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../badge/ds_badge_cubit.dart';
import 'ds_notification.dart';

class DSNotificationButton extends StatelessWidget {
  final DSNotificationDestination destination;
  final VoidCallback onPressed;
  final IconData? icon;
  final String semanticLabel;
  final bool border;

  const DSNotificationButton({
    super.key,
    this.destination = DSNotificationDestination.bell,
    required this.onPressed,
    this.icon,
    this.semanticLabel = 'Notifications',
    this.border = false,
  });

  @override
  Widget build(BuildContext context) {
    final unread = context.select<DSBadgeCubit, int>(
      (c) => c.state.badgeCountFor(destination.key),
    );

    return DTCommonButtons.notification(
      unreadCount: unread,
      icon: icon ?? DTIcons.notification,
      semanticLabel: semanticLabel,
      border: border,
      onPressed: onPressed,
    );
  }
}
