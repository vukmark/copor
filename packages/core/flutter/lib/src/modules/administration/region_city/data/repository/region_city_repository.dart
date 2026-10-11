import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/region_city/data/model/region_city_list_response.dart';
import 'package:copor_core/src/modules/administration/region_city/data/model/region_city_model.dart';

abstract class RegionCityRepository {
  Future<Either<Failure, Result<List<RegionCityModel>>>> getRegionCityList(
    FilterListDTO filterList,
  );
}

abstract class RegionCityRemoteDataSource {
  Future<RegionCityListResponse> getRegionCityList(FilterListDTO filterList);
}
