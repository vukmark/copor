import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('CloudFolder.isRestrictedUploadEndpoint', () {
    test('restricts the tree root', () {
      expect(CloudFolder.isRestrictedUploadEndpoint(null), isTrue);
      expect(CloudFolder.isRestrictedUploadEndpoint(''), isTrue);
    });

    test('does not restrict the Public folder - its owner has full control (task 382)', () {
      expect(CloudFolder.isRestrictedUploadEndpoint('/cloud/PUBLIC/'), isFalse);
      expect(CloudFolder.isRestrictedUploadEndpoint('/cloud/PUBLIC/subdir/'), isFalse);
    });

    test('does not restrict the Private folder or user-group folders', () {
      expect(CloudFolder.isRestrictedUploadEndpoint('/cloud/PRIVATE/'), isFalse);
      expect(CloudFolder.isRestrictedUploadEndpoint('/cloud/USER_GROUP/ug-1/'), isFalse);
    });
  });
}
