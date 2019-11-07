function treatUserAccPanel() {
  const
    accountButton = document.querySelector('.login'),
    loginIconArrow = document.querySelector('.login__arrow-down'),
    mainMenu = document.querySelector('.main-content'),
    userAccMenuTemplate = `
  <div class="user-acc">
    <img class="user-acc__avatar" src="./src/img/user-acc/svg/avatar.svg" alt="avatar">
    <div class="user-acc__info">
      <p class="user-acc__nickname">User name</p>
      <p class="user-acc__email">User email</p>
    </div>
    <button class="user-acc__accountSettings">Account settings</button>
    <button class="user-acc__logout">Log out</button>
    <a href="#" class="user-acc__terms">Terms of use</a>
  </div>
  `;

  let isUserAccActive = false;

  accountButton.addEventListener('click', function () {
    if (!isUserAccActive) {
      mainMenu.insertAdjacentHTML('beforeend', userAccMenuTemplate);
      isUserAccActive = true;
      loginIconArrow.classList.toggle('rotate180');
    } else {
      const userAccMenu = document.querySelector('.user-acc');
      userAccMenu.remove();
      loginIconArrow.classList.toggle('rotate180');
      isUserAccActive = false;
    }
  });
}

function createBlockTitle(name) {
  const
    titleBlock = document.createElement('div'),
    titleBlockName = document.createElement('h3'),
    titleButton = document.createElement('button');

  titleBlock.classList.add('task-block__title');
  titleBlockName.classList.add('task-block__name');
  titleButton.classList.add('task-block__more-button');

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

  listWrapper.classList.add('task-block__item-group');
  list.classList.add('task-block__list');
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
  listItem.classList.add('task-block__item');
  listItem.textContent = task.title;
  listItem.dataset.taskId = task.id;
  return listItem;
}

function createTaskBlock(element) {
  const taskBlock = document.createElement('div');
  taskBlock.classList.add('task-block');
  taskBlock.append(createBlockTitle(element.title));
  taskBlock.append(createTaskList(element));
  return taskBlock;
}

function createTaskInput() {
  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.classList.add('task-block__input');
  return taskInput;
}

function createTaskSelect(options) {
  const select = document.createElement('select');
  select.classList.add('task-block__select');
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

  addButton.classList.add('task-block__add-button');
  addButton.innerHTML =
    `<svg class="task-block__plus" width="14" height="14" viewBox="0 0 14 14">
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
  main = document.querySelector('.main-content');

let
  isInputShown = false,
  idCounter = +localStorage.getItem('kanbanBoardIdCounter') || 0;

function blockButtonsIfNoIssues(state) {
  const addButtons = document.querySelectorAll('.task-block__add-button');

  state.forEach((element, index) => {
    if (!element.issues.length && index < state.length - 1) {
      addButtons[index + 1].classList.add('disabled');
      addButtons[index + 1].setAttribute('disabled', true);
    }
  });
}

function blockAllAddButtons() {
  const addButtons = document.querySelectorAll('.task-block__add-button');
  addButtons.forEach(element => {
    element.classList.add('disabled');
    element.setAttribute('disabled', true);
  });
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
    const taskInput = document.querySelector('.task-block__input');
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