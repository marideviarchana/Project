// Get references
const nameInput = document.getElementById('name');
const rollInput = document.getElementById('roll');
const mark1Input = document.getElementById('mark1');
const mark2Input = document.getElementById('mark2');
const mark3Input = document.getElementById('mark3');
const addBtn = document.getElementById('addBtn');
const tableBody = document.getElementById('tableBody');

// Load saved data
let students = JSON.parse(localStorage.getItem('students')) || [];

// Display saved data
displayStudents();

// Add student
addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const roll = rollInput.value.trim();
  const m1 = Number(mark1Input.value);
  const m2 = Number(mark2Input.value);
  const m3 = Number(mark3Input.value);

  if (!name || !roll || isNaN(m1) || isNaN(m2) || isNaN(m3)) {
    alert('Please enter all fields correctly.');
    return;
  }

  const total = m1 + m2 + m3;
  const avg = (total / 3).toFixed(2);
  let grade = '';

  if (avg >= 90) grade = 'A+';
  else if (avg >= 75) grade = 'A';
  else if (avg >= 60) grade = 'B';
  else if (avg >= 40) grade = 'C';
  else grade = 'Fail';

  const student = { name, roll, total, avg, grade };
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));

  displayStudents();
  clearInputs();
});

// Display table
function displayStudents() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.total}</td>
      <td>${student.avg}</td>
      <td>${student.grade}</td>
      <td><button onclick="deleteStudent(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}

// Clear input fields
function clearInputs() {
  nameInput.value = '';
  rollInput.value = '';
  mark1Input.value = '';
  mark2Input.value = '';
  mark3Input.value = '';
        }
