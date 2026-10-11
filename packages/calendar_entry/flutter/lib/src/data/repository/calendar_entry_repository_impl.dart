import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_calendar_entry/src/data/model/calendar_entry_model.dart';
import 'package:copor_calendar_entry/src/data/model/save_calendar_entry_dto.dart';
import 'package:copor_calendar_entry/src/data/repository/calendar_entry_repository.dart';

class CalendarEntryRepositoryImpl extends BaseRepository implements CalendarEntryRepository {
  final CalendarEntryRemoteDataSource remoteDataSource;

  CalendarEntryRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<CalendarEntryModel>>>> getCalendarEntryList(
    String userId,
  ) async {
    return performOperationAndMapToResult<List<CalendarEntryModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<CalendarEntryModel>>(() async {
          return await remoteDataSource.getCalendarEntryList(userId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> createCalendarEntry(
    SaveCalendarEntryDTO entryToCreate,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.createCalendarEntry(entryToCreate);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> updateCalendarEntry(
    SaveCalendarEntryDTO entryToUpdate,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateCalendarEntry(entryToUpdate);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteCalendarEntry(String entryId) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteCalendarEntry(entryId);
        });
      },
    );
  }
}
