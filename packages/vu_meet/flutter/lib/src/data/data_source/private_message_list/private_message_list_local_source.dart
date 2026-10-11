import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_vu_meet/src/data/model/private_message_list/private_message_list_model.dart';
import 'package:copor_core/src/utils/typedef.dart';

abstract class PrivateMessageListLocalDataSource {
  Future<List<PrivateMessageListItemModel>> getPrivateMessageList();
  Future<void> setPrivateMessageList(List<PrivateMessageListItemModel> model);
}

class PrivateMessageListLocalDataSourceImpl
    extends BaseListLocalDataSource<PrivateMessageListItemModel>
    implements PrivateMessageListLocalDataSource {
  PrivateMessageListLocalDataSourceImpl({
    required super.sharedPreferences,
    required super.keyGenerator,
  });

  @override
  Future<List<PrivateMessageListItemModel>> getPrivateMessageList() async {
    return await getData(PrivateMessageListItemModel.namespaceStatic, null);
  }

  @override
  Future<void> setPrivateMessageList(
    List<PrivateMessageListItemModel> privateMessageListModel,
  ) async {
    return await saveData(privateMessageListModel, null);
  }

  @override
  PrivateMessageListItemModel fromJsonSingle(JSON json) {
    return PrivateMessageListItemModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(PrivateMessageListItemModel model) {
    return model.toJson();
  }
}
