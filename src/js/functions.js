let allTasks = [];

const printTasks = tasks => {
	tasksContainerElement.textContent = '';
	const fragment = document.createDocumentFragment();
	tasks.forEach(task => {
		const newTaskContainer = document.createElement('div');
		newTaskContainer.id = task.id;
		const newCheckbox = document.createElement('input');
		newCheckbox.classList.add('task-checkbox');
		newCheckbox.type = 'checkbox';
		newCheckbox.dataset.value = task.id;
		newCheckbox.checked = task.completed;

		newCheckbox.addEventListener('change', () => {
			setCompletedTask(task.id);
		});

		const newTaskText = document.createElement('span');
		newTaskText.classList.add('task-text');
		newTaskText.textContent = task.task;
		const newButton = document.createElement('button');
		newButton.textContent = 'x';
		newButton.dataset.value = task.id;
		newButton.dataset.value = task.id;
		newButton.classList.add('delete-button');

		newButton.addEventListener('click', () => {
			deleteTask(task.id);
		});

		newTaskContainer.append(newCheckbox, newTaskText, newButton);
		fragment.append(newTaskContainer);
	});

	tasksContainerElement.append(fragment);
};

const countItemsLeft = () => {
	if (allTasks.length === 0) {
		counterTasksElement.textContent = 'NO TASKS';
		return;
	}

	const completedTasks = allTasks.filter(task => task.completed).length;
	const itemsLeft = allTasks.length - completedTasks;

	if (completedTasks === allTasks.length) {
		counterTasksElement.textContent = `ALL TASKS COMPLETED!!`;
	} else {
		counterTasksElement.textContent = `${itemsLeft} Items left`;
	}
};

const setCompletedTask = id => {
	allTasks = allTasks.map(task => {
		if (task.id === id) {
			task.completed = !task.completed;
		}

		return task;
	});
	countItemsLeft();
	printTasks(allTasks);
};

const deleteTask = id => {
	allTasks = allTasks.filter(task => task.id !== id);
	countItemsLeft();
	printTasks(allTasks);
	formElement.querySelector('.getTask').disabled = false;
	formElement.querySelector('.getTask').placeholder = 'Add a new task...';
};

const saveTask = task => {
	allTasks.push(task);
	countItemsLeft();
	printTasks(allTasks);

	if (allTasks.length === 6) {
		formElement.querySelector('.getTask').disabled = true;
		formElement.querySelector('.getTask').placeholder = 'Maximum tasks reached';
	}
};

const createTask = value => {
	if (allTasks.length >= 6) {
		alert("You can't add more than 6 tasks!");
		return;
	}

	const newTask = {
		id: Date.now(),
		task: value,
		completed: false
	};

	saveTask(newTask);
};

const filterTasks = filter => {
	if (filter === 'all') {
		printTasks(allTasks);
	} else if (filter === 'active') {
		const activeTasks = allTasks.filter(task => !task.completed);
		printTasks(activeTasks);
	} else if (filter === 'completed') {
		const completedTasks = allTasks.filter(task => task.completed);
		printTasks(completedTasks);
	}
};

export {
	printTasks,
	countItemsLeft,
	setCompletedTask,
	deleteTask,
	saveTask,
	createTask,
	filterTasks
};
