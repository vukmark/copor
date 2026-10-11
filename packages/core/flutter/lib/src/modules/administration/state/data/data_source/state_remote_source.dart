import 'package:copor_core/src/modules/administration/state/data/model/create_state_dto.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:copor_core/src/modules/administration/state/data/repository/state_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'state_remote_source.g.dart';

@RestApi()
abstract class StateRemoteDataSourceImpl implements StateRemoteDataSource {
  factory StateRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _StateRemoteDataSourceImpl;

  @override
  @GET('/state/list/')
  Future<List<StateModel>> getStateList();

  @override
  @GET('/state/{id}')
  Future<StateModel> getState(@Path('id') String stateId);

  @override
  @GET('/refdata/state/{id}')
  @Extra({'doesNotRequireAuth': true})
  Future<StateModel> getPublicState(@Path('id') String stateId);

  @override
  @DELETE('/state/{id}')
  Future<void> deleteState(@Path('id') String stateId);

  @override
  @PATCH('/state')
  Future<void> updateState(@Body() StateModel stateToUpdate);

  @override
  @POST('/state')
  Future<void> createState(@Body() CreateStateDTO stateToCreate);

  @override
  @GET('/refdata/state/list/{countryId}')
  @Extra({'doesNotRequireAuth': true})
  Future<List<StateModel>> getPublicStateListByCountry(@Path('countryId') String countryId);

  @override
  @GET('/state/list/{countryId}')
  @Extra({'doesNotRequireAuth': true})
  Future<List<StateModel>> getStateListByCountry(@Path('countryId') String countryId);
}
