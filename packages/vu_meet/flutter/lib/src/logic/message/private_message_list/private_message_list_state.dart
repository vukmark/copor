import 'package:copor_vu_meet/src/data/model/private_message_list/private_message_list_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class PrivateMessageListState extends BaseState<List<PrivateMessageListItemModel>> {
  const PrivateMessageListState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const PrivateMessageListState.initial() : this._(result: null);
  const PrivateMessageListState.loading({
    required Result<List<PrivateMessageListItemModel>>? result,
  }) : this._(result: result, isLoading: true);
  const PrivateMessageListState.fetched({required Result<List<PrivateMessageListItemModel>> result})
    : this._(result: result);
  const PrivateMessageListState.failure({
    required Failure failure,
    required Result<List<PrivateMessageListItemModel>>? result,
  }) : this._(result: result, failure: failure);

  @override
  PrivateMessageListState copyWith({
    Result<List<PrivateMessageListItemModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return PrivateMessageListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}

class PrivateMessageListResult {
  PrivateMessageListItemModel privateMessageListModel;
  Failure? warning;
  PrivateMessageListResult({required this.privateMessageListModel, this.warning});
}

class PrivateMessageListOperationSuccess {
  PrivateMessageListItemModel? privateMessageListModel;
  Failure? warning;
  PrivateMessageListOperationSuccess({this.privateMessageListModel, this.warning});
}
