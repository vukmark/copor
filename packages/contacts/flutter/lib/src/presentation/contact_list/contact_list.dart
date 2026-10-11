import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_contacts/src/bloc/contact_bloc.dart';
import 'package:copor_contacts/src/bloc/contact_event.dart';
import 'package:copor_contacts/src/bloc/contact_state.dart';
import 'package:copor_contacts/src/config/contact_navigation.dart';
import 'package:copor_contacts/src/data/model/contact_list_item_model.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/presentation/contact_list/contact_list_item.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

const _kContactItemExtent = 70.0;

class ContactListScreen extends StatefulWidget {
  final ContactPageTranslation translation;
  final String? selectedContactId;

  const ContactListScreen({super.key, required this.translation, this.selectedContactId});

  @override
  State<ContactListScreen> createState() => _ContactListScreenState();
}

class _ContactListScreenState extends State<ContactListScreen> {
  late final TextEditingController _searchController;

  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 12, right: 12),
          child: DTSearchBar(
            key: const ValueKey('contacts_search_bar'),
            title: widget.translation.SEARCH_CONTACT,
            controller: _searchController,
            onSearchChanged: (query) {
              context.read<ContactBloc>().add(SearchContacts(query));
            },
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: BlocBuilder<ContactBloc, ContactState>(
            buildWhen: (prev, curr) =>
                prev.contacts != curr.contacts ||
                prev.isListLoading != curr.isListLoading ||
                prev.isPaginating != curr.isPaginating,
            builder: (context, state) {
              final contacts = state.contactList;

              if (!state.hasLoadedContacts) {
                return const Center(child: DTRingLoader());
              }

              if (contacts.isEmpty) {
                return Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: DTEmptyState(
                      icon: DTIcons.noResults,
                      title: widget.translation.NO_CONTACTS_FOUND,
                    ),
                  ),
                );
              }

              return NotificationListener<ScrollNotification>(
                onNotification: (notification) {
                  if (notification is! ScrollUpdateNotification) return false;

                  final pixels = notification.metrics.pixels;
                  final maxExtent = notification.metrics.maxScrollExtent;

                  if (pixels >= maxExtent - 10) {
                    context.read<ContactBloc>().add(const LoadMoreContacts());
                  }
                  return false;
                },
                child: ListView.builder(
                  key: const PageStorageKey('contacts_list_scroll'),
                  padding: const EdgeInsets.only(top: 10, bottom: 80),
                  itemExtent: _kContactItemExtent,
                  itemCount: contacts.length,
                  itemBuilder: (context, index) => _buildContactItem(context, contacts[index]),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildContactItem(BuildContext context, ContactListItemModel contact) {
    return ContactListItemWidget(
      key: ValueKey(contact.id),
      userId: contact.id,
      fullName: contact.fullName,
      imageUrl: contact.picture,
      isSelected: contact.id == widget.selectedContactId,
      isActive: contact.isActive,
      onTap: () {
        goToPage(ContactNavigation.getContactDetailsRoute(contact.id));
      },
    );
  }
}
