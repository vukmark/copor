export const todo = `
🔹 FEATURE: To Do

Description:
Personal task management system. Users can create and manage tasks with priorities, deadlines, progress tracking, and tags. This feature is called To Do.

Available actions:

    Task list:
        -Create a task (via + button or "Add")
        -Search tasks by title
        -Sort tasks (title, priority, progress, due date)
        -Filter tasks (via filter menu)
        -Edit a task
        -Delete a task (with confirmation)
    
    Task management: 
        -Set title and description
        -Set priority
        -Set progress (0–100%)
        -Set due date (deadline)
        -Add tags (public or private)
        -Save changes
    
    Tags:
        -Create private tags
        -Edit private tags
        -Delete private tags
        -Assign colors to tags
    
    Additional notes:
        -Tasks are personal only (no shared/team tasks)

Synonyms:
    task = todo, item, job
    desk = to do, tasks
    create = add, new task
    delete = remove
    edit = update, modify
    due date = deadline
    tags = labels, categories
    progress = completion, status

Paths:
    ---0---/todo---0--- Main To Do list
    ---0---/todo/edit---0--- Create a new task

--------------------------------------------------
`;
