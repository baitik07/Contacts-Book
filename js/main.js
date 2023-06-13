const resetBtn = document.querySelector(".reset-btn");
const addForm = document.querySelector(".add-contact-info");
const addName = document.querySelector("#addName");
const addSurname = document.querySelector("#addSurname");
const addPicture = document.querySelector("#addPicture");
const addNumber = document.querySelector("#addNumber");

const editModal = document.querySelector("#edit-modal");
const closeModalBtn = document.querySelector("#close-modal");
const editName = document.querySelector("#editName");
const editSurname = document.querySelector("#editSurname");
const editPicture = document.querySelector("#editPicture");
const editNumber = document.querySelector("#editNumber");

const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");

console.log(resetBtn, addForm, addName, addSurname, addPicture, addNumber);

const contactContainer = document.querySelector("#contact-container");

console.log(contactContainer);

let contactList = JSON.parse(localStorage.getItem("contact")) || [];

render();

function render() {
  contactContainer.innerHTML = "";

  contactList.forEach((item) => {
    contactContainer.innerHTML += `
    <div class="contact-item">
      <div id="inputs">
      <img src="${item.picture}" alt="" id="imgId" />
        <span>${item.name}</span>
        <span>${item.surname}</span>
        <span>${item.number}</span>
      </div>
      <div>
        <button id="${item.id}" class="edit-btn">Edit</button>
        <button id="${item.id}" class="delete-btn">Delete</button>
      </div>
    </div>`;
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !addName.value.trim() ||
    !addSurname.value.trim() ||
    !addNumber.value.trim() ||
    !addPicture.value.trim()
  ) {
    alert("Fill all blank");
    return;
  }

  const contact = {
    id: Date.now(),
    name: addName.value,
    surname: addSurname.value,
    picture: addPicture.value,
    number: addNumber.value,
  };

  contactList.push(contact);

  localStorage.setItem("contact", JSON.stringify(contactList));

  addName.value = "";
  addSurname.value = "";
  addPicture.value = "";
  addNumber.value = "";
  render();
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("contactList");

  contactList = [];

  render();
});

//!    Delete

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    contactList = contactList.filter((item) => item.id != e.target.id);

    localStorage.setItem("contact", JSON.stringify(contactList));
    render();
  }
});

//!   Edit

// let editId = null;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const contactToEdit = contactList.find((item) => item.id == e.target.id);

    editName.value = contactToEdit.name;
    editSurname.value = contactToEdit.surname;
    editPicture.value = contactToEdit.picture;
    editNumber.value = contactToEdit.number;

    editName.focus();

    editSubmit.id = e.target.id;

    // editId = e.target.id;
  }
});

//!  Close

closeModalBtn.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});

editCancel.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    editModal.style.visibility = "hidden";
  }
});

editSubmit.addEventListener("click", (e) => {
  if (
    !editName.value.trim() ||
    !editSurname.value.trim() ||
    !editPicture.value.trim() ||
    !editNumber.value.trim()
  ) {
    alert("You forget fill the blank");
    return;
  }

  contactList = contactList.map((item) => {
    if (item.id == editSubmit.id) {
      item.name = editName.value;
      item.surname = editSurname.value;
      item.picture = editPicture.value;
      item.number = editNumber.value;
    }
    return item;
  });
  localStorage.setItem("contact", JSON.stringify(contactList));
  render();
  editCancel.click();
});
