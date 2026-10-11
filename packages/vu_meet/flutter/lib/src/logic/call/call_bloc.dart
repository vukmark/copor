import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/decline_call_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/make_video_call_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/data_source/call/call_local_source.dart';
import 'package:copor_vu_meet/src/data/repository_impl/call/call_repository.dart';
import 'package:copor_vu_meet/src/logic/call/call_event.dart';
import 'package:copor_vu_meet/src/logic/call/call_state.dart';

class CallBloc extends Bloc<CallEvent, CallState> {
  // Matches the ring duration already configured for the native CallKit UI
  // (see getCallKitParams' `duration: 30000`).
  static const Duration callTimeoutDuration = Duration(seconds: 30);

  final CallRepository _callRepository;
  final CallLocalDataSource _activeCallStore;
  Timer? _timeoutTimer;
  String? _currentCallId;
  bool _currentIsVideo = true;

  CallBloc({required CallRepository callRepository, required CallLocalDataSource activeCallStore})
    : _callRepository = callRepository,
      _activeCallStore = activeCallStore,
      super(CallInitial()) {
    on<CallStartOngoing>(_onCallStarted);
    on<CallCancelled>(_onCallCancelled);
    on<CallAnsweredReceived>(_onCallAnsweredReceived);
    on<CallAnswered>(_onCallAnswered);
    on<CallDeclinedReceived>(_onCallDeclinedReceived);
    on<CallDeclined>(_onCallDeclined);
    on<CallTimedOut>(_onCallTimedOut);
    on<CallReset>(_onCallReset);
  }

  Future<void> _onCallStarted(CallStartOngoing event, Emitter<CallState> emit) async {
    _currentCallId = event.chatId;
    _currentIsVideo = event.isVideo;

    emit(
      CallOutgoing(
        callId: _currentCallId!,
        calleeName: '',
        calleeAvatarUrl: '',
        isVideo: _currentIsVideo,
      ),
    );

    final result = await _callRepository.makeVideoCallAction(
      MakeVideoCallActionReqBodyDto(
        chatId: event.chatId,
        type: event.isVideo ? 'VIDEO' : 'AUDIO',
        action: CallActionType.START_CALL,
      ),
    );

    result.fold(
      (failure) {
        _cleanup();
        _currentCallId = null;
        emit(CallFailure(message: failure.message));
      },
      (_) {
        _timeoutTimer = Timer(callTimeoutDuration, () {
          add(CallTimedOut());
        });
      },
    );
  }

  Future<void> _onCallAnsweredReceived(CallAnsweredReceived event, Emitter<CallState> emit) async {
    _cleanup();
    final chatId = _currentCallId!;
    final connectedAt = await _resolveConnectedAt(chatId);
    emit(CallConnected(chatId: chatId, connectedAt: connectedAt, isVideo: _currentIsVideo));
  }

  Future<void> _onCallAnswered(CallAnswered event, Emitter<CallState> emit) async {
    _cleanup();
    _currentCallId = event.chatId;
    _currentIsVideo = event.isVideo;
    _callRepository.makeVideoCallAction(
      MakeVideoCallActionReqBodyDto(
        chatId: event.chatId,
        type: event.isVideo ? 'VIDEO' : 'AUDIO',
        action: CallActionType.CALL_ACCEPTED,
      ),
    );

    final connectedAt = await _resolveConnectedAt(event.chatId);
    emit(CallConnected(chatId: event.chatId, connectedAt: connectedAt, isVideo: event.isVideo));
  }

  // Reuses the persisted connect time when this is the app restoring an already
  // connected call (e.g. a dev hot restart, or the OS killing/reviving a backgrounded
  // app) instead of resetting the elapsed duration to zero. Persists a fresh value
  // the first time a call actually connects.
  Future<DateTime> _resolveConnectedAt(String chatId) async {
    final persisted = await _activeCallStore.getConnectedAtFor(chatId);
    final connectedAt = persisted ?? DateTime.now();
    await _activeCallStore.save(chatId, connectedAt);

    return connectedAt;
  }

  void _onCallDeclinedReceived(CallDeclinedReceived event, Emitter<CallState> emit) {
    _cleanup();
    _activeCallStore.clear();
    final declinerName = event.declinerName;
    final wasDeclined = declinerName != null && declinerName.isNotEmpty;

    emit(CallFinished(reason: 'Call declined', declinedByOther: wasDeclined));
  }

  void _onCallDeclined(CallDeclined event, Emitter<CallState> emit) {
    final dto = DeclineCallReqBodyDto(
      chatId: event.chatId,
      numberOfDeclinedCalls: event.numberOfDeclinedCalls,
    );

    _callRepository.declineCall(dto);
    _cleanup();
    _activeCallStore.clear();
    emit(const CallFinished(reason: 'Call Declined'));
  }

  void _onCallCancelled(CallCancelled event, Emitter<CallState> emit) {
    if (_currentCallId != null) {
      _callRepository.makeVideoCallAction(
        MakeVideoCallActionReqBodyDto(
          chatId: _currentCallId!,
          type: _currentIsVideo ? 'VIDEO' : 'AUDIO',
          action: CallActionType.END_CALL,
          durationSeconds: event.duration?.inSeconds,
        ),
      );
    }
    _cleanup();
    _activeCallStore.clear();
    emit(const CallFinished(reason: 'Call Cancelled'));
  }

  void _onCallTimedOut(CallTimedOut event, Emitter<CallState> emit) {
    if (state is CallOutgoing) {
      if (_currentCallId != null) {
        _callRepository.makeVideoCallAction(
          MakeVideoCallActionReqBodyDto(
            chatId: _currentCallId!,
            type: _currentIsVideo ? 'VIDEO' : 'AUDIO',
            action: CallActionType.TIMEOUT_CALL,
          ),
        );
      }
      _cleanup();
      _activeCallStore.clear();
      emit(
        event.isManualCancel
            ? const CallFinished(reason: 'Call Cancelled')
            : const CallFinished(reason: 'No Answer', noAnswer: true),
      );
    }
  }

  void _onCallReset(CallReset event, Emitter<CallState> emit) {
    _cleanup();
    _activeCallStore.clear();
    emit(CallInitial());
  }

  void _cleanup() {
    _timeoutTimer?.cancel();
    _timeoutTimer = null;
  }

  @override
  Future<void> close() {
    _timeoutTimer?.cancel();
    return super.close();
  }
}
