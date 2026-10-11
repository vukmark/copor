import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_event.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_state.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/repository/feature_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class MenuBloc extends Bloc<MenuEvent, MenuState> {
  final FeatureRepository _featureRepository;

  MenuBloc({required FeatureRepository featureRepository})
    : _featureRepository = featureRepository,
      super(const MenuState.initial()) {
    on<GetMenuList>(_onGetMenuList);
  }

  Future<void> _onGetMenuList(GetMenuList event, Emitter<MenuState> emit) async {
    emit(state.copyWith(isLoading: true));
    final languageCode = getIt<ConfigBloc>().state.result?.data.language.code ?? 'en';
    final result = await _featureRepository.getMenuList(languageCode);
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (success) => emit(state.copyWith(result: success, isLoading: false)),
    );
  }
}
