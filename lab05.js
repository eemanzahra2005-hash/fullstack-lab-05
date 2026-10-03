// ===== lab05.js (loaded with type="module") =====

// Default import (no { }) + named imports (inside { }) + alias with "as"
import formatStudentResult, {
  DEPARTMENT_NAME,
  calculateTotal,
  calculateAverage,
  getGrade as findGrade,
  getStatus
} from "./studentUtils.js";


/* =====================================================
   TASK 1: Course Enrollment Manager (spread, rest, ES6)
   ===================================================== */
function runTask1() {
  const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
  const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];
  const student = { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6 };
  const cgpaList = [3.75, 2.80, 3.10, 2.95, 3.00];

  // 1. Spread: merge two arrays into one
  const allCourses = [...coreCourses, ...electiveCourses];

  // 2. Spread: copy the array and add a course to the COPY only
  const coursesCopy = [...allCourses, "Software Engineering"];

  // 3. Spread: copy the object, change semester, add cgpa
  const updatedStudent = { ...student, semester: 7, cgpa: 3.45 };

  // 4. Rest parameter: ...courses collects all extra arguments into an array
  function enrollStudent(name, ...courses) {
    return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
  }

  // 5. Rest parameter + arrow function
  const calculateAverageCGPA = (...cgpas) =>
    (cgpas.reduce((sum, cgpa) => sum + cgpa, 0) / cgpas.length).toFixed(2);

  // 6. Spread inside Math.max: [3.75, 2.80, ...] becomes 3.75, 2.80, ...
  const highestCGPA = Math.max(...cgpaList);

  // 7. Default parameter: department is "Computer Science" if not given
  function getStudentInfo(name, department = "Computer Science") {
    return `${name}'s Department (default): ${department}`;
  }

  // 8. Template literals for every message
  const lines = [
    `<b>Core Courses:</b> ${coreCourses.join(", ")}`,
    `<b>Elective Courses:</b> ${electiveCourses.join(", ")}`,
    `<b>All Courses (${allCourses.length}):</b> ${allCourses.join(", ")}`,
    `<b>Copy after adding a course (${coursesCopy.length}):</b> ${coursesCopy.join(", ")}`,
    `<b>Original still has ${allCourses.length} courses</b>`,
    `<b>Original Student:</b> ${student.name}, Semester ${student.semester}`,
    `<b>Updated Student:</b> ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}`,
    enrollStudent("Ali", "Web Development", "Database Systems", "Artificial Intelligence"),
    `<b>Average CGPA:</b> ${calculateAverageCGPA(...cgpaList)}`,
    `<b>Highest CGPA:</b> ${highestCGPA.toFixed(2)}`,
    getStudentInfo("Ali")
  ];

  // DOM: show every line on the page
  document.getElementById("task1Output").innerHTML =
    lines.map((line) => `<div class="info-line">${line}</div>`).join("");
}


/* =====================================================
   TASK 2: Student Utility Module (imports from studentUtils.js)
   ===================================================== */
function runTask2() {
  const students = [
    { name: "Sara", rollNumber: "BSCS-023", assignment: 18, midterm: 24, finalExam: 40 },
    { name: "Ahmed", rollNumber: "BSCS-002", assignment: 15, midterm: 20, finalExam: 32 },
    { name: "Ayesha", rollNumber: "BSCS-014", assignment: 10, midterm: 15, finalExam: 23 },
    { name: "Hassan", rollNumber: "BSCS-031", assignment: 16, midterm: 22, finalExam: 36 }
  ];

  // Department name comes from the module (named export)
  document.getElementById("departmentName").textContent = `Department: ${DEPARTMENT_NAME}`;

  let cardsHTML = "";

  // forEach + object destructuring
  students.forEach((student) => {
    const { name, rollNumber, assignment, midterm, finalExam } = student;

    const total = calculateTotal(assignment, midterm, finalExam);  // rest parameter in module
    const average = calculateAverage(total);                        // arrow function
    const grade = findGrade(total);                                 // alias of getGrade
    const status = getStatus(total);                                // arrow + ternary
    const cardClass = status === "Pass" ? "" : "fail";

    cardsHTML += `
      <div class="col-md-6 col-lg-3">
        <div class="card student-card ${cardClass}">
          <div class="card-body">
            <h6 class="card-title">${formatStudentResult(name, rollNumber, total)}</h6>
            <div>Average: ${average}</div>
            <div>Grade: <span class="grade-badge">${grade}</span></div>
            <div>Status: <span class="${status === "Pass" ? "pass-text" : "fail-text"}">${status}</span></div>
          </div>
        </div>
      </div>`;
  });

  document.getElementById("task2Cards").innerHTML = cardsHTML;
}


/* =====================================================
   TASK 3: Online Examination Workflow (callbacks)
   ===================================================== */
const task3Box = document.getElementById("task3Output");
let currentRun = 0;

// Clears the box and starts a new run (old timers of a previous run are ignored)
function startRun() {
  currentRun++;
  task3Box.innerHTML = "";
  return currentRun;
}

// Shows one message on the page (type has a default value)
function showMessage(run, message, type = "") {
  if (run !== currentRun) return;
  task3Box.innerHTML += `<p class="${type}">${message}</p>`;
}

// Each step waits with setTimeout, then calls the callback
function verifyStudent(roll, callback) {
  setTimeout(() => callback(`Student ${roll} verified`), 1000);
}
function loadExamPaper(callback) {
  setTimeout(() => callback("Exam paper loaded"), 1500);
}
function submitAnswers(callback) {
  setTimeout(() => callback("Answers submitted"), 2000);
}
function generateResult(callback) {
  setTimeout(() => callback("Result generated: 82 marks"), 1000);
}

// Part A: nested callbacks
function runExamPartA() {
  const run = startRun();

  // Callback hell: every step is nested inside the previous callback, so the code
  // grows to the right like a pyramid and becomes hard to read, debug and handle errors.
  verifyStudent("BSCS-001", (message1) => {
    showMessage(run, `Step 1: ${message1}`);
    loadExamPaper((message2) => {
      showMessage(run, `Step 2: ${message2}`);
      submitAnswers((message3) => {
        showMessage(run, `Step 3: ${message3}`);
        generateResult((message4) => {
          showMessage(run, `Step 4: ${message4}`);
          showMessage(run, "Exam completed successfully!", "ok");
        });
      });
    });
  });

  // Written AFTER the nested code but shows FIRST → proves the code is asynchronous
  showMessage(run, "Exam workflow started...", "muted");
}

// Part B: verifyStudent rewritten as an ERROR-FIRST callback: callback(error, data)
function verifyStudentErrorFirst(roll, callback) {
  setTimeout(() => {
    if (roll.trim() === "") {
      callback("Roll number is required", null);   // error first, no data
    } else {
      callback(null, `Student ${roll} verified`);   // no error, data second
    }
  }, 1000);
}

function runExamPartB(roll) {
  const run = startRun();

  // Callback hell again (nested), but now with error handling
  verifyStudentErrorFirst(roll, (error, data) => {
    if (error) {
      showMessage(run, `Error: ${error}`, "err");
      return;                                       // stop: remaining steps do NOT run
    }
    showMessage(run, `Step 1: ${data}`);
    loadExamPaper((message2) => {
      showMessage(run, `Step 2: ${message2}`);
      submitAnswers((message3) => {
        showMessage(run, `Step 3: ${message3}`);
        generateResult((message4) => {
          showMessage(run, `Step 4: ${message4}`);
          showMessage(run, "Exam completed successfully!", "ok");
        });
      });
    });
  });

  showMessage(run, "Exam workflow started...", "muted");
}

document.getElementById("partABtn").addEventListener("click", runExamPartA);
document.getElementById("validRollBtn").addEventListener("click", () => runExamPartB("BSCS-001"));
document.getElementById("emptyRollBtn").addEventListener("click", () => runExamPartB(""));


/* =====================================================
   TASK 4: University Result Portal (promises, async/await, Promise.all)
   ===================================================== */
const database = [
  { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6, assignment: 17, midterm: 25, finalExam: 40 },
  { name: "Ahmed", rollNumber: "BSCS-002", department: "Computer Science", semester: 6, assignment: 15, midterm: 20, finalExam: 32 },
  { name: "Sara", rollNumber: "BSCS-023", department: "Computer Science", semester: 6, assignment: 18, midterm: 24, finalExam: 40 },
  { name: "Ayesha", rollNumber: "BSCS-014", department: "Computer Science", semester: 6, assignment: 10, midterm: 15, finalExam: 23 },
  { name: "Hassan", rollNumber: "BSCS-031", department: "Computer Science", semester: 6, assignment: 16, midterm: 22, finalExam: 36 }
];

// Promise: after 1 second → resolve(student) or reject("Student not found")
function findStudent(rollNumber) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = database.find((s) => s.rollNumber === rollNumber);
      if (student) {
        resolve(student);
      } else {
        reject("Student not found");
      }
    }, 1000);
  });
}

// Promise: after 1 second → resolve({ total, average, grade, status })
function calculateResult(student) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { assignment, midterm, finalExam } = student;   // object destructuring
      const marks = [assignment, midterm, finalExam];
      const total = calculateTotal(...marks);               // spread → rest
      const average = calculateAverage(total);
      const grade = findGrade(total);                       // imported from module (alias)
      const status = getStatus(total);                      // arrow + ternary
      resolve({ total, average, grade, status });
    }, 1000);
  });
}

// Builds one student card with template literals + destructuring
function studentCardHTML(student, result) {
  const { name, rollNumber, department, semester } = student;
  const { total, average, grade, status } = result;
  return `
    <div class="result-card">
      <div><b>Student:</b> ${name}</div>
      <div><b>Roll No:</b> ${rollNumber}</div>
      <div><b>Department:</b> ${department}</div>
      <div><b>Semester:</b> ${semester}</div>
      <div><b>Total:</b> ${total}</div>
      <div><b>Average:</b> ${average}</div>
      <div><b>Grade:</b> <span class="grade-badge">${grade}</span></div>
      <div><b>Status:</b> <span class="${status === "Pass" ? "pass-text" : "fail-text"}">${status}</span></div>
    </div>`;
}

// Part A: promise chain with then / catch / finally
function searchWithPromiseChain(rollNumber) {
  const box = document.getElementById("partAOutput");
  box.innerHTML = `<p class="muted">Searching for ${rollNumber}...</p>`;
  let foundStudent;

  findStudent(rollNumber)
    .then((student) => {
      foundStudent = student;
      return calculateResult(student);          // next .then waits for this promise
    })
    .then((result) => {
      box.innerHTML += studentCardHTML(foundStudent, result);
    })
    .catch((error) => {
      box.innerHTML += `<p class="err">Error: ${error}</p>`;
    })
    .finally(() => {
      box.innerHTML += `<p class="ok">Search completed</p>`;
    });
}

// Part B: same work with async / await + try...catch...finally
async function showResult(rollNumber) {
  const box = document.getElementById("searchOutput");
  box.innerHTML = `<p class="muted">Searching...</p>`;

  try {
    const student = await findStudent(rollNumber);      // waits 1 second
    const result = await calculateResult(student);      // waits 1 more second
    box.innerHTML += studentCardHTML(student, result);
  } catch (error) {
    box.innerHTML += `<p class="err">Error: ${error}</p>`;
  } finally {
    box.innerHTML += `<p class="ok">Search completed</p>`;
  }
}

// Part C: search form → calls showResult()
document.getElementById("searchBtn").addEventListener("click", () => {
  const rollNumber = document.getElementById("rollInput").value.trim().toUpperCase();
  showResult(rollNumber);
});

// Part D: Promise.all + map → all results at the same time
async function loadAllResults() {
  const box = document.getElementById("allResultsOutput");
  box.innerHTML = `<p class="text-muted">Loading all results...</p>`;

  try {
    const results = await Promise.all(database.map((student) => calculateResult(student)));

    let rows = "";
    let passedCount = 0;

    results.forEach((result, index) => {
      const { name, rollNumber } = database[index];
      const { total, grade, status } = result;
      if (status === "Pass") passedCount++;
      rows += `
        <tr>
          <td>${name}</td>
          <td>${rollNumber}</td>
          <td>${total}</td>
          <td><span class="grade-badge">${grade}</span></td>
          <td class="${status === "Pass" ? "pass-text" : "fail-text"}">${status}</td>
        </tr>`;
    });

    const failedCount = results.length - passedCount;

    box.innerHTML = `
      <div class="table-responsive">
        <table class="table table-bordered align-middle results-table">
          <thead><tr><th>Student</th><th>Roll No</th><th>Total</th><th>Grade</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <h6 class="part-title mt-3">Final Statistics</h6>
      <div class="row g-3">
        <div class="col-4"><div class="stat-box"><h3>${results.length}</h3>Total Students</div></div>
        <div class="col-4"><div class="stat-box pass"><h3>${passedCount}</h3>Passed Students</div></div>
        <div class="col-4"><div class="stat-box fail"><h3>${failedCount}</h3>Failed Students</div></div>
      </div>`;
  } catch (error) {
    box.innerHTML = `<p class="fail-text">Error: ${error}</p>`;
  }
}

document.getElementById("loadAllBtn").addEventListener("click", loadAllResults);


/* ===== Run on page load ===== */
runTask1();
runTask2();
searchWithPromiseChain("BSCS-001");