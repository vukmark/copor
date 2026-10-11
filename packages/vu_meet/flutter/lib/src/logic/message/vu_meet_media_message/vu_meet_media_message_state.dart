import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class VuMeetMediaMessageState extends BaseState<Map<String, MediaFileModel>> {
  final Set<String> loadingIds;
  final Set<String> failedIds;

  const VuMeetMediaMessageState._({
    super.result,
    super.isLoading,
    super.failure,
    required this.loadingIds,
    required this.failedIds,
  });

  factory VuMeetMediaMessageState.initial() => VuMeetMediaMessageState._(
    result: Result(data: {}),
    loadingIds: {},
    failedIds: {},
  );

  @override
  VuMeetMediaMessageState copyWith({
    Result<Map<String, MediaFileModel>>? result,
    bool? isLoading,
    Failure? failure,
    Set<String>? loadingIds,
    Set<String>? failedIds,
  }) {
    return VuMeetMediaMessageState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      failure: failure ?? this.failure,
      loadingIds: loadingIds ?? this.loadingIds,
      failedIds: failedIds ?? this.failedIds,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, loadingIds, failedIds];
}
