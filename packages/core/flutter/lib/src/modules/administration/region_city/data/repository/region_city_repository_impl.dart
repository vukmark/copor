import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/region_city/data/model/region_city_model.dart';
import 'package:copor_core/src/modules/administration/region_city/data/repository/region_city_repository.dart';

class RegionCityRepositoryImpl extends BaseRepository implements RegionCityRepository {
  final RegionCityRemoteDataSource remoteDataSource;

  RegionCityRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<RegionCityModel>>>> getRegionCityList(
    FilterListDTO filterList,
  ) async {
    return performOperationAndMapToResult<List<RegionCityModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<RegionCityModel>>(() async {
          final response = await remoteDataSource.getRegionCityList(filterList);
          return response.items;
        });
      },
    );
  }
}
