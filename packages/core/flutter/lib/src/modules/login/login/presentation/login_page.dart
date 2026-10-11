import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/components/app_logo.dart';
import 'package:copor_core/src/components/language_button.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/utils/contract_event_dispatcher.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_status_cubit.dart';
import 'package:copor_core/src/utils/url_launcher_helper.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/modules/login/login/config/login_keys.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_core/src/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _kWavingDotsOpacity = 0.6;
const _kWavingDotsOffsetX = 10.0;
const _kWavingDotsOffsetY = 40.0;
const _kMaxLoginAttempts = 3;

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    final TranslationState<LoginPageTranslation> translationState =
        context.watchState.loginTranslation;

    if (translationState.result == null) {
      return const SizedBox.shrink();
    }
    return _LoginPageContent(translation: translationState.ensuredData);
  }
}

bool _isCredentialsRejected(Failure failure) =>
    failure.responseCode >= 400 && failure.responseCode < 500;

class _LoginPageContent extends HookWidget {
  final LoginPageTranslation translation;

  const _LoginPageContent({required this.translation});

  @override
  Widget build(BuildContext context) {
    final usernameController = useTextEditingController();
    final passwordController = useTextEditingController();
    final isRememberUserChecked = useState(false);
    final showAdditionalButtons = useState(false);
    final failedLoginAttempts = useRef(0);
    final isLoading = context.watchState.authorization.isLoading;
    final passwordFocusNode = useFocusNode();
    final isCapsLockOn = useState(false);

    final translationRef = useRef(translation);
    translationRef.value = translation;

    bool handleCapsLockChange(KeyEvent event) {
      final capsLockOn = HardwareKeyboard.instance.lockModesEnabled.contains(KeyboardLockMode.capsLock);
      final fieldFocused = passwordFocusNode.hasFocus;
      final shouldShow = capsLockOn && fieldFocused;

      if (shouldShow != isCapsLockOn.value) {
        isCapsLockOn.value = shouldShow;

        if (shouldShow) {
          context.getBloc.appScaffold.addBanner(
            DSBanner.info(translationRef.value.CAPS_LOCK_ON_MESSAGE, source: 'login_caps_lock_warning'),
          );
        } else {
          context.getBloc.appScaffold.removeBanner();
        }
      }
      return false;
    }

    useEffect(() {
      HardwareKeyboard.instance.addHandler(handleCapsLockChange);
      return () => HardwareKeyboard.instance.removeHandler(handleCapsLockChange);
    }, []);

    void onLoginPressed() {
      if (usernameController.text.trim().isEmpty) {
        context.getBloc.appScaffold.addBanner(
          DSBanner.error(translation.PLEASE_ENTER_YOUR_USERNAME, source: 'login_username_required'),
        );
        return;
      }
      if (passwordController.text.isEmpty) {
        context.getBloc.appScaffold.addBanner(
          DSBanner.error(translation.PLEASE_ENTER_YOUR_PASSWORD, source: 'login_password_required'),
        );
        return;
      }

      TextInput.finishAutofillContext();
      BlocEventDispatcher.authorization.login(
        context.getBloc.authorization,
        usernameController.text.trim(),
        passwordController.text,
      );
    }

    void onRememberMeChanged(bool? value) {
      isRememberUserChecked.value = value ?? false;
      BlocEventDispatcher.config.updateUserRememberedStatus(
        context.getBloc.config,
        isRememberUserChecked.value,
      );
    }

    void onLoginRejected() {
      failedLoginAttempts.value++;

      if (failedLoginAttempts.value >= _kMaxLoginAttempts) {
        failedLoginAttempts.value = 0;
        goToPage(AppRoutes.forgotPassword, push: true);
      }
    }

    return BlocListener<AuthorizationBloc, AuthorizationState>(
      listenWhen: (previous, current) =>
          previous.isLoading &&
          !current.isLoading &&
          current.failure != null &&
          _isCredentialsRejected(current.failure!),
      listener: (context, _) => onLoginRejected(),
      child: DSPageWrapper.floating(
        scrollable: true,
        isMobile: context.isMobile,
        padding: coporPagePadding,
        children: [
          SafeArea(
            child: Stack(
              children: [
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: Opacity(
                    opacity: _kWavingDotsOpacity,
                    child: Transform.translate(
                      offset: const Offset(_kWavingDotsOffsetX, _kWavingDotsOffsetY),
                      child: const DTWavingDots(),
                    ),
                  ),
                ),
                Positioned(
                  top: 0,
                  right: 0,
                  child: LanguageButton(compact: true, isMobile: context.isMobile),
                ),
                Form(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      const AppLogo(height: 60, width: 120),
                      const SizedBox(height: 60),
                      AutofillGroup(
                        child: Column(
                          children: [
                            DTInputField(
                              controller: usernameController,
                              label: translation.USERNAME,
                              autofillHints: const [AutofillHints.username],
                              autocorrect: false,
                              enableSuggestions: false,
                              textInputAction: TextInputAction.next,
                            ),
                            DTPasswordField(
                              controller: passwordController,
                              label: translation.PASSWORD,
                              autofillHints: const [AutofillHints.password],
                              enableAutofill: true,
                              textInputAction: TextInputAction.done,
                              onContinuePressed: onLoginPressed,
                              focusNode: passwordFocusNode,
                            ),
                          ],
                        ),
                      ),
                      DTCheckbox(
                        key: const ValueKey(LoginKeys.loginRememberMeCheckbox),
                        value: isRememberUserChecked.value,
                        onChanged: onRememberMeChanged,
                        label: translation.REMEMBER_ME,
                      ),
                      const SizedBox(height: 20),
                      DTButton.primary(
                        label: translation.LOGIN,
                        fullWidth: true,
                        onPressed: () {
                          if (!isLoading) onLoginPressed();
                        },
                      ),
                      SizedBox(height: 20),
                      Center(
                        child: DTButton.primary(
                          fullWidth: true,
                          border: false,
                          label: translation.FORGOT_PASSWORD,
                          onPressed: () => goToPage(AppRoutes.forgotPassword, push: true),
                        ),
                      ),
                      const SizedBox(height: 10),
                      DTButton.toggle(
                        animatedIcon: DTAnimatedChevron(isOpen: showAdditionalButtons.value),
                        reverseContent: true,
                        isToggled: showAdditionalButtons.value,
                        fullWidth: true,
                        label: translation.MORE,
                        labelToggled: translation.LESS,
                        onPressed: () => showAdditionalButtons.value = !showAdditionalButtons.value,
                      ),
                      AnimatedSwitcher(
                        duration: const Duration(milliseconds: 400),
                        switchInCurve: Curves.easeInOut,
                        switchOutCurve: Curves.easeInOut,
                        transitionBuilder: (child, animation) => SizeTransition(
                          sizeFactor: animation,
                          alignment: Alignment.topLeft,
                          child: child,
                        ),
                        child: showAdditionalButtons.value
                            ? _buildAdditionalButtons(context)
                            : const SizedBox.shrink(key: ValueKey('collapsed')),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAdditionalButtons(BuildContext context) {
    return Column(
      children: [
        // Only offered when an administrator has switched self-registration on.
        BlocBuilder<RegistrationStatusCubit, bool>(
          builder: (context, isRegistrationEnabled) {
            if (!isRegistrationEnabled) return const SizedBox.shrink();

            return Column(
              children: [
                _buildSectionHeader(context, translation.OPEN_ACCOUNT_BUTTON_HEADER),
                DTButtonWithHelp(
                  label: translation.OPEN_ACCOUNT,
                  fullWidth: true,
                  onPressed: () => goToPage(AppRoutes.registration, push: true),
                  helpContent: translation.OPEN_ACCOUNT_EXPLANATION,
                ),
              ],
            );
          },
        ),
        _buildSectionHeader(context, translation.TENANT_ADMINISTRATOR),
        DTButtonWithHelp(
          label: translation.ACTIVATE_TENANT,
          fullWidth: true,
          onPressed: () => goToPage(AppRoutes.tenantActivation, push: true),
          helpContent: translation.ACTIVATE_TENANT_EXPLANATION,
        ),
        _buildSectionHeader(context, translation.SUPPORT),
        const SizedBox(height: 20),
        DTButton.primary(
          label: translation.CHANGE_SERVER_URL,
          fullWidth: true,
          onPressed: () => goToPage(AppRoutes.serverPicker, push: true),
        ),
        const SizedBox(height: 20),
        for (final module in AppModules.enabled) ...module.loginPageActions(context),
        DTButton.primary(
          border: false,
          fullWidth: true,
          label: AppLinks.websiteLabel,
          onPressed: () => launchUrlHelper(AppLinks.website, context),
        ),
        _buildSectionHeader(context, translation.DOCUMENTS),
        DTButton.primary(
          border: false,
          label: translation.IMPRESSUM,
          onPressed: () =>
              ContractEventDispatcher.contract.getContract(context, "/documents/Impressum/"),
        ),
        const SizedBox(height: 10),
        DTButton.primary(
          border: false,
          label: translation.PRIVACY_POLICY,
          onPressed: () => launchUrlHelper(AppLinks.privacyPolicy, context),
        ),
      ],
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title) {
    final textStyle = CoporTextStyles.of(context).bodySecondary;
    final lineColor = CoporColors.of(context).outline;

    Widget line({bool reverse = false}) {
      return Expanded(
        child: Container(
          height: 1,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: reverse ? Alignment.centerRight : Alignment.centerLeft,
              end: reverse ? Alignment.centerLeft : Alignment.centerRight,
              colors: [lineColor.withValues(alpha: 0), lineColor, lineColor],
              stops: const [0, 0.3, 1],
            ),
          ),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const SizedBox(height: 30),
        LayoutBuilder(
          builder: (context, constraints) {
            final maxWidth = constraints.maxWidth.isFinite
                ? constraints.maxWidth
                : MediaQuery.of(context).size.width;

            return SizedBox(
              width: maxWidth,
              child: Row(
                children: [
                  line(reverse: true),
                  ConstrainedBox(
                    constraints: BoxConstraints(maxWidth: maxWidth * 0.9),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: Text(
                        title,
                        style: textStyle,
                        textAlign: TextAlign.center,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                  line(),
                ],
              ),
            );
          },
        ),
        const SizedBox(height: 20),
      ],
    );
  }
}
