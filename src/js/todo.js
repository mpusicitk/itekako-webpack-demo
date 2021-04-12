import '../assets/scss/todo.scss';
import close from '../assets/svg/close.svg';
import check from '../assets/svg/check.svg';

const attachListeners = () => {
  document.querySelector('button').addEventListener('click', addItem);
  document.querySelector('ul').addEventListener('click', removeOrComplete);
}

const addItem = () => {
  const inputValue = document.querySelector('input').value;
  if (inputValue) {
    const list = document.querySelector('ul');
    const emptyItem = document.querySelector('.empty-list-item');
    if (emptyItem) {
      list.removeChild(emptyItem); 
    }
    const newItem = document.createElement('li');
    newItem.innerHTML = `
      ${inputValue}
      <div class="icons">
        <img class="complete-icon" src=${check} />
        <img class="remove-icon" src=${close} />
      </div<
    `;
    list.appendChild(newItem);
  }
}

const removeOrComplete = e => {
  if(e.target.className == 'remove-icon')
    removeItem(e);
  else if (e.target.className == 'complete-icon') {
    completeItem(e);
  }
}

const removeItem = e => {
  const itemToRemove = e.target.parentNode.parentNode;
  const list = itemToRemove.parentNode;
  list.removeChild(itemToRemove);
  if (!list.hasChildNodes()) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-list-item'
    emptyItem.innerHTML = `Your list is empty`;
    list.appendChild(emptyItem);
  }
}

const completeItem = e => {
  const checkmark = e.target;
  const itemToComplete = checkmark.parentNode.parentNode;
  itemToComplete.className = 'completed-item';
  checkmark.remove();
}

attachListeners();
