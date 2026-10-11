import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/country/data/model/country_model.dart';
import 'package:copor_core/src/modules/administration/country/data/model/create_country_dto.dart';
import 'package:copor_core/src/modules/administration/country/data/repository/country_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'country_remote_source.g.dart';

@RestApi()
abstract class CountryRemoteDataSourceImpl implements CountryRemoteDataSource {
  factory CountryRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _CountryRemoteDataSourceImpl;

  @override
  @POST('/country/list')
  Future<List<CountryModel>> getCountryList(@Body() FilterListDTO filterList);

  @override
  @GET('/refdata/country/')
  @Extra({'doesNotRequireAuth': true})
  Future<List<CountryModel>> getCountryPublicList();

  @override
  @GET('/country/{id}')
  Future<CountryModel> getCountry(@Path('id') String countryId);

  @override
  @DELETE('/country/{id}')
  Future<void> deleteCountry(@Path('id') String countryId);

  @override
  @PATCH('/country')
  Future<void> updateCountry(@Body() CreateCountryDTO countryToUpdate);

  @override
  @POST('/country')
  Future<void> createCountry(@Body() CreateCountryDTO countryToCreate);
}
