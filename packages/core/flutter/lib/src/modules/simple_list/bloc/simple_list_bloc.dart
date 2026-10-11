import 'package:bloc/bloc.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_event.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_state.dart';
import 'package:copor_core/src/modules/simple_list/data/repository/simple_list_repository.dart';

abstract class SimpleListBloc extends Bloc<SimpleListEvent, SimpleListState> {
  final SimpleListRepository simpleListRepository;

  SimpleListBloc({required this.simpleListRepository}) : super(const SimpleListState.initial()) {
    on<GetSimpleList>(onGetSimpleList);
  }

  String getListType();

  Future<void> onGetSimpleList(GetSimpleList event, Emitter<SimpleListState> emit) async {
    emit(SimpleListState.loading(result: state.result));

    final result = await simpleListRepository.getSimpleList(
      getListType(),
      event.filterList ?? FilterListDTO.empty(),
    );
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }
}
