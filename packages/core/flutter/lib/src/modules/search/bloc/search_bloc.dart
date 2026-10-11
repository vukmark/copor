import 'package:flutter_bloc/flutter_bloc.dart';
import 'search_event.dart';
import 'search_state.dart';

class SearchUiBloc extends Bloc<SearchUiEvent, SearchUiState> {
  static const userInitialLimit = 4;
  static const userIncrement = 4;

  SearchUiBloc() : super(const SearchUiState()) {
    on<SearchQueryChanged>((e, emit) => emit(state.copyWith(searchQuery: e.query)));
    on<ShowMoreUsers>(
      (e, emit) => emit(state.copyWith(usersToShowCount: state.usersToShowCount + userIncrement)),
    );
    on<ResetUserCount>((e, emit) => emit(state.copyWith(usersToShowCount: userInitialLimit)));
  }
}
