import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_contacts/src/bloc/contact_bloc.dart';
import 'package:copor_contacts/src/bloc/contact_event.dart';
import 'package:copor_contacts/src/bloc/contact_state.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/presentation/contact_page/contact_desktop_screen.dart';
import 'package:copor_contacts/src/presentation/contact_page/contact_mobile_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ContactContentView extends StatefulWidget {
  final ContactPageTranslation translation;
  final String? contactId;

  const ContactContentView({super.key, required this.translation, this.contactId});

  @override
  State<ContactContentView> createState() => _ContactContentViewState();
}

class _ContactContentViewState extends State<ContactContentView> {
  @override
  void initState() {
    super.initState();
    context.read<ContactBloc>().add(const EnsureContactsLoaded());
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ContactBloc, ContactState>(
      buildWhen: (prev, curr) => prev.contacts != curr.contacts,
      builder: (context, state) {
        final effectiveContactId = state.effectiveContactId(widget.contactId);

        return DSPageWrapper(
          isMobile: context.isMobile,
          scrollable: false,
          children: [
            Expanded(
              child: context.isMobile
                  ? ContactsMobileScreen(
                      translation: widget.translation,
                      contactId: effectiveContactId,
                    )
                  : ContactsDesktopScreen(
                      translation: widget.translation,
                      contactId: effectiveContactId,
                    ),
            ),
          ],
        );
      },
    );
  }
}
