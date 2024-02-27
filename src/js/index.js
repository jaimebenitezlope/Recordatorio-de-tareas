import {
	formElement,
	tasksContainerElement,
	buttonsElement,
	counterTasksElement
} from './dom.js';

import {
	printTasks,
	countItemsLeft,
	setCompletedTask,
	deleteTask,
	saveTask,
	createTask,
	filterTasks
} from './functions.js';

countItemsLeft();

// const deleteAllCompletedTasks = () => {
// 	allTasks = allTasks.filter(task => task.completed);
// };

formElement.addEventListener('submit', event => {
	event.preventDefault();
	createTask(event.target.task.value);
	event.target.reset();
});

buttonsElement.addEventListener('click', event => {
	filterTasks(event.target.dataset.filter);
});
