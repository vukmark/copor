import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/bloc/utils/scaffold_reaction_handler.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_dto_converter.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner, DSBannerDismiss;

enum CoporFormSuccessNavigation { goBack, closeRootModal, none }

class CoporFormListener extends BlocListener<CoporFormBloc, CoporFormState> {
  final void Function(BuildContext context)? additionalLogic;
  final CoporFormSuccessNavigation successNavigation;
  final bool indefiniteBanner;
  final String? successSubjectName;

  CoporFormListener({
    super.key,
    super.bloc,
    super.child,
    this.additionalLogic,
    this.successNavigation = CoporFormSuccessNavigation.goBack,
    this.indefiniteBanner = false,
    this.successSubjectName,
  }) : super(
         listenWhen: (prev, curr) => curr.isUpdated && !prev.isUpdated,
         listener: (context, state) {
           final translation = context.getState.commonTranslation.ensuredData;
           String successMessage = '';

           switch (state.actionType) {
             case ActionType.create:
               successMessage = translation.CREATE_SUCCESS_MESSAGE;
             case ActionType.update:
               successMessage = state.message ?? translation.UPDATE_SUCCESS_MESSAGE;
             case ActionType.get:
               // Public form submit (no create/update split).
               successMessage = state.message ?? translation.UPDATE_SUCCESS_MESSAGE;
             case null:
               throw StateError("Action type should not be null.");
           }

           if (successSubjectName != null && successSubjectName.trim().isNotEmpty) {
             successMessage = 'Entry for ${successSubjectName.trim()} added successfully.';
           }

           additionalLogic?.call(context);
           switch (successNavigation) {
             case CoporFormSuccessNavigation.goBack:
               goBack();
             case CoporFormSuccessNavigation.closeRootModal:
               closeRootModal(context);
             case CoporFormSuccessNavigation.none:
               break;
           }
           context.read<CoporFormBloc>().add(const ClearCoporForm());
           context.getBloc.appScaffold.addBanner(
             DSBanner.success(
               successMessage,
               source: 'copor_form_success',
               dismiss: indefiniteBanner
                   ? DSBannerDismiss.indefinite
                   : DSBannerDismiss.configDefault,
             ),
           );
         },
       );
}

class ItemDeletionListener<B extends BlocBase<S>, S extends BaseState<dynamic>>
    extends BlocListener<B, S> {
  final void Function(BuildContext context)? additionalLogic;
  final String successKey;

  ItemDeletionListener({
    super.key,
    super.child,
    this.additionalLogic,
    this.successKey = 'item_deletion_success',
  }) : super(
         listenWhen: (prev, curr) => prev.isLoading && !curr.isLoading,
         listener: (context, state) {
           if (state is DeletableState && (state as DeletableState).isDeleted) {
             final translation = context
                 .read<TranslationBloc<CommonTranslation>>()
                 .state
                 .ensuredData;
             additionalLogic?.call(context);
             BlocReactions.common.addSuccessToScaffold(
               context,
               translation.ITEM_DELETED_MESSAGE,
               successKey,
             );
           }
         },
       );
}

class ItemToggledListener<B extends BlocBase<S>, S extends BaseState<dynamic>>
    extends BlocListener<B, S> {
  final void Function(BuildContext context)? additionalLogic;

  ItemToggledListener({super.key, super.child, this.additionalLogic})
    : super(
        listenWhen: (prev, curr) => prev.isLoading && !curr.isLoading,
        listener: (context, state) {
          if (state is ToggledState && (state as ToggledState).isToggled) {
            additionalLogic?.call(context);
          }
        },
      );
}

class FailureListener<B extends BlocBase<S>, S extends BaseState<dynamic>>
    extends BlocListener<B, S> {
  final String failureKey;

  FailureListener({super.key, required this.failureKey, super.child})
    : super(
        listenWhen: (prev, curr) => prev.isLoading && !curr.isLoading && curr.failure != null,
        listener: (context, state) {
          BlocReactions.common.addFailureToScaffold(context, state, failureKey);
        },
      );
}

class CoporFormInitialLoadFailureListener extends BlocListener<CoporFormBloc, CoporFormState> {
  CoporFormInitialLoadFailureListener({super.key, super.child})
    : super(
        listenWhen: (previous, current) =>
            previous.isLoading &&
            !current.isLoading &&
            current.result == null &&
            current.failure != null,
        listener: (context, state) => closeRootModal(context),
      );
}

class LoadingListener<B extends BlocBase<S>, S extends BaseState<dynamic>>
    extends BlocListener<B, S> {
  final String loadingKey;
  final ScaffoldLoadingType loadingType;

  LoadingListener({
    super.key,
    required this.loadingKey,
    this.loadingType = ScaffoldLoadingType.auto,
    super.listenWhen,
    super.child,
  }) : super(
         listener: (context, state) {
           final resolved = loadingType == ScaffoldLoadingType.auto
               ? (state.isInitial ? ScaffoldLoadingType.page : ScaffoldLoadingType.request)
               : loadingType;
           switch (resolved) {
             case ScaffoldLoadingType.request:
               BlocReactions.common.addRequestLoadingToScaffold(context, state, loadingKey);
             case ScaffoldLoadingType.page:
               BlocReactions.common.addPageLoadingToScaffold(context, state, loadingKey);
             case ScaffoldLoadingType.auto:
               break;
           }
         },
       );
}

class FilterListener extends BlocListener<FilterBloc, FilterState> {
  final void Function(BuildContext context, FilterListDTO filters) additionalLogic;

  FilterListener({super.key, required this.additionalLogic, super.child})
    : super(
        listenWhen: (previous, current) => previous.appliedFilters != current.appliedFilters,
        listener: (context, state) {
          final filterListDto = FilterDtoConverter.fromState(state);
          additionalLogic(context, filterListDto);
        },
      );
}

class LanguageChangeListener extends BlocListener<ConfigBloc, ConfigState> {
  final void Function(BuildContext context, ConfigState state) additionalLogic;

  LanguageChangeListener({super.key, required this.additionalLogic, super.child})
    : super(
        listenWhen: (previous, current) =>
            previous.result?.data.language != current.result?.data.language,
        listener: (context, state) {
          additionalLogic(context, state);
        },
      );
}
