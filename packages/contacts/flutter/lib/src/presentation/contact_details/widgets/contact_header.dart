import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_contacts/src/data/model/contact_model.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:flutter/material.dart';

class ContactHeader extends StatelessWidget {
  final ContactModel contact;
  final ContactPageTranslation translation;
  final VoidCallback? onQrPressed;

  const ContactHeader({
    super.key,
    required this.contact,
    required this.translation,
    this.onQrPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        PresenceAvatar(
          userId: contact.id,
          userFullName: contact.fullName,
          picture: contact.picture,
          radius: 64.0,
        ),
        const SizedBox(height: 16.0),
        _buildContactTitle(context),
        _buildContactSubtitle(context),
      ],
    );
  }

  Widget _buildContactTitle(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Flexible(
          child: Text(
            getFullNameWithStatus(contact.fullName, contact.isActive),
            style: CoporTheme.of(context).text.sectionTitle,
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        if (onQrPressed != null) ...[
          const SizedBox(width: 8),
          IconButton(
            icon: Semantics(
              label: translation.QRCODE_VCARD,
              child: const Icon(PhosphorIconsThin.qrCode),
            ),
            onPressed: onQrPressed,
          ),
        ],
      ],
    );
  }

  Widget _buildContactSubtitle(BuildContext context) {
    if (contact.jobTitle == null || contact.jobTitle!.isEmpty) {
      return const SizedBox.shrink();
    }

    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        contact.jobTitle!,
        style: CoporTheme.of(context).text.bodySecondary,
        textAlign: TextAlign.center,
      ),
    );
  }
}
