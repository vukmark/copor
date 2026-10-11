import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/presentation/contact_list/contact_list.dart';
import 'package:copor_contacts/src/presentation/contact_details/contact_details_screen.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class ContactsDesktopScreen extends StatelessWidget {
  final ContactPageTranslation translation;
  final String? contactId;

  const ContactsDesktopScreen({super.key, required this.translation, this.contactId});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        ConstrainedBox(
          constraints: const BoxConstraints(minWidth: 220, maxWidth: 340),
          child: ContactListScreen(translation: translation, selectedContactId: contactId),
        ),
        Container(width: 1, color: CoporColors.of(context).outlineSubtle),
        Expanded(
          child: contactId == null
              ? Center(
                  child: DTEmptyState(icon: DTIcons.user, title: translation.SELECT_CONTACT),
                )
              : ContactDetailsScreen(
                  key: ValueKey(contactId),
                  translation: translation,
                  contactId: contactId!,
                ),
        ),
      ],
    );
  }
}
