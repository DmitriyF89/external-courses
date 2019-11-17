function toggleUserMenu() {
  const
    accountButton = document.querySelector('.login'),
    loginIconArrow = document.querySelector('.login__arrow'),
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
      `
    ;

  let isMenuOpen = false;

  function clickOnUserMenu() {
    if (!isMenuOpen) {
      mainMenu.insertAdjacentHTML('afterend', userAccMenuTemplate);
      isMenuOpen = true;
      loginIconArrow.classList.toggle('rotate180');
    } else {
      const userAccMenu = document.querySelector('.user-acc');
      userAccMenu.remove();
      loginIconArrow.classList.toggle('rotate180');
      isMenuOpen = false;
    }
  }

  accountButton.addEventListener('click', clickOnUserMenu);
}


function createBlockTitle(name) {
  return `
  <div class="task-block__title">
    <h3 class="task-block__name">${name}</h3>
    <button class="task-block__more-button">•••</button>
  </div>
  `
}

function createTaskList({ issues, title }) {
  return `
    <div class="task-block__item-group">
      <ul class="task-block__list">
      ${issues.map(elem => createTask(elem)).join('')}
      ${creatAddButton(title)}
      </ul>
    </div>
  `
}

function createTask({ title, id }) {
  return `<li class="task-block__item" data-task-id="${id}">${title}</li>`
}

function createTaskBlock(element) {
  return `
    <div class="task-block">
      ${createBlockTitle(element.title)}
      ${createTaskList(element)}
    </div>`
}

function createTaskInput() {
  return `
    <input type="text" class="task-block__input">
  `
}

function createOption(option) {
  const { title, id } = option;

  return `
    <option data-task-id=${id}>${title}</option>
  `
}

function createTaskSelect(options) {
  return `
    <select class="task-block__select">
      <option></option>
      ${options.map(element => createOption(element)).join('')}
    </select>
  `
}

function creatAddButton(title) {
  return `
    <button class="task-block__add-button" data-list-name="${title}">
      <svg class="task-block__plus" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <path d="m13 6h-5v-5c0-0.552-0.448-1-1-1s-1 0.448-1 1v5h-5c-0.552 0-1 0.448-1 1s0.448 1 1 1h5v5c0 0.552 0.448 1 1 1s1-0.448 1-1v-5h5c0.552 0 1-0.448 1-1s-0.448-1-1-1z"/>
      </svg>
      Add card
    </button>
  `
}

toggleUserMenu();


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
    main.insertAdjacentHTML('beforeend', createTaskBlock(element));
  });
}

function updateKanbanStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function clickOnBacklogAddButton(event) {
  if (event.target.closest('[data-list-name = "Backlog"]') && !isInputShown) {
    isInputShown = true;
    blockAllAddButtons();
    event.target.closest('[data-list-name = "Backlog"]').insertAdjacentHTML('beforebegin', createTaskInput());
    const taskInput = document.querySelector('.task-block__input');
    taskInput.focus();

    function changeTaskInput() {
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
    }

    taskInput.addEventListener('change', changeTaskInput);

    if (!taskInput.value.trim()) {
      function removeEmptyInput() {
        taskInput.remove();
        isInputShown = false;
        createTaskBlocks(state);
        blockButtonsIfNoIssues(state);
      }

      taskInput.addEventListener('blur', removeEmptyInput);
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
      currentButton.insertAdjacentHTML('beforebegin', tasksForSelect);
      const tasksForSelectDOMElem = document.querySelector('.task-block__select');
      tasksForSelectDOMElem.focus();

      tasksForSelectDOMElem.addEventListener('blur', refreshProcedure);

      function changeTasksForSelect() {
        const
          selectedOption = tasksForSelectDOMElem.options[tasksForSelectDOMElem.options.selectedIndex],
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
      }

      tasksForSelectDOMElem.addEventListener('change', changeTasksForSelect)
    }
  }
}

createTaskBlocks(state);
blockButtonsIfNoIssues(state);

main.addEventListener('click', clickOnBacklogAddButton);
main.addEventListener('click', clickOnNotBacklogAddButton);