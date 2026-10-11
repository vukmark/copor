import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:equatable/equatable.dart';

sealed class TodoListEvent extends Equatable {
  const TodoListEvent();

  @override
  List<Object?> get props => [];
}

class GetTodoList extends TodoListEvent {
  final FilterListDTO filterList;
  const GetTodoList(this.filterList);

  @override
  List<Object?> get props => [filterList];
}

class DeleteTodo extends TodoListEvent {
  final String todoId;
  final String todoType;
  const DeleteTodo(this.todoId, this.todoType);
}
