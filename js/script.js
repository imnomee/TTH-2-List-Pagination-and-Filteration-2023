const pagination = document.querySelector(".pagination");
const pagelist = pagination.firstElementChild;
const studentList = document.querySelector(".student-list");
const header = document.querySelector(".header");

/* 
SEARCH BUTTON
*/

const searchButton = (_list) => {
  const label = document.createElement("label");
  label.for = "search";
  label.className = "student-search";

  const span = document.createElement("span");
  span.textContent = "Search by name";
  const input = document.createElement("input");
  input.id = "search";
  input.placeholder = "Search by name...";

  const button = document.createElement("button");
  button.type = "button";

  const img = document.createElement("img");
  img.src = "img/icn-search.svg";
  img.alt = "Search icon";
  button.appendChild(img);
  label.appendChild(span);
  label.appendChild(input);
  label.appendChild(button);

  header.appendChild(label);

  button.addEventListener("click", () => {
    const filterArray = [];
    const value = input.value.trim().toLowerCase();
    for (const item of _list) {
      const fullname = `${item.name.first} ${item.name.last}`;
      if (fullname.toLowerCase().includes(value) && value.length >=1) {
        filterArray.push(item);
      }
    }
    if (filterArray.length > 0) {
      input.value = "";
      console.log(filterArray);
      pagelist.innerHTML = "";
      addPagination(filterArray);
      studentList.innerHTML = "";
      showPage(filterArray, 1);
    }
  });
};

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const studentsPerPage = 9; //default students on a single page

const showPage = (_list, _page) => {
  // this function will only determine
  //which page is shown and which students are shown on the page

  const totalItems = _list.length;
  //total items

  const firstStudent = _page * studentsPerPage - studentsPerPage;
  // example: (1 * 9) - 9 = 0

  const lastStudent = _page * studentsPerPage - 1;
  //example: (1 * 9) -1 = 8

  for (let i = 0; i < totalItems; i++) {
    if (i >= firstStudent && i <= lastStudent) {
      const item = _list[i];
      const li = document.createElement("li");
      li.className = "student-item cf";

      const divStudent = document.createElement("div");
      divStudent.className = "student-details";

      const img = document.createElement("img");
      img.className = "avatar";
      img.src = item.picture.medium;

      const h3 = document.createElement("h3");
      h3.textContent = `${item.name.title} ${item.name.first} ${item.name.last}`;

      const spanEmail = document.createElement("span");
      spanEmail.className = "email";
      spanEmail.textContent = item.email;

      divStudent.appendChild(img);
      divStudent.appendChild(h3);
      divStudent.appendChild(spanEmail);

      const divJoined = document.createElement("div");
      divJoined.className = "joined-details";
      const spanDate = document.createElement("span");
      spanDate.className = "date";
      spanDate.textContent = "Joined " + item.registered.date;
      divJoined.appendChild(spanDate);

      li.appendChild(divStudent);
      li.appendChild(divJoined);
      studentList.appendChild(li);
    }
  }
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (_list) => {
  //this function adds pagination buttons on the bottom

  const totalPages = Math.ceil(_list.length / studentsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = i;
    li.appendChild(button);

    //add list item to list
    pagelist.appendChild(li);
  }
  const firstButton = pagelist.firstElementChild.firstChild;
  firstButton.className = "active";

  //add listener on all the buttons
  pagelist.addEventListener("click", (e) => {
    //get previously active button
    const activeButton = document.querySelector(".active");
    const wholeList = document.getElementsByClassName("student-item");

    for (const item of wholeList) {
      item.style.display = "none";
    }

    //check if the target is button
    if (e.target.tagName === "BUTTON") {
      const currentButton = e.target;
      activeButton.className = "";
      currentButton.className = "active";
      showPage(_list, currentButton.textContent);
    }
  });
};

// Call functions
addPagination(data);
showPage(data, 1);
searchButton(data);
