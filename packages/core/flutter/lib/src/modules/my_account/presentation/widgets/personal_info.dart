import 'package:copor_core/src/modules/my_account/presentation/edit_profile.dart';
import 'package:copor_core/src/modules/my_account/presentation/enlarge_image.dart';
import 'package:copor_core/src/utils/date_formatter.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class PersonalInfoBox extends StatelessWidget {
  final MyAccountPageTranslation translation;
  final AccountInfoModel accountInfo;

  const PersonalInfoBox({
    super.key,
    required this.translation,
    required this.accountInfo,
  });

  @override
  Widget build(BuildContext context) {
    final content = _buildContent(context);

    return DTInputDecorator.withAction(
      label: translation.PERSONAL_INFO,
      actionIcon: PhosphorIconsThin.pen,
      onAction: () => openEditProfileDialog(context, translation: translation, id: accountInfo.id),
      child: content,
    );
  }

  Widget _buildContent(BuildContext context) {
    final fullName = '${accountInfo.firstName} ${accountInfo.lastName}';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        DTEntityHeader.large(
          isActive: accountInfo.isActive,
          title:
              '${accountInfo.salutation != null ? '${accountInfo.salutation} ' : ''}'
              '${accountInfo.firstName} ${accountInfo.lastName}',
          avatar: _buildAvatar(context, fullName),
        ),
        DTDivider.subtle(height: 20),
        const SizedBox(height: 20),
        DTInlineLabelGroup(
          children: [
            if (accountInfo.address?.streetAddress != '' &&
                accountInfo.address?.streetAddress != null)
              DTInlineLabel(
                label: translation.STREET_ADDRESS,
                value: accountInfo.address?.streetAddress ?? '',
              ),
            if (accountInfo.address?.city != '' && accountInfo.address?.city != null)
              DTInlineLabel(label: translation.CITY, value: accountInfo.address?.city ?? ''),
            if (accountInfo.address?.postalCode != '' && accountInfo.address?.city != null)
              DTInlineLabel(
                label: translation.POSTAL_CODE,
                value: accountInfo.address?.postalCode ?? '',
              ),
            if (accountInfo.address?.country != null && accountInfo.address?.country.name != '')
              DTInlineLabel(
                label: translation.COUNTRY,
                value: [
                  accountInfo.address?.country.name,
                  accountInfo.address?.state?.name,
                ].whereType<String>().where((s) => s.isNotEmpty).join(', '),
              ),
            DTInlineLabel(label: translation.EMAIL, value: accountInfo.email),
            ...accountInfo.phoneNumberList
                .where((phone) => phone.phoneNumber.trim() != '')
                .map(
                  (phone) => DTInlineLabel(
                    label: getPhoneNumberTypeLabel(phone.phoneNumberType, translation),
                    value: phone.phoneNumber,
                  ),
                ),
            if (accountInfo.citizenship != null && accountInfo.citizenship != '')
              DTInlineLabel(label: translation.CITIZENSHIP, value: accountInfo.citizenship ?? ''),
            if (accountInfo.nativeLanguage != null)
              DTInlineLabel(
                label: translation.NATIVE_LANGUAGE,
                value: accountInfo.nativeLanguage!.name,
              ),
            if (accountInfo.nickName != null && accountInfo.nickName != '')
              DTInlineLabel(label: translation.NICKNAME, value: accountInfo.nickName ?? ''),
            if (accountInfo.placeOfBirth != null && accountInfo.placeOfBirth != '')
              DTInlineLabel(
                label: translation.PLACE_OF_BIRTH,
                value: accountInfo.placeOfBirth ?? '',
              ),
            if (accountInfo.dateOfBirth != null && accountInfo.dateOfBirth != '')
              DTInlineLabel(
                label: translation.DATE_OF_BIRTH,
                value: formatDisplayDateString(accountInfo.dateOfBirth!),
              ),
            if (accountInfo.contactNote != null && accountInfo.contactNote != '')
              DTInlineLabel(label: translation.USER_CONTACT_NOTES, value: accountInfo.contactNote!),
          ],
        ),
        const SizedBox(height: 10),
      ],
    );
  }

  Widget _buildAvatar(BuildContext context, String fullName) {
    return Hero(
      tag: 'avatar-${accountInfo.id}',
      child: DTAvatar(
        userFullName: fullName,
        picture: accountInfo.picture ?? '',
        radius: 60,
        onTap: () => enlargeImage(
          context,
          translation,
          _getInitials(fullName),
          accountInfo.picture ?? '',
          'avatar-${accountInfo.id}',
        ),
      ),
    );
  }

  String _getInitials(String name) {
    final parts = name.split(' ').where((part) => part.isNotEmpty).toList();
    if (parts.length > 1) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    } else if (parts.isNotEmpty) {
      return parts[0][0].toUpperCase();
    }
    return '?';
  }


}
