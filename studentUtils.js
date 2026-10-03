// ===== studentUtils.js =====
// Reusable helper functions (module). Other files import them.

// Named export: a constant
export const DEPARTMENT_NAME = "Computer Science";

// Named export: rest parameter (...marks) collects all marks into one array
export function calculateTotal(...marks) {
  return marks.reduce((sum, mark) => sum + mark, 0);
}

// Named export: arrow function (count has a default value of 3)
export const calculateAverage = (total, count = 3) => (total / count).toFixed(2);

// Named export: grade from total marks
export function getGrade(marks) {
  if (marks >= 80) return "A";
  else if (marks >= 70) return "B";
  else if (marks >= 60) return "C";
  else if (marks >= 50) return "D";
  else return "F";
}

// Named export: arrow function + ternary operator
export const getStatus = (marks) => (marks >= 50 ? "Pass" : "Fail");

// Default export: only ONE default export per file
export default function formatStudentResult(name, rollNumber, total) {
  return `${name} - ${rollNumber} - Total: ${total}`;
}