import 'package:equatable/equatable.dart';

class ServerHealthModel extends Equatable {
  final String serverUrl;
  final bool isHealthy;

  const ServerHealthModel({this.serverUrl = '', this.isHealthy = false});

  ServerHealthModel copyWith({String? serverUrl, bool? isHealthy}) {
    return ServerHealthModel(
      serverUrl: serverUrl ?? this.serverUrl,
      isHealthy: isHealthy ?? this.isHealthy,
    );
  }

  @override
  List<Object?> get props => [serverUrl, isHealthy];
}
