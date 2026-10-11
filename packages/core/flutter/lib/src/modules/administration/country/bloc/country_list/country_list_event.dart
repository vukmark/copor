import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:equatable/equatable.dart';

sealed class CountryListEvent extends Equatable {
  const CountryListEvent();

  @override
  List<Object?> get props => [];
}

class GetCountryList extends CountryListEvent {
  final FilterListDTO filterList;
  const GetCountryList(this.filterList);
}

class GetCountryPublicList extends CountryListEvent {
  const GetCountryPublicList();
}

class DeleteCountry extends CountryListEvent {
  final String countryId;
  const DeleteCountry(this.countryId);
}
