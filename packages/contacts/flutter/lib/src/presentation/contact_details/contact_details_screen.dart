import 'package:copor_contacts/src/bloc/contact_bloc.dart';
import 'package:copor_contacts/src/bloc/contact_event.dart';
import 'package:copor_contacts/src/bloc/contact_state.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/presentation/contact_details/widgets/contact_header.dart';
import 'package:copor_contacts/src/presentation/contact_details/widgets/contact_info_cards.dart';
import 'package:copor_contacts/src/presentation/contact_details/widgets/vcard_dialog.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ContactDetailsScreen extends StatelessWidget {
  final String contactId;
  final ContactPageTranslation translation;

  const ContactDetailsScreen({super.key, required this.contactId, required this.translation});

  @override
  Widget build(BuildContext context) {
    context.read<ContactBloc>().add(LoadContactDetails(contactId));

    return BlocBuilder<ContactBloc, ContactState>(
      buildWhen: (prev, curr) =>
          prev.selectedContact != curr.selectedContact ||
          prev.isDetailLoading != curr.isDetailLoading ||
          prev.detailFailure != curr.detailFailure ||
          prev.vCard != curr.vCard,
      builder: (context, state) {
        if (state.selectedContact == null) {
          return const Center(child: DTRingLoader());
        }

        final contactDetails = state.selectedContact!;
        final vCard = state.vCard;

        return SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Center(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 24.0),
                ContactHeader(
                  contact: contactDetails,
                  translation: translation,
                  onQrPressed: () {
                    if (vCard != null) {
                      openWebDialog(context, contactDetails, vCard, translation);
                    }
                  },
                ),
                const SizedBox(height: 24.0),
                ContactInfoCards(contact: contactDetails, translation: translation),
                const SizedBox(height: 30.0),
              ],
            ),
          ),
        );
      },
    );
  }
}
