import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class TagLocalDataSourceImpl extends BaseListLocalDataSource<TagModel>
    implements TagLocalDataSource {
  TagLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<TagModel>> getPublicTagList() async {
    return await getData(TagModel.namespaceStatic, null);
  }

  @override
  Future<void> setPublicTagList(List<TagModel> tagModel) async {
    return await saveData(tagModel, null);
  }

  @override
  TagModel fromJsonSingle(Map<String, dynamic> json) {
    return TagModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(TagModel model) {
    return model.toJson();
  }
}
