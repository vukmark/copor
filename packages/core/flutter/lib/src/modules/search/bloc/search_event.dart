import 'package:equatable/equatable.dart';

abstract class SearchUiEvent extends Equatable {
  const SearchUiEvent();
  @override
  List<Object> get props => [];
}

class SearchQueryChanged extends SearchUiEvent {
  final String query;
  const SearchQueryChanged(this.query);

  @override
  List<Object> get props => [query];
}

class ShowMoreUsers extends SearchUiEvent {}

class ResetUserCount extends SearchUiEvent {}
