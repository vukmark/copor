import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_factory.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/bloc/utils/bloc_providers.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/data/model/input_field_model.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_list/country_list_bloc.dart';
import 'package:copor_core/src/modules/administration/country/bloc/utils/country_bloc_factory.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_bloc.dart';
import 'package:copor_core/src/modules/administration/language/config/language_bloc_factory.dart';
import 'package:copor_core/src/modules/administration/state/bloc/state_list/state_list_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/login/tenant_activation/config/tenant_activation_keys.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/generic_bloc_listener.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:copor_core/src/modules/login/tenant_activation/bloc/utils/tenant_activation_bloc_factory.dart';
import 'package:copor_core/src/modules/login/tenant_activation/presentation/tenant_activation_form.dart';

GoRoute createTenantActivationRoute() {
  return GoRoute(
    path: AppRoutes.tenantActivation,
    pageBuilder: (context, state) {
      return NoAnimationPage(
        key: state.pageKey,
        child: MultiBlocProvider(
          providers: _tenantActivationProviders(),
          child: MultiBlocListener(
            listeners: _tenantActivationListeners(),
            child: TenantActivationForm(),
          ),
        ),
      );
    },
  );
}

List<BlocProvider> _tenantActivationProviders() => [
  BlocProvider<StateIdCubit>(create: (context) => StateIdCubit()),
  StateSimpleListProvider(),
  BlocProvider<CoporFormBloc>(create: (context) => getIt<CoporFormBloc>()),
  BlocProvider<TranslationBloc<LoginPageTranslation>>(
    create: (context) => BlocFactory.translation.initializeLoginPageTranslationBloc(context),
  ),
  BlocProvider<TranslationBloc<RegistrationPageTranslation>>(
    create: (context) =>
        ActivationBlocFactory.translation.initializeActivationPageTranslationBloc(context),
  ),
  BlocProvider<CountryListBloc>(
    create: (context) => CountryListBlocFactory.initializeCountryPublicListBloc(context),
  ),
  BlocProvider<StateListBloc>(create: (context) => getIt<StateListBloc>()),
  BlocProvider<LanguageBloc>(create: (context) => LanguageBlocFactory.initializeLanguageBloc()),
];

List<BlocListener> _tenantActivationListeners() => [
  FailureListener<CoporFormBloc, CoporFormState>(failureKey: 'copor_form_failure'),
  BlocListener<CoporFormBloc, CoporFormState>(
    listenWhen: (prev, curr) => curr.isUpdated && !prev.isUpdated,
    listener: (context, state) {
      final translation = context.getState.commonTranslation.ensuredData;
      String successMessage = translation.TENANT_ACTIVATED_SUCCESSFULLY;

      context.getBloc.appScaffold.addBanner(
        DSBanner.success(
          successMessage,
          source: 'copor_form_success',
          dismiss: DSBannerDismiss.indefinite,
        ),
      );
      goToPage(AppRoutes.registration);
      //context.read<CoporFormBloc>().add(const GetPublicCoporForm('/tenant/activation'));
    },
  ),
  createStandardListener<
    TranslationBloc<RegistrationPageTranslation>,
    TranslationState<RegistrationPageTranslation>
  >(
    loadingKey: TenantActivationKeys.activationLoadingView,
    failureKey: TenantActivationKeys.activationErrorView,
    warningKey: TenantActivationKeys.activationWarningView,
  ),
];
