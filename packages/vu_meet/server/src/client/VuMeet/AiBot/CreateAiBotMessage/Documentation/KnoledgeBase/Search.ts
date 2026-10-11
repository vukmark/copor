export const search = `
🔹 FEATURE: Search

Description:
Unified search across the app. Users can search for users and To Do tasks, with results grouped into sections and supporting filters and sorting.

Available actions:

    Searching:
        -Type a query in the search bar
        -Search triggers when query has 3+ characters
        -Highlight matched text in results

    Users results:
        -View user cards
        -Open user profile

    Additional notes:
        -Search supports only:
            -Users
            -Tasks (To Do)
        -Does NOT search:
            -Messages → use VuMeet
            -Files → use Cloud
            -News or other features

Synonyms:
    -search = find, lookup
    -task = todo, item
    -filter = refine
    -sort = order
    -results = matches

Paths:
    ---0---/search---0--- Main search screen

--------------------------------------------------
`;
