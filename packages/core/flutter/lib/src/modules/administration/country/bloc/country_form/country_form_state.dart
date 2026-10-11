import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/country/data/model/country_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class CountryFormState extends BaseState<CountryModel> {
  final ActionType? actionType;
  final void Function()? onValidateAndSubmit;

  const CountryFormState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
    this.onValidateAndSubmit,
  });

  const CountryFormState.initial() : this._(result: null);

  const CountryFormState.loading({required Result<CountryModel>? result})
    : this._(result: result, isLoading: true);

  const CountryFormState.fetched({required Result<CountryModel>? result}) : this._(result: result);

  const CountryFormState.failure({required Failure failure, required Result<CountryModel>? result})
    : this._(result: result, failure: failure);

  @override
  CountryFormState copyWith({
    Result<CountryModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
    void Function()? onValidateAndSubmit,
  }) {
    return CountryFormState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      actionType: actionType ?? this.actionType,
      onValidateAndSubmit: onValidateAndSubmit ?? this.onValidateAndSubmit,
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    actionType,
    onValidateAndSubmit,
  ];
}
