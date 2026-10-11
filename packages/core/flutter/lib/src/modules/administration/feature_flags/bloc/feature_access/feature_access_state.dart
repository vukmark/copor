import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

final class FeatureAccessState extends BaseState<FeatureListModel> {
  const FeatureAccessState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const FeatureAccessState.initial() : this._();

  @override
  FeatureAccessState copyWith({
    Result<FeatureListModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return FeatureAccessState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure];
}
