import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_vu_meet/src/data/repository_impl/private_message_list/private_message_list_repository.dart';
import 'private_message_list_event.dart';
import 'private_message_list_state.dart';

class PrivateMessageListBloc extends Bloc<PrivateMessageListEvent, PrivateMessageListState> {
  final PrivateMessageListRepository _privateMessageListRepository;

  PrivateMessageListBloc({required PrivateMessageListRepository privateMessageListRepository})
    : _privateMessageListRepository = privateMessageListRepository,
      super(PrivateMessageListState.initial()) {
    on<GetPrivateMessageList>(_onGetPrivateMessageList);
  }

  Future<void> _onGetPrivateMessageList(
    GetPrivateMessageList event,
    Emitter<PrivateMessageListState> emit,
  ) async {
    emit(PrivateMessageListState.loading(result: state.result));

    final result = await _privateMessageListRepository.getPrivateMessageList();
    result.fold(
      (failure) {
        emit(PrivateMessageListState.failure(failure: failure, result: state.result));
      },
      (success) {
        emit(PrivateMessageListState.fetched(result: success));
      },
    );
  }
}
