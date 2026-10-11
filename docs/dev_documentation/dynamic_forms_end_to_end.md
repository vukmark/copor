# Dynamic Forms — End to End

Dynamic forms are the primary mechanism for create/edit UI in administration pages. The backend defines the form structure as JSON; the frontend renders and submits it without any form-specific Flutter code per entity.

---

## Architecture Overview

```
Backend                          Frontend
──────────────────────────────   ──────────────────────────────────────
FormPresenter                    CoporFormBloc
  └─ getFormFields()               └─ GetCoporForm event
       └─ FormField[]                   └─ CoporFormRemoteDataSource
            └─ getField()                    └─ GET /entity/form/:id?
                 └─ FormFieldDTO[]       └─ CoporFormDTO (parsed JSON)
                                         └─ FormHelper.getFormContent()
                                              └─ InputFieldModel[] (widgets)
                                         └─ CoporFullForm (renders + submits)
                                              └─ POST or PATCH /entity
```

---

## Step 1 — Backend produces the form JSON

The form JSON is produced by a `FormPresenter` subclass. Every presenter extends `FormPresenter<InputDTO>` and implements two methods:

- `getEndpoint()` — the base path the frontend will POST/PATCH to (e.g., `'/tag'`)
- `getFormFields()` — returns an ordered array of `FormField` subclass instances, each initialised with the current entity values

Each `FormField` serialises itself to a `FormFieldDTO` via `getField()`. The presenter collects them all into a `GetFormViewModel`:

```typescript
{
  endpoint: '/tag',
  fields: [
    {
      type: 'TEXT',
      label: 'NAME',
      name: 'name',
      requiredMessage: 'NAME_IS_REQUIRED',
      currentValue: { text: 'My Category', date: null, dropdown: null, ... }
    },
    {
      type: 'PUBLISH_STATUS',
      label: 'PUBLISH_STATUS',
      name: 'publishStatus',
      currentValue: { dropdown: [{ id: 'published', name: 'PUBLISHED' }], ... }
    }
    // ...
  ]
}
```

The `FormBaseController` handles the HTTP layer. For the create case (no `:id`), it calls `getDefaultFormValues()` and passes those to the presenter without hitting the database. For the edit case, it runs the full validate→execute→log chain to fetch the entity first.

---

## Step 2 — Frontend fetches the form

`CoporFormBloc` handles all form state. When a page opens in create or edit mode it dispatches `GetCoporForm(path)`:

```
GET /entity/form        → create form (empty default values)
GET /entity/form/:id    → edit form (pre-filled with entity data)
```

`CoporFormRemoteDataSource` makes the HTTP call (Retrofit/Dio). The response is parsed into `CoporFormDTO` which mirrors the backend JSON shape exactly.

Key models in `packages/core/flutter/lib/src/modules/forms/data/model/copor_form_dto.dart`:
- `CoporFormDTO` — root object: `endpoint` + `fields`
- `CoporFormFieldDTO` — one field: `type`, `label`, `name`, `requiredMessage`, `values`, `currentValue`
- `FieldValue` — union container for all possible current values (`text`, `date`, `dropdown`, `number`, `searchableDropdown`, `color`, `phoneNumberList`, `contract`)

---

## Step 3 — Frontend renders the form

`FormHelper.getFormContent(fields)` converts the `CoporFormFieldDTO` list into a list of `InputFieldModel` widgets via a large switch on `field.type`. Each `InputFieldModel` is a `HookWidget` that holds its own `ValueNotifier<T>` controller.

```dart
// FormHelper switch (simplified)
switch (field.type) {
  case FieldType.text:         return DTTextInput(...)
  case FieldType.email:        return DTEmailInput(...)
  case FieldType.dropdown:     return DTDropdownInput(...)
  case FieldType.date:         return DateInputField(...)
  case FieldType.searchableDropdown: return SearchableDropdownInput(...)
  // ...28+ types total
}
```

`CoporFullForm` receives the resulting widget list and renders them in a scrollable column with a submit button.

---

## Step 4 — Validation

Each `InputFieldModel` implements `isValid(BuildContext context)`. When the user taps submit, `CoporFullForm` calls `isValid()` on every field in order and stops at the first failure, displaying the field's `requiredMessage` as an error.

Fields without `requiredMessage` are optional and always pass validation.

---

## Step 5 — Submission

`CoporFullForm.submitForm()` collects values and dispatches the appropriate BLoC event:

```dart
// Collect values from all field widgets
final Map<String, dynamic> formData = {};
for (final model in formContent) {
  formData[model.name] = model.getValue();
}

// Submit
if (id != null) {
  bloc.add(UpdateFromCoporForm(endpoint, formData));  // PATCH /entity
} else {
  bloc.add(CreateFromCoporForm(endpoint, formData));  // POST /entity
}
```

Each field's `getValue()` returns the correct Dart type for its field type (e.g., `String` for text, `int` for number, `List<PhoneNumberDTO>` for phone list). The BLoC serialises the map and sends it to the standard CRUD endpoint — the same one that `CreateEntityController` / `UpdateEntityController` handle.

---

## Special behaviours

### COUNTRY → STATE dependency
`CountryInput` triggers `StateSimpleListBloc` on change. `StateInput` listens to that bloc to repopulate its dropdown options.

### SEARCHABLE_DROPDOWN — async search
Does not receive all options upfront. Instead it calls `SimpleListHelper` with a search string on each keystroke, fetching results from a `/simple-list` endpoint.

---

## File map

| Concern | File |
|---------|------|
| Field base class | `packages/core/server/src/client/Core/Form/FormField.ts` |
| Form presenter base | `packages/core/server/src/client/Core/Form/FormPresenter.ts` |
| Field type enum | `packages/core/server/src/client/Core/Form/FormFieldType.ts` |
| Field value DTO | `packages/core/server/src/client/Core/Form/FormFieldDTO.ts` |
| Form controller base | `packages/core/server/src/client/Core/Controller/FormBaseController.ts` |
| Flutter data model | `packages/core/flutter/lib/src/modules/forms/data/model/copor_form_dto.dart` |
| Flutter remote source | `packages/core/flutter/lib/src/modules/forms/data/data_source/copor_form_remote_data_source.dart` |
| Flutter repository | `packages/core/flutter/lib/src/modules/forms/data/repository/copor_form_repository_impl.dart` |
| BLoC | `packages/core/flutter/lib/src/modules/forms/bloc/copor_form_bloc.dart` |
| Type → widget routing | `packages/core/flutter/lib/src/modules/forms/presentation/utils/form_helper.dart` |
| Widget implementations | `packages/core/flutter/lib/src/modules/forms/data/model/input_field_model.dart` |
| Form container + submit | `packages/core/flutter/lib/src/modules/forms/presentation/copor_form.dart` |
