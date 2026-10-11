import 'dart:async';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../model/ds_scaffold_config.dart';
import 'ds_banner.dart';
import 'ds_banner_cubit.dart';
import 'ds_banner_state.dart';

class DSBannerOverlay extends StatefulWidget {
  final DSScaffoldConfig config;

  const DSBannerOverlay({super.key, required this.config});

  @override
  State<DSBannerOverlay> createState() => _DSBannerOverlayState();
}

class _DSBannerOverlayState extends State<DSBannerOverlay> {
  Timer? _autoDismissTimer;
  DSBanner? _scheduledFor;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _scheduleBanner(context.read<DSBannerCubit>().state);
  }

  @override
  void dispose() {
    _autoDismissTimer?.cancel();
    super.dispose();
  }

  void _cancelSchedule() {
    _autoDismissTimer?.cancel();
    _autoDismissTimer = null;
    _scheduledFor = null;
  }

  void _scheduleBanner(DSBannerState state) {
    final banner = state.banner;

    if (banner == null) {
      _cancelSchedule();
      return;
    }
    if (banner == _scheduledFor) return;

    _cancelSchedule();
    _scheduledFor = banner;

    final cubit = context.read<DSBannerCubit>();
    final duration = banner.dismiss.resolveDuration(
      banner.type,
      widget.config.autoDismissDurationFor,
    );

    if (duration != null) {
      _autoDismissTimer = Timer(duration, () {
        _autoDismissTimer = null;
        if (mounted && !cubit.isClosed) cubit.removeBanner();
      });
    }

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && !cubit.isClosed) cubit.markBannerShown(banner);
    });
  }

  String _bannerKey(DSBanner banner) =>
      '${banner.type.name}_${banner.source}_${banner.message}';

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<DSBannerCubit, DSBannerState>(
      listenWhen: (prev, curr) => prev.banner != curr.banner,
      listener: (_, state) => _scheduleBanner(state),
      buildWhen: (prev, curr) => prev.banner != curr.banner,
      builder: (ctx, state) {
        final banner = state.banner;
        final Widget child;

        if (banner == null) {
          child = const SizedBox.shrink(key: ValueKey('_empty'));
        } else {
          final key = ValueKey(_bannerKey(banner));
          final dismiss = () {
            _cancelSchedule();
            ctx.read<DSBannerCubit>().removeBanner();
          };

          child = switch (banner.type) {
            DSBannerType.error => DTBanner.error(
              key: key,
              message: banner.message,
              onDismiss: dismiss,
            ),
            DSBannerType.warning => DTBanner.warning(
              key: key,
              message: banner.message,
              onDismiss: dismiss,
            ),
            DSBannerType.success => DTBanner.success(
              key: key,
              message: banner.message,
              onDismiss: dismiss,
              copiableData: banner.copiableData,
            ),
            DSBannerType.info => DTBanner.info(
              key: key,
              message: banner.message,
              onDismiss: dismiss,
            ),
          };
        }

        return Align(
          alignment: Alignment.bottomCenter,
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 250),
            layoutBuilder: (currentChild, previousChildren) => Stack(
              alignment: Alignment.center,
              clipBehavior: Clip.none,
              children: [
                ...previousChildren,
                if (currentChild != null) currentChild,
              ],
            ),
            transitionBuilder: (child, animation) => FadeTransition(
              opacity: animation,
              child: SlideTransition(
                position:
                    Tween<Offset>(
                      begin: const Offset(0, 0.2),
                      end: Offset.zero,
                    ).animate(
                      CurvedAnimation(parent: animation, curve: Curves.easeOut),
                    ),
                child: child,
              ),
            ),
            child: child,
          ),
        );
      },
    );
  }
}
