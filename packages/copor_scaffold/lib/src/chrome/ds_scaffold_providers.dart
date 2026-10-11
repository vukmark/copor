import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import '../badge/ds_badge_cubit.dart';
import '../banner/ds_banner_cubit.dart';
import '../drawer/ds_drawer_cubit.dart';
import '../end_drawer/ds_end_drawer_cubit.dart';
import '../loading/ds_loading_cubit.dart';
import '../notification/ds_notification_cubit.dart';
import 'ds_chrome_cubit.dart';
import 'ds_scaffold_controller.dart';

/// Provides the six scaffold cubits plus the [DSScaffoldController] facade
/// built from them. Wrap the app root (or a standalone host) with this once.
class DSScaffoldProviders extends StatelessWidget {
  final Widget child;

  const DSScaffoldProviders({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (_) => DSChromeCubit()),
        BlocProvider(create: (_) => DSLoadingCubit()),
        BlocProvider(create: (_) => DSBannerCubit()),
        BlocProvider(create: (_) => DSNotificationCubit()),
        BlocProvider(create: (_) => DSBadgeCubit()),
        BlocProvider(create: (_) => DSEndDrawerCubit()),
        BlocProvider(create: (_) => DSDrawerCubit()),
      ],
      child: Builder(
        builder: (context) => Provider<DSScaffoldController>(
          create: (context) => DSScaffoldController(
            chromeCubit: context.read<DSChromeCubit>(),
            loadingCubit: context.read<DSLoadingCubit>(),
            bannerCubit: context.read<DSBannerCubit>(),
            notificationCubit: context.read<DSNotificationCubit>(),
            badgeCubit: context.read<DSBadgeCubit>(),
            endDrawerCubit: context.read<DSEndDrawerCubit>(),
            drawerCubit: context.read<DSDrawerCubit>(),
          ),
          child: child,
        ),
      ),
    );
  }
}
