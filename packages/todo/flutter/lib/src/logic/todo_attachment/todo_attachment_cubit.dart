import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_todo/src/data/repository/todo_repository.dart';
import 'package:copor_todo/src/logic/todo_attachment/todo_attachment_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TodoAttachmentCubit extends Cubit<TodoAttachmentState> {
  final TodoRepository _todoRepository;

  TodoAttachmentCubit({required TodoRepository todoRepository})
    : _todoRepository = todoRepository,
      super(const TodoAttachmentState());

  Future<MediaFileModel?> download(String attachmentId) async {
    emit(TodoAttachmentState(result: state.result, isLoading: true));
    final result = await _todoRepository.getAttachment(attachmentId);
    return result.fold(
      (failure) {
        emit(TodoAttachmentState(failure: failure));
        return null;
      },
      (attachment) {
        emit(TodoAttachmentState(result: attachment));
        return attachment.data;
      },
    );
  }
}
