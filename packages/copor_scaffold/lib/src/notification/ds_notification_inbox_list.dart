import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../badge/ds_badge_cubit.dart';
import 'ds_notification.dart';
import 'ds_notification_cubit.dart';
import 'ds_notification_state.dart';

class DSNotificationInboxList extends StatefulWidget {
  final Widget emptyState;
  final ValueChanged<DSNotification>? onNotificationPressed;
  final bool Function(DSNotification notification)? canPressNotification;
  final String expandLabel;
  final String collapseLabel;

  const DSNotificationInboxList({
    super.key,
    required this.emptyState,
    this.onNotificationPressed,
    this.canPressNotification,
    this.expandLabel = 'Expand',
    this.collapseLabel = 'Collapse',
  });

  @override
  State<DSNotificationInboxList> createState() => _DSNotificationInboxListState();
}

class _DSNotificationInboxListState extends State<DSNotificationInboxList> {
  final Set<String> _expandedClusterKeys = {};

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<DSNotificationCubit, DSNotificationState>(
      builder: (context, state) {
        final clusters = _clusterNotifications(state.inbox);

        return Stack(
          children: [
            if (clusters.isEmpty) widget.emptyState,
            if (clusters.isNotEmpty)
              ListView.builder(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
                itemCount: clusters.length,
                itemBuilder: (context, index) {
                  final cluster = clusters[index];

                  return _buildCluster(
                    cluster,
                    expanded: _expandedClusterKeys.contains(cluster.key),
                  );
                },
              ),
          ],
        );
      },
    );
  }

  List<_NotificationCluster> _clusterNotifications(List<DSNotification> notifications) {
    final clusters = <String, List<DSNotification>>{};
    for (final notification in notifications) {
      final key = notification.id.isNotEmpty
          ? notification.id
          : '${notification.title}\u0000${notification.imageUrl ?? ''}';
      clusters.putIfAbsent(key, () => []).add(notification);
    }
    return [
      for (final entry in clusters.entries)
        _NotificationCluster(key: entry.key, notifications: entry.value),
    ];
  }

  Widget _buildCluster(_NotificationCluster cluster, {required bool expanded}) {
    if (cluster.notifications.length == 1) {
      return _buildNotificationRow(cluster.notifications.single);
    }

    return AnimatedSize(
      duration: const Duration(milliseconds: 250),
      curve: Curves.easeInOut,
      alignment: Alignment.topCenter,
      child: expanded ? _buildExpandedCluster(cluster) : _buildCollapsedCluster(cluster),
    );
  }

  Widget _buildCollapsedCluster(_NotificationCluster cluster) {
    final notification = cluster.notifications.first;
    final dt = CoporTheme.of(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          if (cluster.notifications.length >= 3)
            Positioned.fill(
              top: 8,
              left: 8,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: dt.colors.surfaceContainer,
                  border: Border.all(color: dt.colors.outlineSubtle),
                  borderRadius: const BorderRadius.all(radius),
                ),
              ),
            ),
          Positioned.fill(
            top: 4,
            left: 4,
            right: 4,
            bottom: 4,
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: dt.colors.surface,
                border: Border.all(color: dt.colors.outlineSubtle),
                borderRadius: const BorderRadius.all(radius),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(right: 8, bottom: 8),
            child: _buildCard(
              notification,
              onPressed: () => setState(() => _expandedClusterKeys.add(cluster.key)),
            ),
          ),
          Positioned(
            top: -4,
            right: 36,
            child: _buildClusterToggle(
              label: widget.expandLabel,
              onPressed: () => setState(() => _expandedClusterKeys.add(cluster.key)),
            ),
          ),
          Positioned(
            top: -4,
            right: 4,
            child: DTDismissButton(onPressed: () => _removeCluster(cluster)),
          ),
          Positioned(
            top: 26,
            right: 4,
            width: 28,
            child: Center(child: DTBadge(count: cluster.notifications.length)),
          ),
        ],
      ),
    );
  }

  Widget _buildExpandedCluster(_NotificationCluster cluster) {
    return Column(
      children: [
        for (var index = 0; index < cluster.notifications.length; index++)
          _buildNotificationRow(
            cluster.notifications[index],
            clusterToggleLabel: index == 0 ? widget.collapseLabel : null,
            onClusterToggle: index == 0
                ? () => setState(() => _expandedClusterKeys.remove(cluster.key))
                : null,
            clusterCount: index == 0 ? cluster.notifications.length : null,
          ),
      ],
    );
  }

  Widget _buildClusterToggle({required String label, required VoidCallback onPressed}) {
    final dt = CoporTheme.of(context);

    return Material(
      color: dt.colors.surfaceContainer,
      shape: RoundedRectangleBorder(
        side: BorderSide(color: dt.colors.outline),
        borderRadius: const BorderRadius.only(
          topRight: Radius.circular(coporBorderRadius),
          bottomLeft: Radius.circular(coporBorderRadius),
          topLeft: Radius.circular(coporBorderRadius - 5),
          bottomRight: Radius.circular(coporBorderRadius - 5),
        ),
      ),
      clipBehavior: Clip.hardEdge,
      child: InkWell(
        onTap: onPressed,
        child: SizedBox(
          height: 28,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Center(child: Text(label, style: dt.text.labelDefault)),
          ),
        ),
      ),
    );
  }

  Widget _buildNotificationRow(
    DSNotification notification, {
    VoidCallback? onPressed,
    String? clusterToggleLabel,
    VoidCallback? onClusterToggle,
    int? clusterCount,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          _buildCard(notification, onPressed: onPressed),
          if (clusterToggleLabel != null && onClusterToggle != null)
            Positioned(
              top: 4,
              right: 36,
              child: _buildClusterToggle(label: clusterToggleLabel, onPressed: onClusterToggle),
            ),
          Positioned(
            top: 4,
            right: 4,
            child: DTDismissButton(onPressed: () => _removeNotification(notification)),
          ),
          if (clusterCount != null)
            Positioned(
              top: 34,
              right: 4,
              width: 28,
              child: Center(child: DTBadge(count: clusterCount)),
            ),
        ],
      ),
    );
  }

  Widget _buildCard(DSNotification notification, {VoidCallback? onPressed}) {
    final handlesNotificationPress =
        widget.onNotificationPressed != null &&
        (widget.canPressNotification?.call(notification) ?? true);

    return DTNotificationCard(
      title: notification.title,
      message: notification.body,
      messageMaxLines: 5,
      avatar: _buildLeading(notification),
      border: true,
      onPressed: handlesNotificationPress
          ? () => widget.onNotificationPressed!(notification)
          : onPressed,
    );
  }

  Widget _buildLeading(DSNotification notification) {
    final icon = notification.icon;
    if (icon == null) {
      return DTAvatar(
        userFullName: notification.title,
        picture: notification.imageUrl ?? '',
        radius: 18,
      );
    }

    final colors = CoporTheme.of(context).colors;
    return Container(
      width: 36,
      height: 36,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: colors.primaryContainer,
        border: Border.all(color: colors.primaryBorder),
      ),
      child: Icon(icon, size: 18, color: colors.primary),
    );
  }

  void _removeCluster(_NotificationCluster cluster) {
    context.read<DSNotificationCubit>().removeInboxNotifications(cluster.notifications);
    context.read<DSBadgeCubit>().decrementBadgeCount(
      DSNotificationDestination.bell.key,
      cluster.notifications.length,
    );
  }

  void _removeNotification(DSNotification notification) {
    context.read<DSNotificationCubit>().removeInboxNotification(notification);
    context.read<DSBadgeCubit>().decrementBadgeCount(DSNotificationDestination.bell.key);
  }
}

class _NotificationCluster {
  final String key;
  final List<DSNotification> notifications;

  const _NotificationCluster({required this.key, required this.notifications});
}
