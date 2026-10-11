import 'package:connectivity_plus/connectivity_plus.dart';

abstract class ConnectivityService {
  Future<bool> isConnected();
  Stream<bool> get connectivityStream;
}

class ConnectivityException implements Exception {
  final String message;

  ConnectivityException({this.message = 'No internet connection'});

  @override
  String toString() {
    return 'ConnectivityException: $message';
  }
}

class ConnectivityServiceImpl implements ConnectivityService {
  final Connectivity connectivity;

  ConnectivityServiceImpl({required this.connectivity});

  @override
  Future<bool> isConnected() async {
    List<ConnectivityResult> results = await connectivity.checkConnectivity();

    bool connected = false;
    for (final result in results) {
      if (result != ConnectivityResult.none) {
        connected = true;
        break;
      }
    }

    if (!connected) {
      throw ConnectivityException();
    }
    return true;
  }

  @override
  Stream<bool> get connectivityStream async* {
    await for (List<ConnectivityResult> results in connectivity.onConnectivityChanged) {
      bool connected = false;
      for (final result in results) {
        if (result != ConnectivityResult.none) {
          connected = true;
          break;
        }
      }
      yield connected;
    }
  }
}
