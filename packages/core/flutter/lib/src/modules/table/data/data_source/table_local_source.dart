import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import 'package:copor_core/src/modules/table/data/repository/table_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class TableLocalDataSourceImpl extends BaseLocalDataSource<CoporTableModel>
    implements TableLocalDataSource {
  TableLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<CoporTableModel> getTable() async {
    return await getData(CoporTableModel.namespaceStatic, null);
  }

  @override
  CoporTableModel fromJson(Map<String, dynamic> json) {
    return CoporTableModel.fromJson(json);
  }

  @override
  JSON toJson(CoporTableModel model) {
    return model.toJson();
  }
}
