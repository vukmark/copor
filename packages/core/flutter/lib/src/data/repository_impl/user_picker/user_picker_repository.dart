import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_core/src/error/failure.dart';

abstract class UserPickerRepository {
  /// Searches the users a module's picker route ([path]) lists for the actor.
  Future<Either<Failure, Result<List<UserPickerItemModel>>>> searchUsers(
    String path,
    String query, {
    int offset = 0,
  });
}
