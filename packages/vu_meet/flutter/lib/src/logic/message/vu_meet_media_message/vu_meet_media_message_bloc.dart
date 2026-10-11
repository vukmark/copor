import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_vu_meet/src/data/repository_impl/vu_meet_message/vu_meet_message_repository.dart';
import 'vu_meet_media_message_event.dart';
import 'vu_meet_media_message_state.dart';

class VuMeetMediaMessageBloc extends Bloc<VuMeetMediaMessageEvent, VuMeetMediaMessageState> {
  final VuMeetMessageRepository _vuMeetMessageRepository;

  VuMeetMediaMessageBloc({required VuMeetMessageRepository vuMeetMessageRepository})
    : _vuMeetMessageRepository = vuMeetMessageRepository,
      super(VuMeetMediaMessageState.initial()) {
    on<GetVuMeetMessageFile>(_onGetVuMeetMessageFile);
    on<AddLocalMediaFile>(_onAddLocalMediaFile);
  }

  Future<void> _onGetVuMeetMessageFile(
    GetVuMeetMessageFile event,
    Emitter<VuMeetMediaMessageState> emit,
  ) async {
    final id = event.dto.fileId;
    final currentMap = state.result?.data ?? {};

    if (currentMap.containsKey(id) || state.loadingIds.contains(id)) return;

    emit(
      state.copyWith(
        loadingIds: Set.from(state.loadingIds)..add(id),
        failedIds: Set.from(state.failedIds)..remove(id),
      ),
    );

    final result = await _vuMeetMessageRepository.getVuMeetMessageFile(event.dto);

    result.fold(
      (failure) => emit(
        state.copyWith(
          loadingIds: Set.from(state.loadingIds)..remove(id),
          failedIds: Set.from(state.failedIds)..add(id),
          failure: failure,
        ),
      ),
      (r) {
        final newMap = Map<String, MediaFileModel>.from(state.result?.data ?? {})..[id] = r.data;
        emit(
          state.copyWith(
            result: Result(data: newMap),
            loadingIds: Set.from(state.loadingIds)..remove(id),
          ),
        );
      },
    );
  }

  Future<void> _onAddLocalMediaFile(
    AddLocalMediaFile event,
    Emitter<VuMeetMediaMessageState> emit,
  ) async {
    final newMap = Map<String, MediaFileModel>.from(state.result?.data ?? {})
      ..[event.file.id] = event.file;
    emit(
      state.copyWith(
        result: Result(data: newMap),
        failedIds: Set.from(state.failedIds)..remove(event.file.id),
      ),
    );
  }
}
