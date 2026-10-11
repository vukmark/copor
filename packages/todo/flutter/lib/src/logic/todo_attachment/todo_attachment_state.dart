import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';

final class TodoAttachmentState extends BaseState<MediaFileModel> {
  const TodoAttachmentState({super.result, super.isLoading, super.failure});

  @override
  TodoAttachmentState copyWith({
    Result<MediaFileModel>? result,
    bool? isLoading,
    Failure? failure,
  }) {
    return TodoAttachmentState(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      failure: failure ?? this.failure,
    );
  }
}
