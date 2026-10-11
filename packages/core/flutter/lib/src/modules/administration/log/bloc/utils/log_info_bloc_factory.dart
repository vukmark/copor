import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_event.dart';

class LogInfoBlocFactory {
  static LogInfoBloc initializeLogInfoBloc(String id) {
    final logInfoBloc = getIt<LogInfoBloc>();
    logInfoBloc.add(GetLogInfo('/log/info/$id'));

    return logInfoBloc;
  }
}
