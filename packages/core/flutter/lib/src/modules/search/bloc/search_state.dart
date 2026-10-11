import 'package:equatable/equatable.dart';

class SearchUiState extends Equatable {
  final String searchQuery;
  final int usersToShowCount;

  const SearchUiState({
    this.searchQuery = '',
    this.usersToShowCount = 4,
  });

  SearchUiState copyWith({
    String? searchQuery,
    int? usersToShowCount,
  }) {
    return SearchUiState(
      searchQuery: searchQuery ?? this.searchQuery,
      usersToShowCount: usersToShowCount ?? this.usersToShowCount,
    );
  }

  @override
  List<Object?> get props => [searchQuery, usersToShowCount];
}
