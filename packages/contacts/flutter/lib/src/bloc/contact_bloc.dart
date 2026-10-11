import 'dart:async';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:copor_contacts/src/bloc/contact_event.dart';
import 'package:copor_contacts/src/bloc/contact_state.dart';
import 'package:copor_contacts/src/data/model/contact_model.dart';
import 'package:copor_contacts/src/data/repository/contact_repository.dart';
import 'package:copor_contacts/src/utils/vcard_utils.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rxdart/rxdart.dart';

class ContactBloc extends Bloc<ContactEvent, ContactState> {
  static const int _pageSize = 20;
  final ContactRepository _repo;

  ContactBloc(this._repo) : super(ContactState.initial()) {
    on<LoadContacts>(_onLoadContacts);
    on<SearchContacts>(_onSearchContacts, transformer: _debounceTransformer());
    on<LoadMoreContacts>(_onLoadMoreContacts, transformer: droppable());
    on<EnsureContactsLoaded>(_onEnsureLoaded);
    on<LoadContactDetails>(_onLoadDetails);
    on<ClearContactDetails>(_onClear);
  }

  Future<void> _onLoadContacts(LoadContacts event, Emitter<ContactState> emit) async {
    emit(state.copyWith(isListLoading: true, searchQuery: '', listFailure: () => null));
    await _fetchAndReplaceContacts('', emit);
  }

  Future<void> _onSearchContacts(SearchContacts event, Emitter<ContactState> emit) async {
    emit(state.copyWith(isListLoading: true, searchQuery: event.query, listFailure: () => null));
    await _fetchAndReplaceContacts(event.query, emit);
  }

  Future<void> _onLoadMoreContacts(LoadMoreContacts event, Emitter<ContactState> emit) async {
    if (!state.hasMore || state.isPaginating) return;

    emit(state.copyWith(isPaginating: true));

    final currentItems = state.contactList;
    final response = await _repo.searchContacts(state.searchQuery, offset: currentItems.length);

    response.fold(
      (failure) => emit(state.copyWith(isPaginating: false, listFailure: () => failure)),
      (result) => emit(
        state.copyWith(
          contacts: [...currentItems, ...result.data],
          isPaginating: false,
          hasMore: result.data.length >= _pageSize,
        ),
      ),
    );
  }

  Future<void> _onEnsureLoaded(EnsureContactsLoaded event, Emitter<ContactState> emit) async {
    if (state.hasData) return;
    add(const LoadContacts());
  }

  Future<void> _onLoadDetails(LoadContactDetails event, Emitter<ContactState> emit) async {
    final id = event.contactId;

    if (state.selectedContact?.id == id) return;

    if (state.detailCache.containsKey(id)) {
      final cached = state.detailCache[id]!;
      emit(
        state.copyWith(
          selectedContact: () => cached,
          vCard: () => VCardUtils.generateVCard(cached),
          isDetailLoading: false,
          detailFailure: () => null,
        ),
      );
      return;
    }

    emit(
      state.copyWith(
        isDetailLoading: true,
        selectedContact: () => null,
        vCard: () => null,
        detailFailure: () => null,
      ),
    );

    final response = await _repo.getContactDetails(id);

    response.fold(
      (failure) => emit(state.copyWith(isDetailLoading: false, detailFailure: () => failure)),
      (result) {
        final updatedCache = Map<String, ContactModel>.from(state.detailCache)
          ..[result.data.id] = result.data;
        emit(
          state.copyWith(
            selectedContact: () => result.data,
            detailCache: updatedCache,
            vCard: () => VCardUtils.generateVCard(result.data),
            isDetailLoading: false,
            detailFailure: () => null,
          ),
        );
      },
    );
  }

  void _onClear(ClearContactDetails event, Emitter<ContactState> emit) {
    emit(
      state.copyWith(
        selectedContact: () => null,
        vCard: () => null,
        isDetailLoading: false,
        detailFailure: () => null,
      ),
    );
  }

  Future<void> _fetchAndReplaceContacts(String query, Emitter<ContactState> emit) async {
    final response = await _repo.searchContacts(query, offset: 0);
    response.fold(
      (failure) => emit(state.copyWith(isListLoading: false, listFailure: () => failure)),
      (result) => emit(
        state.copyWith(
          contacts: result.data,
          isListLoading: false,
          hasMore: result.data.length >= _pageSize,
          listFailure: () => null,
        ),
      ),
    );
  }

  EventTransformer<T> _debounceTransformer<T>() {
    return (events, mapper) =>
        events.debounceTime(const Duration(milliseconds: 300)).switchMap(mapper);
  }
}
