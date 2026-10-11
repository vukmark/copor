import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_core/src/utils/typedef.dart';

abstract class ChatListLocalDataSource {
  Future<List<ChatListItemModel>> getChatList();

  Future<void> setChatList(List<ChatListItemModel> model);

  Future<void> clear();
}

class ChatListLocalDataSourceImpl extends BaseListLocalDataSource<ChatListItemModel>
    implements ChatListLocalDataSource {
  ChatListLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<ChatListItemModel>> getChatList() async {
    try {
      return await getData(ChatListItemModel.namespaceStatic, null);
    } on CacheNotFoundException {
      rethrow;
    } catch (_) {
      await clear();
      throw CacheNotFoundException(ChatListItemModel.namespaceStatic, null);
    }
  }

  @override
  Future<void> clear() async {
    await clearLocalData(ChatListItemModel.namespaceStatic, null);
  }

  @override
  Future<void> setChatList(List<ChatListItemModel> chatListModel) async {
    return await saveData(chatListModel, null);
  }

  @override
  ChatListItemModel fromJsonSingle(JSON json) {
    return ChatListItemModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(ChatListItemModel model) {
    return model.toJson();
  }
}
