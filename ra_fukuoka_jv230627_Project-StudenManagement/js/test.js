// Define an array to store the list of courses
let courses = [];

// Function to add a new course
function addCourse() {
    // Get input values from the modal
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;
    let courseTime = document.getElementById("courseTime").value;
    let status = document.querySelector("input[name='status']:checked").value;

    // Create a new course object
    let newCourse = {
        courseId,
        courseName,
        courseTime,
        status
    };

    // Add the new course to the array
    courses.push(newCourse);

    // Clear input fields
    document.getElementById("courseId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("courseTime").value = "";
    document.getElementById("active").checked = true;

    // Close the modal
    $('#newCourse').modal('hide');

    // Refresh the course list
    displayCourses();
}

// Function to display the list of courses
function displayCourses() {
    let tableBody = document.getElementById("listCourse");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Loop through the courses and populate the table
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];

        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML = i + 1;
        cell2.innerHTML = course.courseId;
        cell3.innerHTML = course.courseName;
        cell4.innerHTML = course.courseTime;
        cell5.innerHTML = course.status ? "Hoạt động" : "Không hoạt động";

        // Add edit and delete buttons
        cell6.innerHTML = `
            <button type="button" class="btn btn-info btn-sm" onclick="editCourse(${i})">Sửa</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteCourse(${i})">Xóa</button>
        `;
    }
}

// Function to edit a course
function editCourse(index) {
    // Populate the modal with course details for editing
    let course = courses[index];
    document.getElementById("courseId").value = course.courseId;
    document.getElementById("courseName").value = course.courseName;
    document.getElementById("courseTime").value = course.courseTime;
    document.getElementById("active").checked = course.status;

    // Show the modal
    $('#newCourse').modal('show');
}

// Function to delete a course
function deleteCourse(index) {
    // Confirm deletion
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
        // Remove the course from the array
        courses.splice(index, 1);

        // Refresh the course list
        displayCourses();
    }
}

// Initialize the page by displaying the initial list of courses
displayCourses();
