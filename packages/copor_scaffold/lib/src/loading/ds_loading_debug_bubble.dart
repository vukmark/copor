import 'package:flutter/material.dart';
import 'ds_loading_source.dart';

class DSLoadingDebugBubble extends StatefulWidget {
  final Set<DSLoadingSource> loadingSources;

  const DSLoadingDebugBubble({super.key, required this.loadingSources});

  @override
  State<DSLoadingDebugBubble> createState() => _DSLoadingDebugBubbleState();
}

class _DSLoadingDebugBubbleState extends State<DSLoadingDebugBubble> {
  final Map<String, DSLoadingSourceType> _usedKeys = {};

  @override
  void didUpdateWidget(DSLoadingDebugBubble old) {
    super.didUpdateWidget(old);
    for (final s in widget.loadingSources) {
      _usedKeys[s.key] = s.type;
    }
  }

  @override
  Widget build(BuildContext context) {
    final active = widget.loadingSources;
    final activeKeys = active.map((s) => s.key).toSet();
    final inactiveKeys = _usedKeys.keys.where((k) => !activeKeys.contains(k));

    return IgnorePointer(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 220),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        decoration: BoxDecoration(
          color: Colors.black.withValues(alpha: 0.55),
          borderRadius: BorderRadius.circular(10),
        ),
        child: DefaultTextStyle(
          style: const TextStyle(
            fontFamily: 'monospace',
            fontSize: 10,
            color: Colors.white,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                '── loading sources ──',
                style: TextStyle(color: Colors.white54, fontSize: 9),
              ),
              if (active.isEmpty)
                const Text(
                  '(none active)',
                  style: TextStyle(color: Colors.white38),
                )
              else
                ...active.map(
                  (s) => _SourceRow(
                    label: s.key,
                    tag: s.type == DSLoadingSourceType.page ? 'page' : 'req',
                    tagColor: s.type == DSLoadingSourceType.page
                        ? Colors.orangeAccent
                        : Colors.lightBlueAccent,
                    active: true,
                  ),
                ),
              if (_usedKeys.isNotEmpty) ...[
                const SizedBox(height: 4),
                const Text(
                  '── used on page ──',
                  style: TextStyle(color: Colors.white54, fontSize: 9),
                ),
                ...inactiveKeys.map(
                  (k) => _SourceRow(
                    label: k,
                    tag: _usedKeys[k] == DSLoadingSourceType.page
                        ? 'page'
                        : 'req',
                    tagColor: Colors.white30,
                    active: false,
                  ),
                ),
                if (activeKeys.isNotEmpty)
                  ...activeKeys.map(
                    (k) => _SourceRow(
                      label: k,
                      tag:
                          (_usedKeys[k] ?? DSLoadingSourceType.request) ==
                              DSLoadingSourceType.page
                          ? 'page'
                          : 'req',
                      tagColor: Colors.white54,
                      active: false,
                    ),
                  ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _SourceRow extends StatelessWidget {
  final String label;
  final String tag;
  final Color tagColor;
  final bool active;

  const _SourceRow({
    required this.label,
    required this.tag,
    required this.tagColor,
    required this.active,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 2),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
            decoration: BoxDecoration(
              color: tagColor.withValues(alpha: 0.25),
              borderRadius: BorderRadius.circular(3),
              border: Border.all(color: tagColor, width: 0.5),
            ),
            child: Text(tag, style: TextStyle(fontSize: 8, color: tagColor)),
          ),
          const SizedBox(width: 5),
          Flexible(
            child: Text(
              label,
              style: TextStyle(
                color: active ? Colors.white : Colors.white38,
                fontWeight: active ? FontWeight.bold : FontWeight.normal,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
