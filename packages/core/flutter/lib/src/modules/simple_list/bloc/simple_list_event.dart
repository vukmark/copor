import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:equatable/equatable.dart';

sealed class SimpleListEvent extends Equatable {
  const SimpleListEvent();

  @override
  List<Object?> get props => [];
}

class GetSimpleList extends SimpleListEvent {
  final FilterListDTO? filterList;

  const GetSimpleList(this.filterList);
}

class GetStateSimpleList extends SimpleListEvent {
  final String id;

  const GetStateSimpleList(this.id);
}

class GetRoleSimpleList extends SimpleListEvent {
  final String contentType;

  const GetRoleSimpleList(this.contentType);
}
