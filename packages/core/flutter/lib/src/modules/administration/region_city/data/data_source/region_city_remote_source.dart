import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/region_city/data/model/region_city_list_response.dart';
import 'package:copor_core/src/modules/administration/region_city/data/repository/region_city_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'region_city_remote_source.g.dart';

@RestApi()
abstract class RegionCityRemoteDataSourceImpl implements RegionCityRemoteDataSource {
  factory RegionCityRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _RegionCityRemoteDataSourceImpl;

  @override
  @POST('/region-city/list')
  @Extra({'doesNotRequireAuth': true})
  Future<RegionCityListResponse> getRegionCityList(@Body() FilterListDTO filterList);
}
