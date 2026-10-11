import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_admin/feature_admin_event.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_admin/feature_admin_state.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/repository/feature_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class FeatureAdminBloc extends Bloc<FeatureAdminEvent, FeatureAdminState> {
  final FeatureRepository _featureRepository;

  FeatureAdminBloc({required FeatureRepository featureRepository})
    : _featureRepository = featureRepository,
      super(const FeatureAdminState.initial()) {
    on<GetFeatureListForRoles>(_onGetFeatureListForRoles);
    on<SetFeatureList>(_onSetFeatureList);
  }

  Future<void> _onGetFeatureListForRoles(
    GetFeatureListForRoles event,
    Emitter<FeatureAdminState> emit,
  ) async {
    emit(state.copyWith(isLoading: true));
    final result = await _featureRepository.getFeatureListForRoles();
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (success) => emit(state.copyWith(result: success, isLoading: false)),
    );
  }

  Future<void> _onSetFeatureList(SetFeatureList event, Emitter<FeatureAdminState> emit) async {
    emit(state.copyWith(isLoading: true, isUpdated: false));
    final result = await _featureRepository.setFeatureList(event.featuresToUpdate);
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (_) => emit(state.copyWith(isUpdated: true, isLoading: false)),
    );
  }
}
