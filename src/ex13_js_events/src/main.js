function treatUserAccPanel() {
  const
    accountButton = document.querySelector('.header__logIn'),
    userAcc = document.querySelector('.userAcc__wrapper'),
    loginIconArrow = document.querySelector('.arrowDown img');

  accountButton.addEventListener('click', function () {
    userAcc.style.display = userAcc.style.display === 'block' ? 'none' : 'block';
    loginIconArrow.classList.toggle('rotate180');
  });
}

function createBlockTitle(name) {
  const
    titleBlock = document.createElement('div'),
    titleBlockName = document.createElement('h3'),
    titleButton = document.createElement('button');

  titleBlock.classList.add('taskBlock__title');
  titleBlockName.classList.add('taskBlock__name');
  titleButton.classList.add('taskBlock__titleButton');

  titleBlockName.textContent = name;
  titleButton.textContent = '•••';

  titleBlock.append(titleBlockName);
  titleBlock.append(titleButton);

  return titleBlock;
}

function createTaskList({ issues, title }) {
  const
    list = document.createElement('ul'),
    listWrapper = document.createElement('div');

  listWrapper.classList.add('taskBlock__items');
  list.classList.add('taskBlock__list');
  listWrapper.append(list);

  if (issues.length) {
    issues.forEach(element => {
      list.append(createTask(element));
    });
  }
  listWrapper.append(creatAddButton(title))

  return listWrapper;
}

function createTask(task) {
  const listItem = document.createElement('li');
  listItem.classList.add('taskBlock__item');
  listItem.textContent = task.title;
  listItem.dataset.taskId = task.id;
  return listItem;
}

function createTaskBlock(element) {
  const taskBlock = document.createElement('div');
  taskBlock.classList.add('taskBlock');
  taskBlock.append(createBlockTitle(element.title));
  taskBlock.append(createTaskList(element));
  return taskBlock;
}

function createTaskInput() {
  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.classList.add('taskBlock__input');
  return taskInput;
}

function createTaskSelect(options) {
  const select = document.createElement('select');
  select.classList.add('taskBlock__select');
  select.append(document.createElement('option'));

  options.forEach(element => {
    const option = document.createElement('option');
    option.textContent = element.title;
    option.dataset.taskId = element.id;
    select.append(option);
  });

  return select;
}

function creatAddButton(title) {
  const
    addButton = document.createElement('button');

  addButton.classList.add('taskBlock__addCard');
  addButton.innerHTML =
    `<svg class="taskBlock__plusImg" width="14" height="14" viewBox="0 0 14 14">
    <path
      d="M13 6H8V1C8 0.448 7.552 0 7 0C6.448 0 6 0.448 6 1V6H1C0.448 6 0 6.448 0 7C0 7.552 0.448 8 1 8H6V13C6 13.552 6.448 14 7 14C7.552 14 8 13.552 8 13V8H13C13.552 8 14 7.552 14 7C14 6.448 13.552 6 13 6Z"
       />
  </svg> Add card`;
  addButton.dataset.listName = `${title}`;
  return addButton;
}

treatUserAccPanel();


const
  state = JSON.parse(localStorage.getItem('kanbanBoardState')) ||
    [
      {
        title: 'Backlog',
        issues: []
      },
      {
        title: 'Ready',
        issues: []
      },
      {
        title: 'In progress',
        issues: []
      },
      {
        title: 'Finished',
        issues: []
      }
    ],
  main = document.querySelector('.mainContent');

let
  isInputShown = false,
  idCounter = +localStorage.getItem('kanbanBoardIdCounter') || 0;

function blockButtonsIfNoIssues(state) {
  const addButtons = document.querySelectorAll('.taskBlock__addCard');

  state.forEach((element, index) => {
    if (!element.issues.length && index < state.length - 1) {
      addButtons[index + 1].classList.add('disabled');
    }
  });
}

function blockAllAddButtons() {
  const addButtons = document.querySelectorAll('.taskBlock__addCard');
  addButtons.forEach(element => element.classList.add('disabled'));
}

function createTaskBlocks(state) {
  main.innerHTML = '';
  state.forEach(element => {
    main.append(createTaskBlock(element));
  });
}

function updateKanbanStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function clickOnBacklogAddButton(event) {
  if (event.target.closest('[data-list-name = "Backlog"]') && !isInputShown) {
    isInputShown = true;
    blockAllAddButtons();
    event.target.closest('[data-list-name = "Backlog"]').before(createTaskInput());
    const taskInput = document.querySelector('.taskBlock__input');
    taskInput.focus();

    taskInput.addEventListener('change', function () {
      if (taskInput.value.trim()) {
        idCounter++;
        const newTask = {
          title: taskInput.value,
          id: `task${idCounter}`
        }

        state[0].issues.push(newTask);
        taskInput.remove();
        isInputShown = false;
        createTaskBlocks(state);
        updateKanbanStorage('kanbanBoardState', state);
        updateKanbanStorage('kanbanBoardIdCounter', idCounter);
      }
    });

    if (!taskInput.value.trim()) {
      taskInput.addEventListener('blur', function () {
        taskInput.remove();
        isInputShown = false;
        createTaskBlocks(state);
        blockButtonsIfNoIssues(state);
      });
    }
  }
}

function clickOnNotBacklogAddButton(event) {
  const
    currentButton = event.target.closest('[data-list-name]');

  function refreshProcedure() {
    createTaskBlocks(state);
    blockButtonsIfNoIssues(state);
    updateKanbanStorage('kanbanBoardState', state);
    isInputShown = false;
  }

  if (currentButton && !event.target.closest('[data-list-name = "Backlog"]') && !isInputShown) {
    const
      currentIndex = state.findIndex((elem) => {
        return elem.title === currentButton.dataset.listName;
      });

    let
      currentList = state[currentIndex].issues,
      prevList = state[currentIndex - 1].issues;

    if (state[currentIndex - 1].issues.length) {
      isInputShown = true;
      blockAllAddButtons();
      const tasksForSelect = createTaskSelect(state[currentIndex - 1].issues);
      currentButton.before(tasksForSelect);
      tasksForSelect.focus();

      tasksForSelect.addEventListener('blur', refreshProcedure);

      tasksForSelect.addEventListener('change', function () {
        const
          selectedOption = tasksForSelect.options[tasksForSelect.options.selectedIndex],
          newPrevList = prevList.filter(elem => elem.id !== selectedOption.dataset.taskId) || [],
          transferItem = {
            title: selectedOption.value,
            id: selectedOption.dataset.taskId
          };

        currentList.push(transferItem);
        prevList = [...newPrevList];
        state[currentIndex - 1].issues = prevList;
        state[currentIndex].issues = currentList;

        refreshProcedure();
      })
    }
  }
}

createTaskBlocks(state);
blockButtonsIfNoIssues(state);

main.addEventListener('click', clickOnBacklogAddButton);
main.addEventListener('click', clickOnNotBacklogAddButton);