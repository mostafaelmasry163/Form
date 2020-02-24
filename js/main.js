const question = [
  { question: "Enter Your First Name" },
  { question: "Enter Your Last Name" },
  { question: "Enter Your Email", pattern: /\S+@\S+\.\S+/ },
  { question: "Enter Your Phone Number", type: "Number" },
  { question: "Enter Your Gender" },
  { question: "Enter Your Age", type: "Number" },
  { question: "Enter Your Previou Experince" },
  { question: "Enter Your Avilable Starting day", type: "date" },
  { question: "Enter Your Expected salary", type: "Number" },
  { question: "Enter Your Moto" },
  { question: "Enter Your Comment" }
];

const shakeTime = 100;
const switchTime = 200;

let position = 0;

const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGrp = document.querySelector("#input-grp");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProg = document.querySelector("#input-prog");
const prog = document.querySelector("#prog-bar");

document.addEventListener("DOMContentLoaded", getQuestion);
nextBtn.addEventListener("click", validate);
inputField.addEventListener("keyup", e => {
  if (e.keyCode == 13) {
    validate();
  }
});

function getQuestion() {
  inputLabel.innerHTML = question[position].question;
  inputField.type = question[position].type || "text";
  inputField.value = question[position].answer || "";
  inputField.focus();

  prog.style.width = (position * 100) / question.length + "%";

  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

function showQuestion() {
  inputGrp.style.opacity = 1;
  inputProg.style.transition = "";
  inputProg.style.width = "100%";
}

function hideQuestion() {
  inputGrp.style.opacity = 0;
  inputLabel.style.marginleft = 0;
  inputProg.style.width = 0;
  inputProg.style.transition = "none";
  inputGrp.style.border = null;
}

function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}
function validate() {
  if (!inputField.value.match(question[position].pattern || /.+/)) {
    inputfail();
  } else {
    inputpass();
  }
}

function inputfail() {
  formBox.className = "error";
  for (let i = 0; i < 10; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 120, 0);
    setTimeout(transform, shakeTime * 10, 0, 0);
    inputField.focus();
  }
}

function inputpass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 9, 0, 0);
  question[position].answer = inputField.value;
  position++;
  if (question[position]) {
    hideQuestion();
    getQuestion();
  } else {
    hideQuestion();
    formBox.className = "close";
    prog.style.width = "100%";

    formComplete();
  }
}

function formComplete() {
  console.log(question);
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(
      `Thanks ${question[0].answer} For Contacting With Us, You Will Recive An Email Shortly`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
