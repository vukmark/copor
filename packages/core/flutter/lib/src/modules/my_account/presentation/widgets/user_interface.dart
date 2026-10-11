import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/components/dialogs/app_confirm_dialog.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/preferences/bloc/utils/preferences_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';
import 'package:copor_core/src/utils/color_display.dart';
import 'package:copor_core/src/utils/dropdown_entries.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_theme/copor_theme.dart' hide ContrastMode, AppFontWeight;
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UserInterface extends StatelessWidget {
  final MyAccountPageTranslation translation;

  const UserInterface({super.key, required this.translation});

  void _handlePreferenceChange(BuildContext context, UpdatePreferencesDTO partialUpdate) {
    final currentPreferences = context.read<PreferencesBloc>().state.ensuredData;

    final fullUpdateDto = UpdatePreferencesDTO(
      themeMode: partialUpdate.themeMode ?? currentPreferences.themeMode,
      contrast: partialUpdate.contrast ?? currentPreferences.contrastMode,
      contactPrivacy: partialUpdate.contactPrivacy ?? currentPreferences.contactPrivacy,
      authentication: partialUpdate.authentication ?? currentPreferences.authentication,
      language: partialUpdate.language ?? currentPreferences.language,
      colorSet: partialUpdate.colorSet ?? currentPreferences.colorSet,
      fontSize: partialUpdate.fontSize ?? currentPreferences.fontSize,
      useIcons: partialUpdate.useIcons ?? currentPreferences.useIcons,
      actionFeedbackDuration:
          partialUpdate.actionFeedbackDuration ?? currentPreferences.actionFeedbackDuration,
      fontWeight: partialUpdate.fontWeight ?? currentPreferences.fontWeight,
    );

    PreferencesBlocEventDispatcher.preferences.updatePreferences(
      context.read<PreferencesBloc>(),
      fullUpdateDto,
    );
  }

  void _handleLanguageChange(BuildContext context, LanguageModel language) {
    BlocEventDispatcher.config.updateAppLanguage(context.read<ConfigBloc>(), language);
    _handlePreferenceChange(context, UpdatePreferencesDTO(language: language.id));
  }

  Future<void> _handleResetUIButtonClicked(BuildContext context) async {
    final shouldReset = await AppConfirmDialog.showConfirm(
      context,
      title: translation.RESET_USER_INTERFACE,
      content: translation.ALERT_CONTENT_TEXT,
      cancelLabel: translation.CANCEL,
      confirmLabel: translation.RESET_UI,
    );

    if (shouldReset == true && context.mounted) {
      final currentPreferences = context.read<PreferencesBloc>().state.ensuredData;
      final resetModel = currentPreferences.resetToDefaultsExceptPrivacy();
      final resetDto = UpdatePreferencesDTO.fromModel(resetModel);
      _handlePreferenceChange(context, resetDto);
    }
  }

  Widget _buildColorPalette(ColorSet colorSet) {
    final colors = getFilteredColorMap(colorSet);
    return Wrap(
      spacing: 8.0,
      runSpacing: 8.0,
      children: colors.values
          .map(
            (color) => ColorDisplay(
              color: color,
              size: 60.0,
              shape: BoxShape.rectangle,
              cornerRadius: 6.0,
            ),
          )
          .toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final preferences = context.watch<PreferencesBloc>().state.ensuredData;
    final selectedThemeMode = preferences.themeMode;
    final selectedColorSet = preferences.colorSet;
    final selectedUseIcons = preferences.useIcons;
    final selectedFontWeight = preferences.fontWeight;
    final selectedActionFeedbackDuration = preferences.actionFeedbackDuration;
    final selectedFontSize = preferences.fontSize;

    final configState = context.watchState.config;

    final isInitial = BlocStateConditions.hasInitialStates([configState]);
    if (isInitial) return const SizedBox.shrink();

    final dt = CoporTextStyles.of(context);

    return DTInputDecorator(
      label: translation.USER_INTERFACE,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          DTInputDecorator.withHelp(
            label: translation.COLOUR_MODE,
            helpContent: Text(translation.COLOR_MODE_EXPLANATION, style: dt.bodySecondary),
            child: DTSegmentedButton<ThemeMode>(
              selected: {selectedThemeMode},
              segments: [
                ButtonSegment(value: ThemeMode.system, label: Text(translation.AUTO)),
                ButtonSegment(value: ThemeMode.light, label: Text(translation.LIGHT)),
                ButtonSegment(value: ThemeMode.dark, label: Text(translation.DARK)),
              ],
              onSelectionChanged: (newSelection) {
                if (newSelection.isNotEmpty) {
                  _handlePreferenceChange(
                    context,
                    UpdatePreferencesDTO(themeMode: newSelection.first),
                  );
                }
              },
            ),
          ),
          DTInputDecorator.withHelp(
            label: translation.COLOUR_SET_TITLE,
            helpContent: Text(translation.COLOUR_SET_EXPLANATION, style: dt.bodySecondary),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                DTSegmentedButton<ColorSet>(
                  selected: {selectedColorSet},
                  onSelectionChanged: (Set<ColorSet> newSelection) {
                    if (newSelection.isNotEmpty) {
                      _handlePreferenceChange(
                        context,
                        UpdatePreferencesDTO(colorSet: newSelection.first),
                      );
                    }
                  },
                  segments: const [
                    ButtonSegment<ColorSet>(value: ColorSet.SET22, label: Text('22')),
                    ButtonSegment<ColorSet>(value: ColorSet.SET18, label: Text('18')),
                    ButtonSegment<ColorSet>(value: ColorSet.SET9, label: Text('9')),
                    ButtonSegment<ColorSet>(value: ColorSet.SET5, label: Text('5')),
                  ],
                ),
                const SizedBox(height: 12),
                _buildColorPalette(selectedColorSet),
              ],
            ),
          ),
          const SizedBox(height: 8),
          DTDropdown<LanguageModel>.single(
            label: translation.LANGUAGE,
            value: context.config.currentLanguage,
            items: [LanguageModel.defaultEnglish(), LanguageModel.defaultGerman()]
                .map(
                  (language) => DropdownItem<LanguageModel>(value: language, label: language.name),
                )
                .toList(),
            onChanged: (LanguageModel? selectedLanguage) {
              if (selectedLanguage != null) {
                _handleLanguageChange(context, selectedLanguage);
              }
            },
            isMobile: context.isMobile,
          ),
          DTInputDecorator.withHelp(
            label: translation.NAVIGATION,
            helpContent: Text(translation.NAVIGATION_EXPLANATION, style: dt.bodySecondary),
            child: DTSegmentedButton<bool>(
              selected: {selectedUseIcons},
              segments: [
                ButtonSegment(value: true, label: Text(translation.ICONS)),
                ButtonSegment(value: false, label: Text(translation.TEXT)),
              ],
              onSelectionChanged: (newSelection) {
                if (newSelection.isNotEmpty) {
                  _handlePreferenceChange(
                    context,
                    UpdatePreferencesDTO(useIcons: newSelection.first),
                  );
                }
              },
            ),
          ),

          /// COMMENTED OUT FOR DEMO UNTIL IMPLEMENTED /////////////////////////////////////////////
          // DTInputDecorator.withHelp(
          //   label: translation.CONTRAST,
          //   helpContent: Text(translation.CONTRAST_EXPLANATION, style: dt.bodySecondary),
          //   child: DTSegmentedButton<ContrastMode>(
          //     selected: {selectedContrastMode},
          //     segments: [
          //       ButtonSegment(value: ContrastMode.auto, label: Text(translation.AUTO)),
          //       ButtonSegment(value: ContrastMode.normal, label: Text(translation.NORMAL)),
          //       ButtonSegment(value: ContrastMode.high, label: Text(translation.HIGH)),
          //     ],
          //     onSelectionChanged: (newSelection) {
          //       if (newSelection.isNotEmpty) {
          //         _handlePreferenceChange(
          //           context,
          //           UpdatePreferencesDTO(contrast: newSelection.first),
          //         );
          //       }
          //     },
          //   ),
          // ),
          /// /////////////////////////////////////////////////////////////////////////////////////
          DTInputDecorator.withHelp(
            label: translation.FONT_SIZE,
            helpContent: Text(translation.FONT_SIZE_EXPLANATION, style: dt.bodySecondary),
            child: StatefulBuilder(
              builder: (context, setState) {
                final initialIndex = fontSizeToIndex(selectedFontSize);
                int tempIndex = initialIndex;
                return Container(
                  decoration: BoxDecoration(
                    color: CoporColors.of(context).surfaceContainer,
                    borderRadius: BorderRadius.circular(5),
                  ),
                  child: SliderTheme(
                    data: SliderTheme.of(
                      context,
                    ).copyWith(tickMarkShape: const RoundSliderTickMarkShape(tickMarkRadius: 3)),
                    child: Slider(
                      max: (allowedSizes.length - 1).toDouble(),
                      divisions: allowedSizes.length - 1,
                      value: tempIndex.toDouble(),
                      onChanged: (value) => setState(() => tempIndex = value.round()),
                      onChangeEnd: (value) {
                        final chosenEnum = allowedSizes[value.round()];
                        _handlePreferenceChange(
                          context,
                          UpdatePreferencesDTO(fontSize: chosenEnum),
                        );
                      },
                    ),
                  ),
                );
              },
            ),
          ),
          DTInputDecorator.withHelp(
            label: translation.FONT_WEIGHT,
            helpContent: Text(translation.FONT_WEIGHT_EXPLANATION, style: dt.bodySecondary),
            child: DTSegmentedButton<AppFontWeight>(
              selected: {selectedFontWeight},
              segments: [
                ButtonSegment(value: AppFontWeight.light, label: Text(translation.LIGHT_FONT)),
                ButtonSegment(value: AppFontWeight.normal, label: Text(translation.NORMAL)),
                ButtonSegment(value: AppFontWeight.bold, label: Text(translation.BOLD)),
              ],
              onSelectionChanged: (newSelection) {
                if (newSelection.isNotEmpty) {
                  _handlePreferenceChange(
                    context,
                    UpdatePreferencesDTO(fontWeight: newSelection.first),
                  );
                }
              },
            ),
          ),
          DTInputDecorator.withHelp(
            label: translation.POP_UP_MESSAGE_DURATION,
            helpContent: Text(
              translation.POP_UP_MESSAGE_DURATION_EXPLANATION,
              style: dt.bodySecondary,
            ),
            child: DTSegmentedButton<ActionFeedbackDuration>(
              selected: {selectedActionFeedbackDuration},
              segments: [
                ButtonSegment(value: ActionFeedbackDuration.off, label: Text(translation.OFF)),
                ButtonSegment(value: ActionFeedbackDuration.fiveSeconds, label: const Text('5s')),
                ButtonSegment(
                  value: ActionFeedbackDuration.twentySeconds,
                  label: const Text('20s'),
                ),
              ],
              onSelectionChanged: (newSelection) {
                if (newSelection.isNotEmpty) {
                  _handlePreferenceChange(
                    context,
                    UpdatePreferencesDTO(actionFeedbackDuration: newSelection.first),
                  );
                }
              },
            ),
          ),
          DTInputDecorator.withHelp(
            label: translation.RESET_USER_INTERFACE,
            helpContent: Text(translation.RESET_UI_EXPLANATION, style: dt.bodySecondary),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: DTButton.surface(
                onPressed: () => _handleResetUIButtonClicked(context),
                label: translation.RESET_USER_INTERFACE,
              ),
            ),
          ),
          const SizedBox(height: 10),
        ],
      ),
    );
  }
}
