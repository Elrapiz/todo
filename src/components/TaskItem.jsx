import { getVerboseDate } from "../utils/date";

function TaskItem({item}) {
    return <>
        <li data-record-done={item.isCompleted} data-record-id={item.id} className="task-item p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="place-self-start">
                    {
                        item.isCompleted?

                        <div className="text-emerald-400 flex items-center gap-2 font-bold">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="prefix__icon prefix__glyph w-6 h-6"><path d="M21.6 9.84a5 5 0 0 1-.42-.84 4 4 0 0 1-.18-.93 4 4 0 0 0-.64-2.16 4.3 4.3 0 0 0-1.87-1.28 5 5 0 0 1-.85-.43 5 5 0 0 1-.64-.66 4 4 0 0 0-1.8-1.4 4 4 0 0 0-2.2.07 4 4 0 0 1-1.94 0 4 4 0 0 0-2.24-.07A4 4 0 0 0 7 3.54a5 5 0 0 1-.66.66 5 5 0 0 1-.85.43 4.3 4.3 0 0 0-1.88 1.28A4 4 0 0 0 3 8.07a4 4 0 0 1-.18.93 5 5 0 0 1-.42.82A4.3 4.3 0 0 0 1.63 12a4.3 4.3 0 0 0 .77 2.16 4 4 0 0 1 .42.82 4 4 0 0 1 .15.95 4 4 0 0 0 .64 2.16 4.3 4.3 0 0 0 1.87 1.28 5 5 0 0 1 .85.43 5 5 0 0 1 .66.66 4 4 0 0 0 1.8 1.4 3 3 0 0 0 .87.13 7 7 0 0 0 1.34-.18 4 4 0 0 1 1.94 0 4.3 4.3 0 0 0 2.24.06 4 4 0 0 0 1.8-1.4 5 5 0 0 1 .66-.66 5 5 0 0 1 .85-.43 4.3 4.3 0 0 0 1.87-1.28 4 4 0 0 0 .64-2.16 4 4 0 0 1 .15-.95 5 5 0 0 1 .42-.82 4.3 4.3 0 0 0 .8-2.17 4.3 4.3 0 0 0-.77-2.16m-4.89.87-5 5a1 1 0 0 1-1.42 0l-3-3a1 1 0 1 1 1.42-1.42l2.29 2.3 4.29-4.3a1 1 0 0 1 1.42 1.42" fill="currentColor"/></svg>
                            <p>Completed</p>
                        </div>

                        : ''
                    }
                </div>
                <div className="place-self-center flex sm:place-self-end" role="group">
                    <button type="button" className="toggle-done-btn px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700">
                        {
                            item.isCompleted? 'Undone' : 'Done'
                        }
                    </button>
                    <button type="button" className="edit-btn px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                        Edit
                    </button>
                    <button type="button" className="delete-task-btn px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700">
                        Delete
                    </button>
                </div>
            </div>

            <p className="my-4">
                { item.task }
            </p>

            <div className="text-sm text-gray-400 flex flex-wrap items-center justify-between">
                <p className="flex items-center gap-1">
                    <svg className="w-4 h-4 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 256a192 192 0 1 0-384 0 192 192 0 1 0 384 0M0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0m256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160m0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288m-32 144a32 32 0 1 1 64 0 32 32 0 1 1-64 0"/></svg>
                    <span>Due: { item.due === ''? 'no due date' : getVerboseDate(item.due) }</span>
                </p>
                <p className="flex items-center">
                    <svg className="w-3 h-3 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M.1 29.3a32 32 0 0 0 29.2 34.6l8 .7A63.86 63.86 0 0 1 96 128.3V224H64c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v95.7c0 33.3-25.5 61-58.7 63.8l-8 .7C11.7 449.6-1.4 465 .1 482.7s16.9 30.7 34.5 29.2l8-.7a127.7 127.7 0 0 0 85.4-42.9c21.2 24 51.2 40 85.4 42.9l8 .7c17.6 1.5 33.1-11.6 34.5-29.2s-11.6-33.1-29.2-34.5l-8-.7a64.03 64.03 0 0 1-58.7-63.8V288h32c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32v-95.7c0-33.3 25.5-61 58.7-63.8l8-.7c17.6-1.5 30.7-16.9 29.2-34.5S239-1.4 221.3.1l-8 .7c-34.1 2.8-64.1 18.9-85.3 42.9-21.2-24-51.2-40-85.4-42.9l-8-.7C17-1.4 1.6 11.7.1 29.3"/></svg>
                    Last update: { item.updatedAt }
                </p>
            </div>
        </li>
    </>;
}

export default TaskItem;