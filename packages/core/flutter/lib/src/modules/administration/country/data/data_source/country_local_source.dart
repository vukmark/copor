import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/administration/country/data/model/country_model.dart';
import 'package:copor_core/src/modules/administration/country/data/repository/country_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class CountryLocalDataSourceImpl extends BaseListLocalDataSource<CountryModel>
    implements CountryLocalDataSource {
  CountryLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<CountryModel>> getCountryList() async {
    return await getData(CountryModel.namespaceStatic, null);
  }

  @override
  Future<List<CountryModel>> getCountryPublicList() async {
    return await getData(CountryModel.namespaceStatic, null);
  }

  @override
  Future<void> setCountryList(List<CountryModel> countryModel) async {
    return await saveData(countryModel, null);
  }

  @override
  CountryModel fromJsonSingle(Map<String, dynamic> json) {
    return CountryModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(CountryModel model) {
    return model.toJson();
  }
}
