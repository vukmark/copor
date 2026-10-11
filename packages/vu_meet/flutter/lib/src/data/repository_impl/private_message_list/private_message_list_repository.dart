import 'package:dartz/dartz.dart';
import 'package:copor_vu_meet/src/data/model/private_message_list/private_message_list_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class PrivateMessageListRepository {
  Future<Either<Failure, Result<List<PrivateMessageListItemModel>>>> getPrivateMessageList();
}
