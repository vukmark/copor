import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_event.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_state.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/repository/feature_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class FeatureAccessBloc extends Bloc<FeatureAccessEvent, FeatureAccessState> {
  final FeatureRepository _featureRepository;

  FeatureAccessBloc({required FeatureRepository featureRepository})
    : _featureRepository = featureRepository,
      super(const FeatureAccessState.initial()) {
    on<GetFeatureList>(_onGetFeatureList);
  }

  Future<void> _onGetFeatureList(GetFeatureList event, Emitter<FeatureAccessState> emit) async {
    emit(state.copyWith(isLoading: true));
    final result = await _featureRepository.getFeatureList();
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (success) => emit(state.copyWith(result: success, isLoading: false)),
    );
  }
}
