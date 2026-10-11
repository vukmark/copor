import 'package:copor_todo/src/data/model/create_todo_dto.dart';
import 'package:equatable/equatable.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';

sealed class TodoFormEvent extends Equatable {
  const TodoFormEvent();

  @override
  List<Object?> get props => [];
}

class GetTodo extends TodoFormEvent {
  final String todoId;
  final String todoType;
  const GetTodo(this.todoId, this.todoType);
}

class CreateTodo extends TodoFormEvent {
  final CreateToDoDTO todoToCreate;
  final List<MediaFileModel> attachments;
  const CreateTodo(this.todoToCreate, {this.attachments = const []});

  @override
  List<Object?> get props => [todoToCreate, attachments];
}

class UpdateTodo extends TodoFormEvent {
  final CreateToDoDTO todoToUpdate;
  const UpdateTodo(this.todoToUpdate);
}

class RegisterValidationAndSubmitCallback extends TodoFormEvent {
  final void Function() onValidateAndSubmit;
  const RegisterValidationAndSubmitCallback(this.onValidateAndSubmit);
}

class SaveButtonPressed extends TodoFormEvent {}
