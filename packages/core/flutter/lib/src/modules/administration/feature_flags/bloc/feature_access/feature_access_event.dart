import 'package:equatable/equatable.dart';

sealed class FeatureAccessEvent extends Equatable {
  const FeatureAccessEvent();

  @override
  List<Object?> get props => [];
}

class GetFeatureList extends FeatureAccessEvent {}
