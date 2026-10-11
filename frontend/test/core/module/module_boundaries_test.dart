import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:copor_frontend/modules.dart';

// Core must not import optional modules, and a module may import only core and
// the modules it names in `dependsOn` — otherwise removing a module from
// lib/modules.dart breaks the build. Each module is its own package
// (packages/<name>/flutter, `package:copor_<name>`, <name> = the module's
// name). The app's lib/ is the composition root and may import anything; its
// tests count as part of the module they test (test/modules/<name>/).

// Paths are relative to the repo root, '/'-separated (also on Windows).
const _repo = '..';
const _coreLib = 'packages/core/flutter/lib';
const _appLib = 'frontend/lib';

String _posix(String path) => path.replaceAll(r'\', '/');

String _relative(String path) {
  final repo = _posix(Directory(_repo).absolute.uri.normalizePath().toFilePath());
  final absolute = _posix(File(path).absolute.uri.normalizePath().toFilePath());
  return absolute.startsWith(repo) ? absolute.substring(repo.length) : absolute;
}

class _Module {
  final String name;
  // Null for a module that has code but isn't in enabledModules.
  final List<String>? dependsOn;

  const _Module(this.name, this.dependsOn);
}

final _classPattern = RegExp(r'class (\w+) extends CoporModule\b');

_Module? _moduleIn(Directory config) {
  if (!config.existsSync()) return null;
  for (final file in config.listSync().whereType<File>().where((file) => file.path.endsWith('.dart'))) {
    final className = _classPattern.firstMatch(file.readAsStringSync())?.group(1);
    if (className == null) continue;
    final enabled = enabledModules.where((module) => module.runtimeType.toString() == className).firstOrNull;
    return enabled == null ? _Module('<$className, not enabled>', null) : _Module(enabled.name, enabled.dependsOn);
  }
  return null;
}

class _Layout {
  /// Module packages, by directory name under packages/ (package `copor_<dir>`).
  final Map<String, _Module> packages = {};

  _Layout() {
    for (final dir in Directory('$_repo/packages').listSync().whereType<Directory>()) {
      final name = _posix(dir.path).split('/').last;
      if (name == 'core' || !File('${dir.path}/flutter/pubspec.yaml').existsSync()) continue;
      final module = _moduleIn(Directory('${dir.path}/flutter/lib/src/config'));
      if (module != null) packages[name] = module;
    }
  }

  /// The module owning [path] (repo-relative), 'app' for the app's lib, or null for core.
  Object? ownerOf(String path) {
    final parts = path.split('/');
    if (parts.length > 2 && parts[0] == 'packages' && parts[2] == 'flutter' && parts[1] != 'core') return packages[parts[1]];
    if (path.startsWith('frontend/test/modules/') && parts.length > 3) return packages[parts[3]];
    if (path.startsWith('$_appLib/')) return 'app';
    return null;
  }

  /// The repo-relative file [uri] (imported from [file]) points at, or null for another package.
  String? resolve(String file, String uri) {
    final package = RegExp(r'^package:copor_(\w+)/(.*)$').firstMatch(uri);
    if (package != null) {
      final name = package.group(1)!;
      if (name == 'frontend') return '$_appLib/${package.group(2)}';
      if (name == 'core') return '$_coreLib/${package.group(2)}';
      if (packages.containsKey(name)) return 'packages/$name/flutter/lib/${package.group(2)}';
      return null; // copor_theme, copor_scaffold…
    }
    if (uri.startsWith('package:') || uri.startsWith('dart:')) return null;
    return Uri(path: file).resolve(uri).path;
  }
}

final _importPattern = RegExp(r'''^\s*(?:import|export)\s+['"]([^'"]+)['"]''', multiLine: true);

List<String> _findViolations(_Layout layout) {
  final violations = <String>[];
  final roots = [
    'frontend/test',
    _coreLib,
    for (final name in layout.packages.keys) 'packages/$name/flutter/lib',
  ];

  for (final root in roots) {
    for (final file in Directory('$_repo/$root').listSync(recursive: true).whereType<File>()) {
      if (!file.path.endsWith('.dart')) continue;
      final path = _relative(file.path);
      final owner = layout.ownerOf(path);

      for (final match in _importPattern.allMatches(file.readAsStringSync())) {
        final uri = match.group(1)!;
        final target = layout.resolve(path, uri);
        final targetOwner = target == null ? null : layout.ownerOf(target);
        if (targetOwner is! _Module || identical(targetOwner, owner)) continue;
        if (owner is _Module && targetOwner.name == owner.name) continue;

        if (owner == null) {
          violations.add('core → ${targetOwner.name}: $path imports $uri');
        } else if (owner is _Module && owner.dependsOn != null && !owner.dependsOn!.contains(targetOwner.name)) {
          violations.add('${owner.name} → ${targetOwner.name} (not in its dependsOn): $path imports $uri');
        }
      }
    }
  }
  return violations;
}

void main() {
  test('finds the package of every enabled module, named after the module', () {
    final layout = _Layout();
    for (final module in enabledModules) {
      expect(layout.packages[module.name]?.name, module.name, reason: 'packages/${module.name}/flutter');
    }
  });

  test('core holds no module descriptor', () {
    final descriptors = Directory('$_repo/$_coreLib')
        .listSync(recursive: true)
        .whereType<File>()
        .where((file) => file.path.endsWith('.dart') && _classPattern.hasMatch(file.readAsStringSync()))
        .map((file) => _relative(file.path));
    expect(descriptors, isEmpty);
  });

  test('core imports no optional module and modules import only their dependsOn', () {
    expect(_findViolations(_Layout()), isEmpty);
  });
}
