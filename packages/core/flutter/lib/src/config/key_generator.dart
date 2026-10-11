abstract class KeyGenerator {
  String generateKey(String namespace, String? language);
}

class KeyGeneratorImpl implements KeyGenerator {
  final String currentVersion;

  KeyGeneratorImpl({required this.currentVersion});

  @override
  String generateKey(String namespace, String? language) {
    return '${namespace}_${language ?? 'global'}_$currentVersion';
  }
}
