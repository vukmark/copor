import 'package:copor_calendar_entry/src/bloc/calendar_entry_list/calendar_entry_list_event.dart';
import 'package:copor_calendar_entry/src/bloc/calendar_entry_list/calendar_entry_list_state.dart';
import 'package:copor_calendar_entry/src/data/repository/calendar_entry_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CalendarEntryListBloc extends Bloc<CalendarEntryListEvent, CalendarEntryListState> {
  final CalendarEntryRepository _calendarEntryRepository;

  CalendarEntryListBloc({required CalendarEntryRepository calendarEntryRepository})
    : _calendarEntryRepository = calendarEntryRepository,
      super(const CalendarEntryListState.initial()) {
    on<GetCalendarEntryList>(_onGetCalendarEntryList);
    on<CreateCalendarEntry>(_onCreateCalendarEntry);
    on<UpdateCalendarEntry>(_onUpdateCalendarEntry);
    on<DeleteCalendarEntry>(_onDeleteCalendarEntry);
  }

  Future<void> _onGetCalendarEntryList(
    GetCalendarEntryList event,
    Emitter<CalendarEntryListState> emit,
  ) async {
    emit(
      state.copyWith(
        isLoading: true,
        isDeleted: false,
        isUpdated: false,
        userId: event.userId,
      ),
    );

    final result = await _calendarEntryRepository.getCalendarEntryList(event.userId);
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (success) => emit(state.copyWith(result: success, isLoading: false)),
    );
  }

  Future<void> _onCreateCalendarEntry(
    CreateCalendarEntry event,
    Emitter<CalendarEntryListState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isUpdated: false, isDeleted: false));

    final result = await _calendarEntryRepository.createCalendarEntry(event.entryToCreate);
    await result.fold(
      (failure) async => emit(state.copyWith(failure: failure, isLoading: false)),
      (_) => _refresh(emit, isUpdated: true),
    );
  }

  Future<void> _onUpdateCalendarEntry(
    UpdateCalendarEntry event,
    Emitter<CalendarEntryListState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isUpdated: false, isDeleted: false));

    final result = await _calendarEntryRepository.updateCalendarEntry(event.entryToUpdate);
    await result.fold(
      (failure) async => emit(state.copyWith(failure: failure, isLoading: false)),
      (_) => _refresh(emit, isUpdated: true),
    );
  }

  Future<void> _onDeleteCalendarEntry(
    DeleteCalendarEntry event,
    Emitter<CalendarEntryListState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isUpdated: false, isDeleted: false));

    final result = await _calendarEntryRepository.deleteCalendarEntry(event.entryId);
    await result.fold(
      (failure) async => emit(state.copyWith(failure: failure, isLoading: false)),
      (_) => _refresh(emit, isDeleted: true),
    );
  }

  /// The write endpoints return no body, so the list is re-read to pick up server-assigned ids
  /// before the calendar rebuilds.
  Future<void> _refresh(
    Emitter<CalendarEntryListState> emit, {
    bool isUpdated = false,
    bool isDeleted = false,
  }) async {
    final userId = state.userId;

    if (userId == null) {
      emit(state.copyWith(isLoading: false, isUpdated: isUpdated, isDeleted: isDeleted));
      return;
    }

    final result = await _calendarEntryRepository.getCalendarEntryList(userId);
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (success) => emit(
        state.copyWith(
          result: success,
          isLoading: false,
          isUpdated: isUpdated,
          isDeleted: isDeleted,
        ),
      ),
    );
  }
}
