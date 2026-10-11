import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_event.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/components/scaffold/app_scaffold.dart';
import 'package:copor_core/src/components/scaffold/nav_transition_overlay.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/modules/login/server_picker/data/model/translation/server_picker_translation.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/error/response_code.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

Widget buildShellForUnauthenticated(BuildContext context, GoRouterState state, Widget child) {
  final isOnServerPicker = state.matchedLocation == AppRoutes.serverPicker;

  final configState = context.watchState.config;
  final commonTranslationState = context.watchState.commonTranslation;
  final accountInfoState = context.watchState.accountInfo;

  final isInitial = BlocStateConditions.hasInitialStates([configState, commonTranslationState]);

  final isAwaitingHome =
      context.watchState.authorization.result != null &&
      accountInfoState.failure == null &&
      AppRoutes.publicRoutes.contains(state.fullPath ?? '');

  Widget body;
  if (!isOnServerPicker && configState.failure != null) {
    body = _ShellFailureScreen(
      failure: configState.failure!,
      translation: _resolveTranslation(),
      buttonLabel: (t) => t.BACK_TO_SERVER_PICKER,
      onButtonPressed: () => goToPage(AppRoutes.serverPicker),
    );
  } else if (!isOnServerPicker && (isInitial || isAwaitingHome)) {
    body = const _ShellLoadingScreen();
  } else {
    body = child;
  }

  return AppScaffold(child: body);
}

Widget buildShellForAuthenticated(BuildContext context, GoRouterState state, Widget child) {
  final accountInfoState = context.watchState.accountInfo;
  final preferencesState = context.watchState.preferences;
  final List<BaseState<dynamic>> states = [accountInfoState, preferencesState];

  final isInitial = BlocStateConditions.hasInitialStates(states);
  final failure = BlocStateConditions.getFirstFailure(states);
  if (failure != null) {
    return _ShellFailureScreen(
      failure: failure,
      translation: _resolveTranslation(),
      buttonLabel: (t) => t.BACK_TO_LOGIN,
      onButtonPressed: () => getIt<AuthorizationBloc>().add(Logout()),
    );
  }
  if (isInitial) {
    return const _ShellLoadingScreen();
  }
  return NavTransitionOverlay(child: child);
}

ServerPickerPageTranslation _resolveTranslation() {
  final languageCode = getIt<ConfigBloc>().state.result?.data.language.code;
  return languageCode == 'en'
      ? ServerPickerPageTranslation.defaultEnglish()
      : ServerPickerPageTranslation.defaultGerman();
}

class _ShellLoadingScreen extends StatelessWidget {
  const _ShellLoadingScreen();

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: CoporTheme.of(context).colors.surfaceBackground,
      child: const Center(child: DTRingLoader.page()),
    );
  }
}

class _ShellFailureScreen extends StatelessWidget {
  final Failure failure;
  final ServerPickerPageTranslation translation;
  final String Function(ServerPickerPageTranslation) buttonLabel;
  final VoidCallback onButtonPressed;

  const _ShellFailureScreen({
    required this.failure,
    required this.translation,
    required this.buttonLabel,
    required this.onButtonPressed,
  });

  bool get _isOffline =>
      failure.responseCode == ResponseCode.connectionError ||
      failure.responseCode == ResponseCode.noInternetConnection;

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    return ColoredBox(
      color: dt.colors.surfaceBackground,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                _isOffline
                    ? PhosphorIconsThin.cellSignalSlash
                    : PhosphorIconsThin.warning,
                size: 40,
                color: dt.colors.onSurfaceSubtle,
              ),
              const SizedBox(height: 20),
              Text(
                _isOffline ? translation.NO_INTERNET_CONNECTION : translation.SOMETHING_WENT_WRONG,
                style: dt.text.sectionTitle,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                _isOffline
                    ? translation.CHECK_CONNECTION_AND_TRY_AGAIN
                    : translation.PLEASE_TRY_AGAIN_LATER,
                style: dt.text.body.copyWith(color: dt.colors.onSurfaceSubtle),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),
              DTButton.surface(label: buttonLabel(translation), onPressed: onButtonPressed),
            ],
          ),
        ),
      ),
    );
  }
}
