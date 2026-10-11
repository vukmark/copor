import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/administration/log/data/model/log_model.dart';
import 'package:copor_core/src/modules/administration/log/data/repository/log_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class LogLocalDataSourceImpl extends BaseListLocalDataSource<LogModel>
    implements LogLocalDataSource {
  LogLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<LogModel>> getLogList() async {
    return await getData(LogModel.namespaceStatic, null);
  }

  @override
  Future<void> setLogList(List<LogModel> logModel) async {
    return await saveData(logModel, null);
  }

  @override
  LogModel fromJsonSingle(Map<String, dynamic> json) {
    return LogModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(LogModel model) {
    return model.toJson();
  }
}
