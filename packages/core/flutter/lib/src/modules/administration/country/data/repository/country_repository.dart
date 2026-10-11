import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/country/data/model/create_country_dto.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/administration/country/data/model/country_model.dart';

abstract class CountryRepository {
  Future<Either<Failure, Result<List<CountryModel>>>> getCountryList(FilterListDTO filterList);
  Future<Either<Failure, Result<List<CountryModel>>>> getCountryPublicList();
  Future<Either<Failure, Result<void>>> deleteCountry(String countryId);
  Future<Either<Failure, Result<CountryModel>>> getCountry(String countryId);
  Future<Either<Failure, Result<void>>> createCountry(CreateCountryDTO countryToCreate);
  Future<Either<Failure, Result<void>>> updateCountry(CreateCountryDTO countryToUpdate);
}

abstract class CountryLocalDataSource {
  Future<List<CountryModel>> getCountryList();
  Future<List<CountryModel>> getCountryPublicList();
  Future<void> setCountryList(List<CountryModel> countryList);
}

abstract class CountryRemoteDataSource {
  Future<List<CountryModel>> getCountryList(FilterListDTO filterList);
  Future<List<CountryModel>> getCountryPublicList();
  Future<CountryModel> getCountry(String countryId);
  Future<void> deleteCountry(String countryId);
  Future<void> createCountry(CreateCountryDTO countryToCreate);
  Future<void> updateCountry(CreateCountryDTO countryToUpdate);
}
