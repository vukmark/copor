import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_history.dart';
import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/utils/typedef.dart';

abstract class NavigationHistoryLocalSource {
  Future<List<NavigationHistoryModel>> getHistory();
  Future<void> saveHistory(List<NavigationHistoryModel> navigationHistoryList);
}

class NavigationHistoryLocalDataSourceImpl extends BaseListLocalDataSource<NavigationHistoryModel>
    implements NavigationHistoryLocalSource {
  NavigationHistoryLocalDataSourceImpl({
    required super.sharedPreferences,
    required super.keyGenerator,
  });

  @override
  NavigationHistoryModel fromJsonSingle(Map<String, dynamic> json) {
    return NavigationHistoryModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(NavigationHistoryModel model) {
    return model.toJson();
  }

  @override
  Future<List<NavigationHistoryModel>> getHistory() async {
    try {
      return await getData(NavigationHistoryModel.namespaceStatic, null);
    } on CacheNotFoundException {
      return [];
    }
  }

  @override
  Future<void> saveHistory(List<NavigationHistoryModel> history) async {
    return await saveData(history, null);
  }
}
