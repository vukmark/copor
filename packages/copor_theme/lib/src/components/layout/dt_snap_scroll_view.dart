import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

/// A scrollable layout that snaps between two positions:
/// - [header] lives in the NestedScrollView's outer scroll area and slides away.
/// - [body] stays fixed once the header is gone (tab bar, lists, etc.).
///
/// When the user lifts their finger mid-scroll through the header, it snaps
/// either fully open (offset = 0) or fully closed (offset = header height).
const _kSnapDuration = Duration(milliseconds: 300);

class DTSnapScrollView extends HookWidget {
  final Widget header;
  final Widget body;

  const DTSnapScrollView({
    super.key,
    required this.header,
    required this.body,
  });

  @override
  Widget build(BuildContext context) {
    final scrollController = useScrollController();
    final headerKey = useMemoized(() => GlobalKey());
    final headerHeight = useState<double?>(null);

    useEffect(() {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        final box = headerKey.currentContext?.findRenderObject() as RenderBox?;
        if (box != null) headerHeight.value = box.size.height;
      });
      return null;
    }, []);

    void snap() {
      if (!scrollController.hasClients) return;
      final h = headerHeight.value;
      if (h == null) return;
      final offset = scrollController.offset;
      if (offset <= 0 || offset >= h) return;
      scrollController.animateTo(
        offset < h / 2 ? 0.0 : h,
        duration: _kSnapDuration,
        curve: Curves.easeOut,
      );
    }

    return NotificationListener<ScrollEndNotification>(
      onNotification: (_) {
        snap();
        return false;
      },
      child: NestedScrollView(
        controller: scrollController,
        headerSliverBuilder: (context, _) => [
          SliverToBoxAdapter(
            child: KeyedSubtree(key: headerKey, child: header),
          ),
        ],
        body: body,
      ),
    );
  }
}
