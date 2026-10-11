import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/country/data/model/country_model.dart';
import 'package:copor_core/src/modules/administration/country/data/model/create_country_dto.dart';
import 'package:copor_core/src/modules/administration/country/data/repository/country_repository.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class CountryRepositoryImpl extends BaseRepository implements CountryRepository {
  final CountryRemoteDataSource remoteDataSource;
  final CountryLocalDataSource localDataSource;

  CountryRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<CountryModel>>>> getCountryList(
    FilterListDTO filterList,
  ) async {
    return performOperationAndMapToResult<List<CountryModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<CountryModel>>(() async {
          final localCountryList = await localDataSource.getCountryList();
          return localCountryList;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<List<CountryModel>>(() async {
          final countryList = await remoteDataSource.getCountryList(filterList);
          await localDataSource.setCountryList(countryList);
          return countryList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<CountryModel>>>> getCountryPublicList() async {
    return performOperationAndMapToResult<List<CountryModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<CountryModel>>(() async {
          final localCountryPublicList = await localDataSource.getCountryPublicList();
          return localCountryPublicList;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<List<CountryModel>>(() async {
          final countryPublicList = await remoteDataSource.getCountryPublicList();
          return countryPublicList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<CountryModel>>> getCountry(String countryId) async {
    return performOperationAndMapToResult<CountryModel>(
      remoteOperation: () async {
        return performNetworkOperation<CountryModel>(() async {
          final country = await remoteDataSource.getCountry(countryId);
          return country;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteCountry(String countryId) {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteCountry(countryId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> createCountry(CreateCountryDTO countryToCreate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.createCountry(countryToCreate);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> updateCountry(CreateCountryDTO countryToUpdate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateCountry(countryToUpdate);
        });
      },
    );
  }
}
