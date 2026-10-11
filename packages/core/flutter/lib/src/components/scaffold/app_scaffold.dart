import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Application-level scaffold wrapper.
///
/// Wraps [DSScaffold] with an app-specific [DSScaffoldConfig] that reads
/// live preferences for auto-dismiss duration at the time each banner arrives.
class AppScaffold extends StatelessWidget {
  final Widget child;

  const AppScaffold({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    // Modules listen here for reactions that must not depend on which page is
    // mounted (e.g. VuMeet joins a call the moment it connects).
    //
    // Action Feedback (banner) messages belong to whatever page triggered them, so a
    // stale message must not survive navigation — that is handled route-side by
    // `ScaffoldUpdater` calling `notifyRouteChanged`, which (unlike a blanket clear on
    // every navigation) keeps a message raised by the very action that navigates, such
    // as saving a CRUD form and returning to its table.
    final scaffold = DSScaffold(
      config: DSScaffoldConfig(
        showLoadingDebugOverlay: false,
        desktopAppBarHeight: 40,
        autoDismissDurationProvider: (type) {
          final actionFeedbackDuration = context
              .read<PreferencesBloc>()
              .state
              .ensuredData
              .actionFeedbackDuration;
          return actionFeedbackDuration.autoDismissDuration;
        },
      ),
      child: child,
    );
    final listeners = [for (final module in AppModules.enabled) ...module.scaffoldListeners()];
    return listeners.isEmpty ? scaffold : MultiBlocListener(listeners: listeners, child: scaffold);
  }
}

extension on ActionFeedbackDuration {
  Duration? get autoDismissDuration => switch (this) {
    ActionFeedbackDuration.off => null,
    ActionFeedbackDuration.fiveSeconds => const Duration(seconds: 5),
    ActionFeedbackDuration.twentySeconds => const Duration(seconds: 20),
  };
}
