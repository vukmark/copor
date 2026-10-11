import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/state/data/model/create_state_dto.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class StateRepository {
  Future<Either<Failure, Result<List<StateModel>>>> getStateList();
  Future<Either<Failure, Result<List<StateModel>>>> getPublicStateListByCountry(String countryId);
  Future<Either<Failure, Result<List<StateModel>>>> getStateListByCountry(String countryId);
  Future<Either<Failure, Result<void>>> deleteState(String stateId);
  Future<Either<Failure, Result<StateModel>>> getState(String stateId);
  Future<Either<Failure, Result<StateModel>>> getPublicState(String stateId);
  Future<Either<Failure, Result<void>>> createState(CreateStateDTO stateToCreate);
  Future<Either<Failure, Result<void>>> updateState(StateModel stateToUpdate);
}

abstract class StateLocalDataSource {
  Future<List<StateModel>> getStateList();
  Future<void> setStateList(List<StateModel> model);
}

abstract class StateRemoteDataSource {
  Future<List<StateModel>> getStateList();
  Future<List<StateModel>> getPublicStateListByCountry(String countryId);
  Future<List<StateModel>> getStateListByCountry(String countryId);
  Future<StateModel> getState(String stateId);
  Future<StateModel> getPublicState(String stateId);
  Future<void> deleteState(String stateId);
  Future<void> createState(CreateStateDTO stateToCreate);
  Future<void> updateState(StateModel stateToUpdate);
}
