import 'package:copor_calendar_entry/src/data/model/calendar_entry_model.dart';
import 'package:copor_calendar_entry/src/data/model/save_calendar_entry_dto.dart';
import 'package:copor_calendar_entry/src/data/repository/calendar_entry_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'calendar_entry_remote_source.g.dart';

@RestApi()
abstract class CalendarEntryRemoteDataSourceImpl implements CalendarEntryRemoteDataSource {
  factory CalendarEntryRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _CalendarEntryRemoteDataSourceImpl;

  @override
  @GET('/calendar-entry/list/{userId}')
  Future<List<CalendarEntryModel>> getCalendarEntryList(@Path('userId') String userId);

  @override
  @POST('/calendar-entry')
  Future<void> createCalendarEntry(@Body() SaveCalendarEntryDTO entryToCreate);

  @override
  @PATCH('/calendar-entry')
  Future<void> updateCalendarEntry(@Body() SaveCalendarEntryDTO entryToUpdate);

  @override
  @DELETE('/calendar-entry/{id}')
  Future<void> deleteCalendarEntry(@Path('id') String entryId);
}
