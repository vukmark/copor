import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/typing_status_req_body.dart';

class VuMeetMessageState extends BaseState<List<VuMeetMessageItemModel>> {
  final String? chatId;
  final bool isLoadingOlder;
  final TypingStatusUpdateDTO? typingStatusModel;
  final String? justArrivedMessageId;

  const VuMeetMessageState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    required this.chatId,
    this.isLoadingOlder = false,
    this.typingStatusModel,
    this.justArrivedMessageId,
  });

  const VuMeetMessageState.initial() : this._(result: null, chatId: null);

  const VuMeetMessageState.loading({
    required Result<List<VuMeetMessageItemModel>>? result,
    required chatId,
  }) : this._(result: result, isLoading: true, chatId: chatId);

  const VuMeetMessageState.fetched({
    required Result<List<VuMeetMessageItemModel>> result,
    required chatId,
  }) : this._(result: result, chatId: chatId);

  const VuMeetMessageState.failure({
    required Failure failure,
    required Result<List<VuMeetMessageItemModel>>? result,
    required chatId,
  }) : this._(result: result, failure: failure, chatId: chatId);

  @override
  VuMeetMessageState copyWith({
    Result<List<VuMeetMessageItemModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    bool clearFailure = false,
    String? chatId,
    bool? isLoadingOlder,
    TypingStatusUpdateDTO? typingStatusModel,
    bool clearTypingStatus = false,
    String? justArrivedMessageId,
    bool clearJustArrivedMessageId = false,
  }) {
    return VuMeetMessageState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: clearFailure ? null : (failure ?? this.failure),
      chatId: chatId ?? this.chatId,
      isLoadingOlder: isLoadingOlder ?? this.isLoadingOlder,
      typingStatusModel: clearTypingStatus ? null : (typingStatusModel ?? this.typingStatusModel),
      justArrivedMessageId: clearJustArrivedMessageId
          ? null
          : (justArrivedMessageId ?? this.justArrivedMessageId),
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    chatId,
    isLoadingOlder,
    typingStatusModel,
    justArrivedMessageId,
  ];
}

class VuMeetMessageResult {
  VuMeetMessageItemModel vuMeetMessageModel;
  Failure? warning;

  VuMeetMessageResult({required this.vuMeetMessageModel, this.warning});
}

class VuMeetMessageOperationSuccess {
  VuMeetMessageItemModel? vuMeetMessageModel;
  Failure? warning;

  VuMeetMessageOperationSuccess({this.vuMeetMessageModel, this.warning});
}
