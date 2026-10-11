import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_factory.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/generic_bloc_listener.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/login/server_picker/config/server_picker_keys.dart';
import 'package:copor_core/src/modules/login/server_picker/data/model/translation/server_picker_translation.dart';
import 'package:copor_core/src/modules/login/server_picker/presentation/server_picker_page.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

GoRoute createServerPickerRoute() {
  return GoRoute(
    path: AppRoutes.serverPicker,
    pageBuilder: (context, state) {
      return NoAnimationPage(
        key: state.pageKey,
        child: MultiBlocProvider(
          providers: _serverPickerProviders(),
          child: MultiBlocListener(listeners: _serverPickerListeners(), child: ServerPickerPage()),
        ),
      );
    },
  );
}

List<BlocProvider> _serverPickerProviders() => [
  BlocProvider<TranslationBloc<ServerPickerPageTranslation>>(
    create: (context) => BlocFactory.translation.initializeServerPickerTranslationBloc(context),
  ),
  BlocProvider<ServerHealthBloc>(create: (context) => BlocFactory.initializeServerHealthBloc()),
];

List<BlocListener> _serverPickerListeners() => [
  LanguageChangeListener(
    additionalLogic: (context, _) => BlocReactions.serverPicker.getServerPickerTranslation(context),
  ),
  BlocListener<ConfigBloc, ConfigState>(
    listener: (context, configState) {
      BlocReactions.serverPicker.rerouteIfConfigBaseUrlSet(context, configState);
    },
  ),
  createStandardListener<ServerHealthBloc, ServerHealthState>(
    loadingKey: ServerPickerKeys.loadingServerHealth,
    failureKey: ServerPickerKeys.serverPickerErrorView,
    warningKey: ServerPickerKeys.serverPickerWarningView,
    listenWhen: (prev, curr) =>
        (prev.failure == null && curr.failure != null) || prev.result != curr.result,
    additionalLogic: (context, state) =>
        BlocReactions.serverPicker.updateBaseUrlAndGet(context, state),
  ),
  createStandardListener<
    TranslationBloc<ServerPickerPageTranslation>,
    TranslationState<ServerPickerPageTranslation>
  >(
    loadingKey: ServerPickerKeys.loadingServerPickerTranslation,
    failureKey: ServerPickerKeys.serverPickerErrorView,
    warningKey: ServerPickerKeys.serverPickerWarningView,
  ),
];
