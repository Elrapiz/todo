import { getCurrentDateVerbose, getVerboseDate } from "../utils/date";

/* 
 * Data object structure
 * {
 *      id: crypto.randomUUID(),
 *      task: string
 *      isCompleted: boolean,
 *      due: string (verbose date)
 *      createdAt: getCurrentDateVerbose()
 *      updatedAt: getCurrentDateVerbose()
 * }
*/
const data = [];

if(localStorage.getItem('todoData') === null) {
    localStorage.setItem('todoData', JSON.stringify(data));
}

export function index() {
    return JSON.parse(localStorage.getItem('todoData'));
}

export function store(task, due) {
    const newTodo = {
        id: crypto.randomUUID(),
        task: task,
        isCompleted: false,
        due: due,
        createdAt: getCurrentDateVerbose(),
        updatedAt: getCurrentDateVerbose(),
    }

    const data = index();
    data.push(newTodo);

    localStorage.setItem('todoData', JSON.stringify(data));

    return newTodo;
}

export function destroy(id) {
    const data = index().filter(task => task.id !== id);

    localStorage.setItem('todoData', JSON.stringify(data));

    return data;
}

export function patchComplete(id, isCompleted) {
    const data = index().map(task => task.id === id ? { ...task, isCompleted, updatedAt: getCurrentDateVerbose() } : task);

    localStorage.setItem('todoData', JSON.stringify(data));

    return data;
}

export function show(id) {
    const data = index();

    for(const task of data) {
        if(task.id === id) return task;
    }
}

export function patch(id, task, due) {
    const data = index().map(item => item.id === id ? { ...item, task, due } : item);

    localStorage.setItem('todoData', JSON.stringify(data));

    return data;
}
