
document.addEventListener("DOMContentLoaded", () => {

  // declare global values

  const studentUL = document.querySelector('ul.student-list');
  const headerH2 = document.querySelector('.header h2')
  let studentSearch = data;

  // Create a function that will show a “page” of nine students.
  // @list parameter is student data
  // @page parameter is the page number

  function createPage(list, page) {
    const startIndex = (page * 9) - 9;
    const endIndex = (page * 9);
    studentUL.innerHTML = '';

    for (let i = 0; i < list.length; i++) {

      if (i >= startIndex && i < endIndex) {
        const li = document.createElement('li');
        li.className = 'student-item cf';
        const name = `${list[i].name.title} ${list[i].name.first} ${list[i].name.last}`
        const avatar = `${list[i].picture.large}`
        const email = `${list[i].email}`
        const date = `${list[i].registered.date}`
        const studentItem = `
        <div class="student-details cf">
          <img class="avatar" src="${avatar}" alt="${name}'s profile picture" />
          <h3>${name}</h3>
          <span class="email">${email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${date}</span>
         </div>
        `
        li.innerHTML = studentItem;
        studentUL.append(li);
      }

    }

  }

  // Add Pagination Buttons

  function createPagBtn(list) {
    const numberOfPagBtn = Math.ceil(list.length/9);
    const linkUL = document.querySelector('.link-list');
    linkUL.innerHTML = '';

  // create buttons

    for (let i=0; i<numberOfPagBtn; i++) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = i+1;
      linkUL.append(li);
      li.append(button);

    }
    let activeButton = document.querySelector(".link-list button");
    if (activeButton) {
      activeButton.classList.add("active")
    }

  // Remove the active class from any other pagination button.
  // Add the active class to the pagination button that was just clicked.

    linkUL.addEventListener ('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        if (activeButton) {
            activeButton.classList.remove("active")
          }
          activeButton = e.target;
          activeButton.classList.add("active")
        createPage(list, e.target.textContent)
      }
    });
  };

  // Call Functions
  createPage(data, 1)
  createPagBtn(data);

  // Add a Search Component

  const header = document.querySelector('.header');
  const label = document.createElement('label');
  label.setAttribute('for', 'search');
  label.className = 'student-search';
  label.innerHTML = `
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  `;
  header.appendChild(label);

  const userInput = document.querySelector('#search');

  // function to search name by lowercase. Also lets user know if there are no results

  function searchName() {
    studentSearch = data.filter((student) => {
      let fullName = `${student.name.first} ${student.name.last}`
      return fullName.toLowerCase().includes(userInput.value.toLowerCase())
    })
    if (studentSearch.length === 0) {
      headerH2.innerHTML = 'No results found';
    } else {
      headerH2.innerHTML = 'Students';
    }
    createPage(studentSearch, 1)
    createPagBtn(studentSearch)
  }

  // Event listeners for search bar. 

  userInput.addEventListener("keyup", () => {
    searchName()
  });

  const searchButton = document.querySelector(".student-search button")
  searchButton.addEventListener("submit", () => {
    searchName()
  });
  
});