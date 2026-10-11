import 'dart:async';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../utils/ds_device_extensions.dart';
import 'ds_notification.dart';
import 'ds_notification_cubit.dart';
import 'ds_notification_state.dart';

class _NotificationModel {
  final DSNotification notification;
  AnimationController? controller;

  _NotificationModel({required this.notification});

  double get progress => controller?.value ?? 0.0;
}

class DSNotificationQueue extends StatefulWidget {
  const DSNotificationQueue({super.key});

  @override
  State<DSNotificationQueue> createState() => _NotificationQueueState();
}

class _NotificationQueueState extends State<DSNotificationQueue> with TickerProviderStateMixin {
  final List<_NotificationModel> _active = [];
  final GlobalKey<AnimatedListState> _listKey = GlobalKey<AnimatedListState>();

  bool get _isMobile => context.isMobile;

  static const _kNotificationDuration = Duration(seconds: 3);

  @override
  void dispose() {
    for (final n in _active) {
      n.controller?.dispose();
    }
    super.dispose();
  }

  void _receive(DSNotification notification) {
    final n = _NotificationModel(notification: notification);
    if (_active.length == 2) {
      _remove(_active.length - 1);
    }
    _insert(n);
  }

  void _insert(_NotificationModel n) {
    setState(() => _active.insert(0, n));
    _listKey.currentState?.insertItem(0);
    _scheduleRemoval(n);
  }

  void _scheduleRemoval(_NotificationModel n) {
    n.controller?.dispose();
    final controller = AnimationController(vsync: this, duration: _kNotificationDuration);
    n.controller = controller;
    controller
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          _remove(_active.indexOf(n));
        }
      })
      ..forward();
  }

  void _remove(int index) {
    if (index < 0 || index >= _active.length) return;
    final removed = _active[index];
    removed.controller?.stop();
    setState(() => _active.removeAt(index));
    _listKey.currentState?.removeItem(
      index,
      (ctx, anim) => _buildItem(removed, anim, removing: true),
      duration: const Duration(milliseconds: 300),
    );
    Future.delayed(const Duration(milliseconds: 300), () => removed.controller?.dispose());
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<DSNotificationCubit, DSNotificationState>(
      listenWhen: (prev, curr) => curr.notificationList.length > prev.notificationList.length,
      listener: (ctx, state) {
        for (final notification in state.notificationList) {
          _receive(notification);
        }
        ctx.read<DSNotificationCubit>().clearNotificationList();
      },
      child: IgnorePointer(
        ignoring: _active.isEmpty,
        child: ClipRect(
          clipBehavior: Clip.none,
          child: Align(
            alignment: _isMobile ? Alignment.topCenter : Alignment.topRight,
            child: SizedBox(
              width: 400,
              child: AnimatedList(
                key: _listKey,
                shrinkWrap: true,
                clipBehavior: Clip.none,
                initialItemCount: _active.length,
                itemBuilder: (ctx, i, anim) =>
                    i < _active.length ? _buildItem(_active[i], anim) : const SizedBox.shrink(),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildItem(_NotificationModel n, Animation<double> animation, {bool removing = false}) {
    final curved = CurvedAnimation(
      parent: animation,
      curve: removing ? Curves.easeOut : Curves.easeIn,
    );

    if (removing) {
      // Fades and shrinks toward its own center in place — no downward
      // slide — while `SizeTransition` collapses the space it occupied in
      // the list over the same duration, so notifications below slide up
      // into place as this one disappears, rather than jumping once it's
      // gone.
      return SizeTransition(
        sizeFactor: curved,
        alignment: Alignment.center,
        child: FadeTransition(
          opacity: Tween<double>(begin: 0, end: 1).animate(curved),
          child: ScaleTransition(
            scale: Tween<double>(begin: 0.85, end: 1).animate(curved),
            child: _buildCard(n, animateProgress: false),
          ),
        ),
      );
    }

    return SizeTransition(
      sizeFactor: curved,
      alignment: Alignment.center,
      child: FadeTransition(
        opacity: Tween<double>(begin: 0, end: 1).animate(curved),
        child: _buildCard(n),
      ),
    );
  }

  Widget _buildCard(_NotificationModel n, {bool animateProgress = true}) {
    return Padding(
      padding: const EdgeInsets.only(left: 10, top: 4, right: 4, bottom: 10),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          animateProgress && n.controller != null
              ? AnimatedBuilder(
                  animation: n.controller!,
                  builder: (_, __) => DTNotificationCard(
                    title: n.notification.title,
                    message: n.notification.body,
                    avatar: _buildLeading(n.notification),
                    dismissProgress: n.controller!.value,
                    progressColor: CoporTheme.of(context).colors.primaryBorder,
                  ),
                )
              : DTNotificationCard(
                  title: n.notification.title,
                  message: n.notification.body,
                  avatar: _buildLeading(n.notification),
                  dismissProgress: 0,
                  progressColor: CoporTheme.of(context).colors.primaryBorder,
                ),
          Positioned(
            top: -3,
            right: -3,
            child: DTDismissButton(onPressed: () => _remove(_active.indexOf(n))),
          ),
        ],
      ),
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
}
