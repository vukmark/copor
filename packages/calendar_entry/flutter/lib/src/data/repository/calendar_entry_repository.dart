import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_calendar_entry/src/data/model/calendar_entry_model.dart';
import 'package:copor_calendar_entry/src/data/model/save_calendar_entry_dto.dart';

abstract class CalendarEntryRepository {
  Future<Either<Failure, Result<List<CalendarEntryModel>>>> getCalendarEntryList(String userId);
  Future<Either<Failure, Result<void>>> createCalendarEntry(SaveCalendarEntryDTO entryToCreate);
  Future<Either<Failure, Result<void>>> updateCalendarEntry(SaveCalendarEntryDTO entryToUpdate);
  Future<Either<Failure, Result<void>>> deleteCalendarEntry(String entryId);
}

abstract class CalendarEntryRemoteDataSource {
  Future<List<CalendarEntryModel>> getCalendarEntryList(String userId);
  Future<void> createCalendarEntry(SaveCalendarEntryDTO entryToCreate);
  Future<void> updateCalendarEntry(SaveCalendarEntryDTO entryToUpdate);
  Future<void> deleteCalendarEntry(String entryId);
}
