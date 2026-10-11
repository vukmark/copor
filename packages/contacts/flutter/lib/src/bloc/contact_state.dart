import 'package:copor_core/src/error/failure.dart';
import 'package:copor_contacts/src/data/model/contact_list_item_model.dart';
import 'package:copor_contacts/src/data/model/contact_model.dart';
import 'package:equatable/equatable.dart';

class ContactState extends Equatable {
  /// `null` until the first list request completes.
  final List<ContactListItemModel>? contacts;
  final ContactModel? selectedContact;
  final Map<String, ContactModel> detailCache;
  final String? vCard;
  final String searchQuery;
  final bool isListLoading;
  final bool isDetailLoading;
  final bool isPaginating;
  final bool hasMore;
  final Failure? listFailure;
  final Failure? detailFailure;

  const ContactState({
    this.contacts,
    this.selectedContact,
    this.detailCache = const {},
    this.vCard,
    this.searchQuery = '',
    this.isListLoading = false,
    this.isDetailLoading = false,
    this.isPaginating = false,
    this.hasMore = true,
    this.listFailure,
    this.detailFailure,
  });

  factory ContactState.initial() => const ContactState();

  ContactState copyWith({
    List<ContactListItemModel>? contacts,
    ContactModel? Function()? selectedContact,
    Map<String, ContactModel>? detailCache,
    String? Function()? vCard,
    String? searchQuery,
    bool? isListLoading,
    bool? isDetailLoading,
    bool? isPaginating,
    bool? hasMore,
    Failure? Function()? listFailure,
    Failure? Function()? detailFailure,
  }) {
    return ContactState(
      contacts: contacts ?? this.contacts,
      selectedContact: selectedContact != null ? selectedContact() : this.selectedContact,
      detailCache: detailCache ?? this.detailCache,
      vCard: vCard != null ? vCard() : this.vCard,
      searchQuery: searchQuery ?? this.searchQuery,
      isListLoading: isListLoading ?? this.isListLoading,
      isDetailLoading: isDetailLoading ?? this.isDetailLoading,
      isPaginating: isPaginating ?? this.isPaginating,
      hasMore: hasMore ?? this.hasMore,
      listFailure: listFailure != null ? listFailure() : this.listFailure,
      detailFailure: detailFailure != null ? detailFailure() : this.detailFailure,
    );
  }

  List<ContactListItemModel> get contactList => contacts ?? const [];

  bool get hasLoadedContacts => contacts != null;

  bool get hasData => contactList.isNotEmpty;

  String? effectiveContactId(String? contactId) {
    if (contactId == null) return null;
    return contactList.any((c) => c.id == contactId) ? contactId : null;
  }

  @override
  List<Object?> get props => [
    contacts,
    selectedContact,
    detailCache,
    vCard,
    searchQuery,
    isListLoading,
    isDetailLoading,
    isPaginating,
    hasMore,
    listFailure,
    detailFailure,
  ];
}
