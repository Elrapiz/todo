import { useRef, useEffect, useState } from "react";
import Brand from "./components/Brand";
import TaskItem from "./components/TaskItem";
import Confirm from "./components/Confirm";
import { index, store, destroy, patchComplete, show, patch } from "./data/data";

function App() {
    const isPatching = useRef(false);
    const isDestroying = useRef(false);
    const isCompleting = useRef(false);
    const cancelEditBtn = useRef(null);
    const mainScrollableRef = useRef(null);
    const taskList = useRef(null);
    const composeForm = useRef(null);
    const selectedTaskId = useRef(null);
    const [data, setData] = useState(index());
    const [confirmIsShowing, setConfirmIsShowing] = useState(false);

    useEffect(() => {
        if(!isPatching.current && !isDestroying.current && !isCompleting.current && mainScrollableRef.current) {
            mainScrollableRef.current.scrollTo({
                top: mainScrollableRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }

        isDestroying.current = false;
        isCompleting.current = false;
        isPatching.current = false;
    }, [data]);

    const composeFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if(formData.get('task') === '') return;

        if(formData.get('id') !== '') {
            isPatching.current = true;
            const newData = patch(formData.get('id'), formData.get('task'), formData.get('due'));
            setData(newData);
            clearEditForm();
        } else {
            const newTodo = store(formData.get('task'), formData.get('due'));
    
            setData(prevData => [...prevData, newTodo]);
        }
        
        e.currentTarget.reset();
    }

    const handleTaskListClick = (e) => {
        const taskItemDeleteBtn = e.target.closest('.delete-task-btn');
        if(taskItemDeleteBtn) {
            selectedTaskId.current = taskItemDeleteBtn.closest('li')?.dataset.recordId;
            setConfirmIsShowing(true);
        }

        const editBtn = e.target.closest('.edit-btn');
        if(editBtn) {
            selectedTaskId.current = editBtn.closest('li')?.dataset.recordId;

            const task = show(selectedTaskId.current);

            cancelEditBtn.current.classList.remove('hidden');
            composeForm.current.querySelector('#id').value = task.id;
            composeForm.current.querySelector('#task').value = task.task;
            composeForm.current.querySelector('#dueDate').value = task.due;
        }

        const toggleDoneBtn = e.target.closest('.toggle-done-btn');
        if(toggleDoneBtn) {
            selectedTaskId.current = toggleDoneBtn.closest('li')?.dataset.recordId;

            const isCompleted = toggleDoneBtn.closest('li')?.dataset.recordDone === 'true';

            const data = patchComplete(selectedTaskId.current, !isCompleted);

            isCompleting.current = true;
            setData(data);
        }
    }

    function confirmedHandler() {
        isDestroying.current = true;

        const newData = destroy(selectedTaskId.current);
        setData(newData);
        setConfirmIsShowing(false);
    }

    function closeConfirm() {
        selectedTaskId.current = null;
        setConfirmIsShowing(false);
    }

    function clearEditForm() {
        composeForm.current.querySelector('#id').value = null;
        composeForm.current.reset();
        cancelEditBtn.current.classList.add('hidden');
    }

    return <>
        <div className="bg-gray-50">
            <div className="layer--grow-center h-svh max-w-3xl mx-auto p-4">
                <header>
                    <Brand />
                </header>

                <main ref={mainScrollableRef} className="overflow-y-auto scroll-smooth">
                    <ol ref={taskList} onClick={handleTaskListClick} className="h-full">
                        {
                            data.length === 0 ?

                            <h1 className="h-full w-full flex items-center justify-center text-4xl font-bold">What's next?</h1>

                            :

                            data.map(item => {
                                return (
                                    <TaskItem item={item} key={item.id} />
                                );
                            })

                        }
                    </ol>
                </main>

                <div>
                    <button ref={cancelEditBtn} onClick={clearEditForm} className="hidden hover:underline">Cancel edit</button>

                    <form onSubmit={composeFormSubmit} ref={composeForm} className="p-4 rounded-lg flex items-center gap-2 bg-white shadow-[0_5px_15px_rgba(135,_206,_235,_0.7)]">
                        <input type="hidden" id="id" name="id" />

                        <div className="grow">
                            <textarea name="task" id="task" placeholder="Add a new task" className="block w-full outline-none"></textarea>
                            <div>
                                <label htmlFor="dueDate">Due: </label>
                                <input name="due" id="dueDate" type="date" />
                            </div>
                        </div>
                        <button type="submit" className="p-3 rounded-full font-bold text-4xl hover:bg-gray-200 active:bg-gray-300">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <Confirm
            isShowing={confirmIsShowing}
            message={'Are you sure?'}
            onClose={closeConfirm}
            onAccept={confirmedHandler}
        />
    </>;
}

export default App
