import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_core/src/utils/typedef.dart';

abstract class VuMeetMessageLocalDataSource {
  Future<List<VuMeetMessageItemModel>> getVuMeetMessage();

  Future<void> setVuMeetMessage(List<VuMeetMessageItemModel> model);
}

class VuMeetMessageLocalDataSourceImpl extends BaseListLocalDataSource<VuMeetMessageItemModel>
    implements VuMeetMessageLocalDataSource {
  VuMeetMessageLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<VuMeetMessageItemModel>> getVuMeetMessage() async {
    return await getData(VuMeetMessageItemModel.namespaceStatic, null);
  }

  @override
  Future<void> setVuMeetMessage(List<VuMeetMessageItemModel> vuMeetMessageModel) async {
    return await saveData(vuMeetMessageModel, null);
  }

  @override
  VuMeetMessageItemModel fromJsonSingle(JSON json) {
    return VuMeetMessageItemModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(VuMeetMessageItemModel model) {
    return model.toJson();
  }
}
