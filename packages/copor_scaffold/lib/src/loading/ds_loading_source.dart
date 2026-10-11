import 'package:equatable/equatable.dart';

enum DSLoadingSourceType { page, request }

class DSLoadingSource extends Equatable {
  final String key;
  final DSLoadingSourceType type;

  const DSLoadingSource(this.key, {required this.type});

  const DSLoadingSource.page(this.key) : type = DSLoadingSourceType.page;

  const DSLoadingSource.request(this.key) : type = DSLoadingSourceType.request;

  @override
  List<Object?> get props => [key];
}
