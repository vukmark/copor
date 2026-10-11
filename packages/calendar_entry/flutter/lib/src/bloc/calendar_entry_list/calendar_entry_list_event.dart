import 'package:copor_calendar_entry/src/data/model/save_calendar_entry_dto.dart';
import 'package:equatable/equatable.dart';

sealed class CalendarEntryListEvent extends Equatable {
  const CalendarEntryListEvent();

  @override
  List<Object?> get props => [];
}

class GetCalendarEntryList extends CalendarEntryListEvent {
  final String userId;
  const GetCalendarEntryList(this.userId);

  @override
  List<Object?> get props => [userId];
}

class CreateCalendarEntry extends CalendarEntryListEvent {
  final SaveCalendarEntryDTO entryToCreate;
  const CreateCalendarEntry(this.entryToCreate);

  @override
  List<Object?> get props => [entryToCreate];
}

class UpdateCalendarEntry extends CalendarEntryListEvent {
  final SaveCalendarEntryDTO entryToUpdate;
  const UpdateCalendarEntry(this.entryToUpdate);

  @override
  List<Object?> get props => [entryToUpdate];
}

class DeleteCalendarEntry extends CalendarEntryListEvent {
  final String entryId;
  const DeleteCalendarEntry(this.entryId);

  @override
  List<Object?> get props => [entryId];
}
