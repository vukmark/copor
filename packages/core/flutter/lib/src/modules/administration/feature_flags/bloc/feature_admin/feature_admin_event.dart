import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';
import 'package:equatable/equatable.dart';

sealed class FeatureAdminEvent extends Equatable {
  const FeatureAdminEvent();

  @override
  List<Object?> get props => [];
}

class GetFeatureListForRoles extends FeatureAdminEvent {}

class SetFeatureList extends FeatureAdminEvent {
  final List<FeatureModelDTO> featuresToUpdate;
  const SetFeatureList(this.featuresToUpdate);

  @override
  List<Object?> get props => [featuresToUpdate];
}
