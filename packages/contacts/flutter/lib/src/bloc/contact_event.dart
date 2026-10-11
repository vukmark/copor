import 'package:equatable/equatable.dart';

sealed class ContactEvent extends Equatable {
  const ContactEvent();

  @override
  List<Object?> get props => [];
}

class LoadContacts extends ContactEvent {
  const LoadContacts();
}

class SearchContacts extends ContactEvent {
  final String query;

  const SearchContacts(this.query);

  @override
  List<Object?> get props => [query];
}

class LoadMoreContacts extends ContactEvent {
  const LoadMoreContacts();
}

class EnsureContactsLoaded extends ContactEvent {
  const EnsureContactsLoaded();
}

class LoadContactDetails extends ContactEvent {
  final String contactId;

  const LoadContactDetails(this.contactId);

  @override
  List<Object?> get props => [contactId];
}

class ClearContactDetails extends ContactEvent {
  const ClearContactDetails();
}
