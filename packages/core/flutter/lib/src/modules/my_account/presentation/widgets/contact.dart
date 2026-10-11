import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/utils/preferences_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class Contact extends StatelessWidget {
  final MyAccountPageTranslation translation;

  const Contact({super.key, required this.translation});

  void _handleToggleContactPrivacy(BuildContext context, bool newValue, ContactPrivacy fieldName) {
    final currentPrivacy = context.read<PreferencesBloc>().state.ensuredData.contactPrivacy;
    final currentPreferences = context.read<PreferencesBloc>().state.ensuredData;

    final updatedPrivacy = switch (fieldName) {
      ContactPrivacy.picture => currentPrivacy.copyWith(picture: newValue),
      ContactPrivacy.email => currentPrivacy.copyWith(email: newValue),
      ContactPrivacy.dateOfBirth => currentPrivacy.copyWith(dateOfBirth: newValue),
      ContactPrivacy.tenant => currentPrivacy.copyWith(tenant: newValue),
      ContactPrivacy.group => currentPrivacy.copyWith(group: newValue),
      ContactPrivacy.private => currentPrivacy.copyWith(private: newValue),
    };

    final fullUpdateDto = UpdatePreferencesDTO(
      themeMode: currentPreferences.themeMode,
      contrast: currentPreferences.contrastMode,
      contactPrivacy: updatedPrivacy,
      authentication: currentPreferences.authentication,
      language: currentPreferences.language,
      colorSet: currentPreferences.colorSet,
      fontSize: currentPreferences.fontSize,
      useIcons: currentPreferences.useIcons,
      actionFeedbackDuration: currentPreferences.actionFeedbackDuration,
      fontWeight: currentPreferences.fontWeight,
    );

    PreferencesBlocEventDispatcher.preferences.updatePreferences(
      context.read<PreferencesBloc>(),
      fullUpdateDto,
    );
  }

  @override
  Widget build(BuildContext context) {
    final dt = CoporTextStyles.of(context);
    final contactPrivacy = context.watchState.preferences.ensuredData.contactPrivacy;

    final isPictureVisibleInContacts = contactPrivacy.picture;
    final isEmailVisibleInContacts = contactPrivacy.email;
    final isDateOfBirthVisibleInContacts = contactPrivacy.dateOfBirth;
    final isTenantVisibleInVCard = contactPrivacy.tenant;
    final isGroupVisibleInVCard = contactPrivacy.group;
    final isPrivateVisibleInVCard = contactPrivacy.private;

    return DTInputDecorator(
      label: translation.CONTACT,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          DTInputDecorator.withHelp(
            label: translation.CARD,
            helpContent: Text(translation.CARD_EXPLANATION, style: dt.bodySecondary),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DTSwitchInput(
                  label: translation.PICTURE,
                  value: isPictureVisibleInContacts,
                  onChanged: (value) =>
                      _handleToggleContactPrivacy(context, value, ContactPrivacy.picture),
                ),
                DTSwitchInput(
                  label: translation.EMAIL,
                  value: isEmailVisibleInContacts,
                  onChanged: (value) =>
                      _handleToggleContactPrivacy(context, value, ContactPrivacy.email),
                ),
                DTSwitchInput(
                  label: translation.DATE_OF_BIRTH,
                  value: isDateOfBirthVisibleInContacts,
                  onChanged: (value) =>
                      _handleToggleContactPrivacy(context, value, ContactPrivacy.dateOfBirth),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          DTInputDecorator.withHelp(
            label: translation.VCARD,
            helpContent: Text(translation.VCARD_EXPLANATION, style: dt.bodySecondary),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DTSwitchInput(
                  label: translation.TENANT,
                  value: isTenantVisibleInVCard,
                  onChanged: (value) =>
                      _handleToggleContactPrivacy(context, value, ContactPrivacy.tenant),
                ),
                DTSwitchInput(
                  label: translation.GROUP,
                  value: isGroupVisibleInVCard,
                  onChanged: (value) =>
                      _handleToggleContactPrivacy(context, value, ContactPrivacy.group),
                ),
                DTSwitchInput(
                  label: translation.PRIVATE,
                  value: isPrivateVisibleInVCard,
                  onChanged: (value) =>
                      _handleToggleContactPrivacy(context, value, ContactPrivacy.private),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
        ],
      ),
    );
  }
}
