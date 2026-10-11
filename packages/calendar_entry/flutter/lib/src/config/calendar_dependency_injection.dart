import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_calendar_entry/src/bloc/calendar_entry_list/calendar_entry_list_bloc.dart';
import 'package:copor_calendar_entry/src/data/data_source/calendar_entry_remote_source.dart';
import 'package:copor_calendar_entry/src/data/repository/calendar_entry_repository.dart';
import 'package:copor_calendar_entry/src/data/repository/calendar_entry_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  getIt.registerLazySingleton<CalendarEntryRemoteDataSource>(
    () => CalendarEntryRemoteDataSourceImpl(getIt<Dio>()),
  );

  getIt.registerLazySingleton<CalendarEntryRepository>(
    () => CalendarEntryRepositoryImpl(
      remoteDataSource: getIt<CalendarEntryRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );

  getIt.registerFactory<CalendarEntryListBloc>(
    () => CalendarEntryListBloc(calendarEntryRepository: getIt<CalendarEntryRepository>()),
  );
}
