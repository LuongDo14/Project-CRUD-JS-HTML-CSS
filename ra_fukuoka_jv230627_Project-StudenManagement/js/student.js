document.getElementById("btnCourseManagement").addEventListener("click", function () {
    window.location.href = "course_page.html";
})
document.getElementById("btnAccountManagement").addEventListener("click", function () {
    window.location.href = "account_page.html";
})
document.getElementById("btnClassManagement").addEventListener("click", function () {
    window.location.href = "class_page.html";
})
document.getElementById("btnStudentManagement").addEventListener("click", function () {
    window.location.href = "student_page.html";
})
document.getElementById("btnControlManagement").addEventListener("click", function () {
    window.location.href = "home_page.html";
})
let btnlogout = JSON.parse(localStorage.getItem("studentManagement")) || [];
document.getElementById("btnLogout").addEventListener("click", function () {
    localStorage.removeItem("userLogin");
    window.location.href = "login_page.html";
})
function openNav() {
    document.getElementById("side_bar").style.width = "300px";
}

function closeNav() {
    document.getElementById("side_bar").style.width = "0";
}

let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
function getAllArrStudent() {
    let studentManagement = localStorage.getItem("studentManagement");

    if (studentManagement) {
        let arrStudentManagement = JSON.parse(studentManagement);

        let allArrStudent = [];

        arrStudentManagement.forEach(course => {
            course.arrClass.forEach((classItem) => {
                classItem.arrStudent.forEach((studentItem) => {
                    allArrStudent = allArrStudent.concat({
                        courseId: course.courseId,
                        classId: classItem.classId,
                        studentId: studentItem.studentId,
                        studentName: studentItem.studentName,
                        year: studentItem.year,
                        address: studentItem.address,
                        email: studentItem.email,
                        phone: studentItem.phone,
                        sex: studentItem.sex,
                        status: studentItem.status,
                    })
                })
            })
        });

        return allArrStudent;
    } else {
        return null;
    }
}
let allArrStudent = getAllArrStudent();
if (allArrStudent) {
    console.log(allArrStudent);
} else {
    console.log("Data not found.");
}

function getAllArrClasses() {
    let studentManagement = localStorage.getItem("studentManagement");

    if (studentManagement) {
        let arrStudentManagement = JSON.parse(studentManagement);

        let allArrClasses = [];

        arrStudentManagement.forEach(course => {
            course.arrClass.forEach((classItem) => {
                allArrClasses = allArrClasses.concat({
                    courseId: course.courseId,
                    courseName: course.courseName,
                    classId: classItem.classId,
                    className: classItem.className,
                    description: classItem.description,
                    lecturer: classItem.lecturer,
                    status: classItem.status,
                    totalNumber: classItem.totalNumber,
                    arrStudent: classItem.arrStudent,

                })
            })
            // allArrClasses = allArrClasses.concat(allArrClasses.arrClass);
        });
        // arrCourse.forEach((course) => {
        //     course.arrClass.forEach((classItem) => {
        //       arrClass = arrClass.concat({
        //         courseId: course.courseId,
        //         courseName: course.courseName,
        //         ...classItem,
        //       });
        //     });
        //   });

        return allArrClasses;
    } else {
        return null;
    }
}

let allArrClasses = getAllArrClasses();
// localStorage.setItem("allArrClasses", JSON.stringify(allArrClasses));
if (allArrClasses) {
    console.log(allArrClasses);
} else {
    console.log("Data not found.");
}

let currentPage = 1;
let recordsPerPage = 3;
let action = "Create";
function renderData(page, allArrStudent) {
    console.log(allArrStudent);
    let pageMax = getTotalPage(allArrStudent);
    if (page < 1) {
        page = 1;
    }
    if (page > pageMax) {
        page = pageMax;
    }
    let listPages = document.getElementById("listPages");
    listPages.innerHTML = "";
    for (let i = 1; i <= pageMax; i++) {
        listPages.innerHTML += `<li><a href="javascript:clickPage('${i}')">${i}</a></li>`;
    }

    let preview = document.getElementById("preview");
    let next = document.getElementById("next");
    if (page == 1) {
        preview.style.visibility = "hidden";
    } else {
        preview.style.visibility = "visible";
    }
    if (page == pageMax) {
        next.style.visibility = "hidden";
    } else {
        next.style.visibility = "visible";
    }
    let indexMinOnPage = (page - 1) * recordsPerPage;
    let indexMaxOnPage = page * recordsPerPage;
    if (indexMaxOnPage > allArrStudent.length) {
        indexMaxOnPage = allArrStudent.length;
    }

    let listCLass = document.getElementById("listCLass");
    listCLass.innerHTML = "";
    // 3.3. Render dữ liệu với indexMinOnPage<=index<indexMaxOnPage
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
        listCLass.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${allArrStudent[index].studentId}</td>
                <td>${allArrStudent[index].studentName}</td>
                <td>${allArrStudent[index].year}</td>
                <td>${allArrStudent[index].address}</td>
                <td>${allArrStudent[index].email}</td>
                <td>${allArrStudent[index].phone}</td>
                <td>${allArrStudent[index].sex ? "Nam" : "Nữ"}</td>
                <td>${allArrStudent[index].status}</td>
                <td>${allArrStudent[index].classId}</td>
                <td>
                <button id="updateStudent" onclick="initUpdateStudent('${allArrStudent[index].studentId}')" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#updateStudent"  ></i>
                <button id="deleteStudent" onclick="initDeleteStudent('${allArrStudent[index].studentId}')" class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#deleteStudentModal" ></i>
                </td>
            </tr>
        `;
    }
}

// Hàm tính tổng số trang trên tổng dữ liệu
function getTotalPage(allArrStudent) {
    return Math.ceil(allArrStudent.length / recordsPerPage);
}
// Hàm render dữ liệu theo trang khi click vào các trang
function clickPage(page) {
    currentPage = page;
    allArrStudent = getAllArrStudent();
    renderData(page, allArrStudent);
}
// Hàm previewPage
function previewPage() {
    currentPage--;
    allArrStudent = getAllArrStudent();
    renderData(currentPage, allArrStudent);
}
// Hàm nextPage
function nextPage() {
    currentPage++;
    allArrStudent = getAllArrStudent();
    renderData(currentPage, allArrStudent);
}


function createStudent() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let allArrStudent = getAllArrStudent();
    let courseId = document.getElementById("courseIdCreate").value;
    let classId = document.getElementById("classIdCreate").value;
    let studentId = document.getElementById("studentIdCreate").value;
    let studentName = document.getElementById("studentNameCreate").value;
    let year = document.getElementById("yearCreate").value;
    let address = document.getElementById("addressCreate").value;
    let email = document.getElementById("emailCreate").value;
    let phone = document.getElementById("phoneCreate").value;
    let sex = document.querySelector("input[name=statusCreate]:checked").value == "true" ? true : false;
    let status = document.getElementById("studentStatusCreate").value;
    let newStudent = { courseId, classId, studentId, studentName, year, address, email, phone, sex, status }
    if (!validateStudentId(studentId)) {
        return;
    }

    let courseNameId = newStudent.courseId;
    let courseIndex = getCourseById(arrCourse, courseNameId)
    let classNameId = newStudent.classId;
    let classIndex = getClassById(arrCourse, classNameId)
    console.log(courseIndex);
    console.log(classIndex);
    delete newStudent.courseId;
    delete newStudent.classId;
    if (courseIndex === -1 || classIndex === -1) {
       
        return;
    }

    console.log(arrCourse[courseIndex]);
    arrCourse[courseIndex].arrClass[classIndex].arrStudent.push(newStudent)

    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

    resetForm();

    allArrStudent = getAllArrStudent();

    renderData(currentPage, allArrStudent)
}
function validateStudentId(studentId) {
    let allArrStudent = getAllArrStudent();
    let indexToFind = allArrStudent.findIndex(
        (element) => element.studentId === studentId
    );
    if (indexToFind >= 0) {
        //Đã tồn tại mã danh mục trong arrStudent
        // document.getElementById("studentId").style.backgroundColor=="yellow";
        alert("Mã học sinh đã tồn tại");
        return false;
    }
    // document.getElementById("studentId").style.backgroundColor =="";
    return true;
}
document.getElementById("btnCreateStudent").addEventListener("click", function (event) {
    event.preventDefault();
    createStudent();
});
function resetForm() {
    document.getElementById("courseIdCreate").value = "";
    document.getElementById("classIdCreate").value = "";
    document.getElementById("studentIdCreate").value = "";
    document.getElementById("studentNameCreate").value = "";
    document.getElementById("yearCreate").value = "";
    document.getElementById("addressCreate").value = "";
    document.getElementById("emailCreate").value = "";
    document.getElementById("phoneCreate").value = "";
    document.getElementById("maleCreate").checked = true;
    document.getElementById("none").selected = true;

}
function getCourseById(arrCourse, courseId) {
    for (let index1 = 0; index1 < arrCourse.length; index1++) {
        if (arrCourse[index1].courseId === courseId) {
            return index1;
        }
    }
    return -1;
}

function getClassById(arrCourse, classId) {

    for (let index = 0; index < arrCourse.length; index++) {
        if (arrCourse[index].classId === classId) {
            return index;
        }

        for (let index2 = 0; index2 < arrCourse[index].arrClass.length; index2++) {
            if (arrCourse[index].arrClass[index2].classId === classId) {
                return index2;
            }
        }
    }
    return -1;
}
function getStudentById(allArrStudent, studentId) {
    for (let index3 = 0; index3 < allArrStudent.length; index3++) {
        if (allArrStudent[index3].studentId === studentId) {
            return index3;
        }
    }
    return -1;
}
function initUpdateStudent(studentId){
    
    let allArrStudent = getAllArrStudent();
    let index = getStudentById(allArrStudent, studentId);

    document.getElementById("courseIdUpdate").readOnly = true;
    document.getElementById("classIdUpdate").readOnly = true;
    document.getElementById("studentIdUpdate").readOnly = true;

    document.getElementById("courseIdUpdate").value = allArrStudent[index].courseId;
    document.getElementById("classIdUpdate").value = allArrStudent[index].classId;
    document.getElementById("studentIdUpdate").value = allArrStudent[index].studentId;
    document.getElementById("studentNameUpdate").value = allArrStudent[index].studentName;
    document.getElementById("yearUpdate").value = allArrStudent[index].year;
    document.getElementById("addressUpdate").value = allArrStudent[index].address;
    document.getElementById("emailUpdate").value = allArrStudent[index].email;
    document.getElementById("phoneUpdate").value = allArrStudent[index].phone;
    if (allArrStudent[index].sex == "true") {
        document.getElementById("maleUpdate").value = "Nam";
    } else {
        document.getElementById("femaleUpdate").value = "Nữ";
    }
    document.getElementById("studentStatusUpdate").value = allArrStudent[index].status

}
function getDataFormEdit(){

    let courseId = document.getElementById("courseIdUpdate").value;
    let classId = document.getElementById("classIdUpdate").value;
    let studentId = document.getElementById("studentIdUpdate").value;
    let studentName = document.getElementById("studentNameUpdate").value;
    let year = document.getElementById("yearUpdate").value;
    let address = document.getElementById("addressUpdate").value;
    let email = document.getElementById("emailUpdate").value;
    let phone = document.getElementById("phoneUpdate").value;
    let sex = document.querySelector("input[name=statusUpdate]:checked").value == "true" ? true : false;
    let status = document.getElementById("studentStatusUpdate").value;
    let updateStudent = { courseId, classId, studentId, studentName, year, address, email, phone, sex, status };
    return updateStudent;
}
function updateStudent() {
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    let updateStudent = getDataFormEdit();
    
    let courseIndex = getCourseById(arrCourse, updateStudent.courseId)
    let classIndex = getClassById(arrCourse, updateStudent.classId)
    console.log(arrCourse[courseIndex]);
    let studentIndexUpdate = getStudentById(arrCourse[courseIndex].arrClass[classIndex].arrStudent,updateStudent.studentId);
    arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate] = updateStudent;

    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    
    resetForm();

    allArrStudent = getAllArrStudent();

    renderData(currentPage, allArrStudent)
}

document.getElementById("btnUpdateStudent").addEventListener("click", function (event) {
    event.preventDefault();
    updateStudent();

})
function initDeleteStudent(studentId) {
    let allArrStudent = getAllArrStudent();
    let index = getStudentById(allArrStudent, studentId);
    document.getElementById("courseIdUpdate").value = allArrStudent[index].courseId;
    let btnDelete = document.getElementById("btnDelete");
    btnDelete.onclick = () => {
        deleteStudent(studentId)
    }
}
function deleteStudent(studentId){
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];

    let allArrStudent = getAllArrStudent();

    let courseIndex = getStudentById(allArrStudent, studentId);
    console.log(courseIndex);
    let currentCourse = allArrStudent[courseIndex];
    console.log(currentCourse);
    let currentCourseIndex = getCourseById(arrCourse, currentCourse.courseId);
    console.log(currentCourseIndex);

    let currentClass = allArrStudent[courseIndex];
    
    let currentClassIndex = getClassById(arrCourse, currentClass.classId);

    let indexStudent = getStudentById(arrCourse[currentCourseIndex].arrClass[currentClassIndex].arrStudent, studentId);

    arrCourse[currentCourseIndex].arrClass[currentClassIndex].arrStudent.splice(indexStudent, 1);

    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

    allArrStudent = getAllArrStudent();

    renderData(1, allArrStudent);
}
let btnSearch = document.getElementById("btnSearchStudent");

btnSearch.addEventListener("click", function (event) {
    event.preventDefault();
    let allArrStudent = getAllArrStudent();
    let studentNameSearch = document.getElementById("studentNameSearch").value;
    console.log(studentNameSearch);
    if (studentNameSearch) {
        let listStudentSearch = allArrStudent.filter(student => student.studentName.includes(studentNameSearch));
        renderData(1, listStudentSearch);
    } else {
        renderData(1, allArrStudent)

    }

})
// Hàm sắp xếp danh mục
function handSortStudent() {
    let sortTarget = document.getElementById("sort").value;
    console.log(sortTarget);
    let allArrStudent = getAllArrStudent();
    switch (sortTarget) {
        case "studentNameASC":
            // sắp xếp theo tên danh mục tăng dần: sử dụng hàm sort (tìm hiểu thêm)
            allArrStudent.sort((a, b) => (a.studentName > b.studentName) ? 1 : (a.studentName < b.studentName) ? -1 : 0);
            break;
        case "studentNameDESC":
            // Sắp xếp theo tên danh mục giảm dần
            allArrStudent.sort((a, b) => (a.studentName > b.studentName) ? -1 : (a.studentName < b.studentName) ? 1 : 0);
       
    }
    renderData(1, allArrStudent);
}
document.onload = renderData(1, allArrStudent);