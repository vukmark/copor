import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_event.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_state.dart';
import 'package:copor_core/src/modules/simple_list/data/model/simple_list_model.dart';

import '../../../data/model/filter/data/model/filter_dto/filter_list_dto.dart';

class CountrySimpleListBloc extends SimpleListBloc {
  CountrySimpleListBloc({required super.simpleListRepository});

  @override
  String getListType() {
    return 'country';
  }
}

class StateSimpleListBloc extends SimpleListBloc {
  StateSimpleListBloc({required super.simpleListRepository}) {
    on<GetStateSimpleList>(_onGetStateSimpleList);
  }

  @override
  String getListType() {
    return 'state';
  }

  Future<void> _onGetStateSimpleList(
    GetStateSimpleList event,
    Emitter<SimpleListState> emit,
  ) async {
    if (event.id.trim().isEmpty) {
      emit(
        const SimpleListState.fetched(
          result: Result(data: SimpleListModel(items: [])),
        ),
      );
      return;
    }

    emit(SimpleListState.loading(result: state.result));

    final result = await simpleListRepository.getStateSimpleList(event.id);
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

class TenantSimpleListBloc extends SimpleListBloc {
  TenantSimpleListBloc({required super.simpleListRepository});

  @override
  String getListType() {
    return 'tenant';
  }
}

class BaseTenantSimpleListBloc extends SimpleListBloc {
  BaseTenantSimpleListBloc({required super.simpleListRepository});

  @override
  String getListType() {
    return 'tenant/base';
  }
}

class RegionSimpleListBloc extends SimpleListBloc {
  RegionSimpleListBloc({required super.simpleListRepository});

  @override
  String getListType() {
    return 'region';
  }
}

class RegionCitySimpleListBloc extends SimpleListBloc {
  RegionCitySimpleListBloc({required super.simpleListRepository});

  @override
  String getListType() {
    return 'region-city';
  }
}

class UserSimpleListBloc extends SimpleListBloc {
  UserSimpleListBloc({required super.simpleListRepository});

  @override
  String getListType() {
    return 'user';
  }
}

class NativeLanguageSimpleListBloc extends SimpleListBloc {
  NativeLanguageSimpleListBloc({required super.simpleListRepository});

  @override
  String getListType() {
    return 'native-language';
  }
}

class RoleSimpleListBloc extends SimpleListBloc {
  RoleSimpleListBloc({required super.simpleListRepository}) {
    on<GetRoleSimpleList>(_onGetRoleSimpleList);
  }

  @override
  String getListType() {
    return 'role';
  }

  Future<void> _onGetRoleSimpleList(GetRoleSimpleList event, Emitter<SimpleListState> emit) async {
    if (event.contentType != 'NEWS') {
      emit(const SimpleListState.initial());
      return;
    }
    emit(SimpleListState.loading(result: state.result));
    final result = await simpleListRepository.getSimpleList(
      'role',
      FilterListDTO(filterList: [], limit: '100', offset: '0'),
    );
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (success) => emit(state.copyWith(result: success, isLoading: false)),
    );
  }
}
