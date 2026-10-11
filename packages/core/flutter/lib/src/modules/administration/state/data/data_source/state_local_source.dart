import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:copor_core/src/modules/administration/state/data/repository/state_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class StateLocalDataSourceImpl extends BaseListLocalDataSource<StateModel>
    implements StateLocalDataSource {
  StateLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<StateModel>> getStateList() async {
    return await getData(StateModel.namespaceStatic, null);
  }

  @override
  Future<void> setStateList(List<StateModel> stateListModel) async {
    return await saveData(stateListModel, null);
  }

  @override
  StateModel fromJsonSingle(JSON json) {
    return StateModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(StateModel model) {
    return model.toJson();
  }
}
