import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/components/language_button.dart';
import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/modules/login/server_picker/config/server_picker_keys.dart';
import 'package:copor_core/src/modules/login/server_picker/data/model/translation/server_picker_translation.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class ServerPickerPage extends StatelessWidget {
  const ServerPickerPage({super.key});

  @override
  Widget build(BuildContext context) {
    final translationState = context.watchState.serverPickerTranslation;
    final configState = context.watchState.config;
    if (configState.result == null || translationState.result == null) {
      // Not `SizedBox.expand()` — an empty widget here is `DSScaffold`'s
      // compact-card `child` before it has anything to show, and `expand()`
      // stretches that card to the full available height instead of
      // hugging content (see `DSScaffold._buildCompactTabletBody`).
      return const SizedBox.shrink();
    }
    return _ServerPickerPageContent(
      translation: translationState.ensuredData,
      config: configState.ensuredData,
    );
  }
}

class _ServerPickerPageContent extends HookWidget {
  final ServerPickerPageTranslation translation;
  final ConfigModel config;

  const _ServerPickerPageContent({required this.translation, required this.config});

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());
    final urlController = useTextEditingController(
      text: config.baseUrl.isNotEmpty && config.isServerRemembered
          ? config.baseUrl
          : (kReleaseMode ? 'https://server.example.com' : 'http://localhost:3000'),
    );
    final inputFocusNode = useFocusNode();
    final isRememberServerChecked = useState<bool>(config.isServerRemembered);

    void onContinuePressed() {
      if (formKey.currentState!.validate()) {
        final serverUrl = urlController.text.trim();
        BlocEventDispatcher.config.checkBaseUrlHealth(context.getBloc.serverHealth, serverUrl);
        inputFocusNode.requestFocus();
      }
    }

    void onRememberServerChanged(bool? value) {
      isRememberServerChecked.value = value ?? false;
      BlocEventDispatcher.config.updateServerRememberedStatus(
        context.getBloc.config,
        isRememberServerChecked.value,
      );
    }

    return DSPageWrapper.floating(
      isMobile: context.isMobile,
      children: [
        Stack(
          children: [
            DTFloatingLayout(
              fillAvailableHeight: context.isMobile ? null : false,
              title: translation.SERVER_URL,
              leading: DTButton.surface(
                icon: PhosphorIconsThin.caretLeft,
                label: translation.CANCEL,
                enabled: config.baseUrl.isNotEmpty,
                onPressed: () => goBack(),
              ),
              trailing: DTButton.primary(
                label: translation.CONTINUE_LABEL,
                onPressed: onContinuePressed,
              ),
              children: [
                Form(
                  key: formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      DTInputField(
                        controller: urlController,
                        label: translation.SERVER_URL,
                        required: translation.ENTER_SERVER_URL,
                        focusNode: inputFocusNode,
                        autofocus: true,
                        onContinuePressed: onContinuePressed,
                        autocorrect: false,
                        enableSuggestions: false,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          DTCheckbox(
                            key: const ValueKey(
                              ServerPickerKeys.serverPickerRememberServerCheckbox,
                            ),
                            value: isRememberServerChecked.value,
                            onChanged: onRememberServerChanged,
                            label: translation.REMEMBER_SERVER,
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ],
            ),
            Positioned(
              top: 0,
              right: 20,
              child: LanguageButton(compact: true, isMobile: context.isMobile),
            ),
          ],
        ),
      ],
    );
  }
}
