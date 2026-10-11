import 'package:copor_contacts/src/bloc/contact_bloc.dart';
import 'package:copor_contacts/src/bloc/contact_event.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/presentation/contact_list/contact_list.dart';
import 'package:copor_contacts/src/presentation/contact_details/contact_details_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ContactsMobileScreen extends StatelessWidget {
  final ContactPageTranslation translation;
  final String? contactId;

  const ContactsMobileScreen({super.key, required this.translation, this.contactId});

  @override
  Widget build(BuildContext context) {
    if (contactId == null) {
      return ContactListScreen(translation: translation, selectedContactId: contactId);
    }

    return PopScope(
      onPopInvokedWithResult: (didPop, result) {
        if (didPop) {
          context.read<ContactBloc>().add(const ClearContactDetails());
        }
      },
      child: ContactDetailsScreen(
        key: ValueKey(contactId),
        translation: translation,
        contactId: contactId!,
      ),
    );
  }
}
