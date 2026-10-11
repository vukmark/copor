import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_contacts/src/data/model/contact_list_item_model.dart';
import 'package:copor_contacts/src/data/model/contact_model.dart';
import 'package:copor_contacts/src/data/repository/contact_repository.dart';

class ContactRepositoryImpl extends BaseRepository implements ContactRepository {
  final ContactRemoteDataSource remoteDataSource;

  ContactRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<ContactListItemModel>>>> searchContacts(
    String query, {
    int offset = 0,
  }) async {
    final requestDTO = FilterListDTO(
      filterList: [
        FilterModelDTO(name: 'SEARCH', values: [query]),
      ],
      limit: '20',
      offset: '$offset',
    );

    final remoteResult = await performNetworkOperation<List<ContactListItemModel>>(() async {
      final response = await remoteDataSource.searchContacts(requestDTO);
      return response.contactList;
    });

    return remoteResult.fold((failure) => Left(failure), (data) => Right(Result(data: data)));
  }

  @override
  Future<Either<Failure, Result<ContactModel>>> getContactDetails(String contactId) async {
    return performOperationAndMapToResult<ContactModel>(
      remoteOperation: () async {
        return performNetworkOperation<ContactModel>(() async {
          return await remoteDataSource.getContactDetails(contactId);
        });
      },
    );
  }
}
