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
function renderData(page, allArrClasses) {

    let pageMax = getTotalPage(allArrClasses);
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
    if (indexMaxOnPage > allArrClasses.length) {
        indexMaxOnPage = allArrClasses.length;
    }

    let listCLass = document.getElementById("listCLass");
    listCLass.innerHTML = "";

    // 3.3. Render dữ liệu với indexMinOnPage<=index<indexMaxOnPage
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
        listCLass.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${allArrClasses[index].classId}</td>
                <td>${allArrClasses[index].className}</td>
                <td>${allArrClasses[index].lecturer}</td>
                <td>${allArrClasses[index].description}</td>
                <td>${allArrClasses[index].totalNumber}</td>
                <td>${allArrClasses[index].status}</td>
                <td>${allArrClasses[index].courseName}</td>
                <td>
                <button id="updateClass" onclick="initEdit('${allArrClasses[index].classId}')"  class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#updateClass"  ></i>
                <button id="btnDeleteClass" onclick="initDeleteClass('${allArrClasses[index].classId}')" class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#deleteClassModal" ></i>
                </td>
            </tr>
        `;
    }
}

// Hàm tính tổng số trang trên tổng dữ liệu
function getTotalPage(allArrClasses) {
    return Math.ceil(allArrClasses.length / recordsPerPage);
}
// Hàm render dữ liệu theo trang khi click vào các trang
function clickPage(page) {
    currentPage = page;
    renderData(page, allArrClasses);
}
// Hàm previewPage
function previewPage() {
    currentPage--;
    renderData(currentPage, allArrClasses);
}
// Hàm nextPage
function nextPage() {
    currentPage++;
    renderData(currentPage, allArrClasses);
}
// var newClassModal = new bootstrap.Modal(document.getElementById("createNewClass"), {
//     keyboard: false
// })

function createClass() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let allArrClasses = getAllArrClasses();
    let courseId = document.getElementById("courseIdCreate").value;
    let classId = document.getElementById("classIdCreate").value;
    let className = document.getElementById("classNameCreate").value;
    let lecturer = document.getElementById("lecturer").value;
    let description = document.getElementById("description").value;
    let totalNumber = document.getElementById("totalNumber").value;
    let status = document.getElementById("statusCreate").value;
    // let courseName = document.getElementById("courseNameCreate").value;
    let newClass = { courseId, classId, className, lecturer, description, totalNumber, status, arrStudent:[] };
    if (!validateCourseId(classId)) {
        return;
    }
    // if (!validateCourseName(className)) {
    //     return;
    // }
    let courseNameId = newClass.courseId;
    let courseIndex = getCourseById(arrCourse, courseNameId)
    console.log(courseNameId);
    delete newClass.courseId;
    console.log(courseIndex);
    if (courseIndex == -1) {
        return;
    }

    arrCourse[courseIndex].arrClass.push(newClass)
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

    resetForm();

    allArrClasses = getAllArrClasses();

    renderData(currentPage, allArrClasses);

}
function validateCourseId(classId) {
    let allArrClasses = getAllArrClasses();
    let indexToFind = allArrClasses.findIndex(
        (element) => element.classId === classId
    );
    if (indexToFind >= 0) {
        //Đã tồn tại mã danh mục trong arrCourse
        // document.getElementById("classId").style.backgroundColor=="yellow";
        alert("Mã lớp học đã tồn tại");
        return false;
    }
    // document.getElementById("classId").style.backgroundColor =="";
    return true;
}
// function validateCourseName(className) {
//     let allArrClasses = getAllArrClasses();
//     let indexToFind = allArrClasses.findIndex(
//         (element) => element.className === className
//     );
//     //Nếu indexToFind>=0 tức là index đã tồn tại trong mảng
//     if (indexToFind >= 0) {
//         document.getElementById("classNameCreate").style.backgroundColor == "yellow";
//         alert("Tên lớp học đã tồn tại");
//         return false;
//     }
//     document.getElementById("classNameCreate").style.backgroundColor == "";
//     return true;
// }
// Hàm lấy dữ liệu trên inputForm
function getDataForm() {
    let classId = document.getElementById("classIdCreate").value;
    let className = document.getElementById("classNameCreate").value;
    let lecturer = document.getElementById("lecturer").value;
    let description = document.getElementById("description").value;
    let totalNumber = document.getElementById("totalNumber").value;
    let status = document.getElementById("statusCreate").value;
    // let courseName = document.getElementById("courseNameCreate").value;
    let arrClass = { classId, className, lecturer, description, totalNumber, status, arrStudent:[] };
    return arrClass;
}
function getDataFormEdit() {
    let courseId = document.getElementById("courseIdUpdate").value;
    let classId = document.getElementById("classIdUpdate").value;
    let className = document.getElementById("classNameUpdate").value;
    let lecturer = document.getElementById("lecturerUpdate").value;
    let description = document.getElementById("descriptionUpdate").value;
    let totalNumber = document.getElementById("totalNumberUpdate").value;
    let status = document.getElementById("statusUpdate").value;
    let courseName = document.getElementById("courseNameUpdate").value;
    let arrClass = { courseId, classId, className, lecturer, description, totalNumber, status, courseName, arrStudent:[] };
    return arrClass;
}
// Hàm resetForm
function resetForm() {
    document.getElementById("courseIdCreate").value = "";
    document.getElementById("classIdCreate").value = "";
    document.getElementById("classNameCreate").value = "";
    document.getElementById("lecturer").value = "";
    document.getElementById("description").value = "";
    document.getElementById("totalNumber").value = "";
    document.getElementById("none").selected = true;
}
// var updateClassModal = new bootstrap.Modal(document.getElementById('updateClass'), {
//     keyboard: false
// })
function updateArrClass(arrCourse) {
    arrClass = [];
    arrCourse.forEach((course) => {
        course.arrClass.forEach((classItem) => {
            arrClass = arrClass.concat({
                courseId: course.courseId,
                courseName: course.courseName,
                ...classItem,
            })
        });
    });
    console.log(arrClass);
}
document.getElementById("btnCreateClass").addEventListener("click", function (event) {
    event.preventDefault();
    if (action == "Create") {
        createClass();
    } else {
        updateClass();
    }
});
function initEdit(classId) {
    let allArrClasses = getAllArrClasses();

    let index = getClassById(allArrClasses, classId);
    document.getElementById("classIdUpdate").readOnly = true;
    document.getElementById("courseIdUpdate").readOnly = true;


    document.getElementById("courseIdUpdate").value = allArrClasses[index].courseId;
    document.getElementById("classIdUpdate").value = allArrClasses[index].classId;
    document.getElementById("classNameUpdate").value = allArrClasses[index].className;
    document.getElementById("lecturerUpdate").value = allArrClasses[index].lecturer;
    document.getElementById("descriptionUpdate").value = allArrClasses[index].description;
    document.getElementById("totalNumberUpdate").value = allArrClasses[index].totalNumber;
    document.getElementById("statusUpdate").value = allArrClasses[index].status;
    document.getElementById("courseNameUpdate").value = allArrClasses[index].courseName;
}
// Hàm　này là lấy class by ID trả về index theo ID còn không thỏa mãn if sẽ trả vê -1
function getClassById(allArrClasses, classId) {
    for (let index = 0; index < allArrClasses.length; index++) {
        if (allArrClasses[index].classId === classId) {
            return index;
        }
    }
    return -1;
}
function getCourseById(arrCourse,courseId) {
    console.log(arrCourse);
    for (let index = 0; index < arrCourse.length; index++) {
        console.log(arrCourse[index].courseId, courseId);
        if (arrCourse[index].courseId === courseId) {
            return index;
        }
    }
    return -1;
}
function getClassIndexInCourse(arrClassInCourse, classId) {
    for (let i = 0; i < arrClassInCourse.length; i++) {
        if (arrClassInCourse[i].classId === classId) {
            return i;
        }
    }
    return -1;
}
// Hàm cập nhật danh mục
function updateClass() {
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    let updateClass = getDataFormEdit();

    let courseIndex = getCourseById(arrCourse, updateClass.courseId)

    let classIndexUpdate = getClassById(
        arrCourse[courseIndex].arrClass,
        updateClass.classId
    );
    arrCourse[courseIndex].arrClass[classIndexUpdate] = updateClass;
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    resetForm();
    
    // Lấy lại dữ liệu từ localStorage
    allArrClasses = getAllArrClasses();

    document.onload = renderData(currentPage, allArrClasses);

}
document.getElementById("btnUpdateClass").addEventListener("click", function (event) {
    event.preventDefault();
    updateClass();

})
// Hàm xóa danh mục sản phẩm
function initDeleteClass(classId) {
    let allArrClasses = getAllArrClasses();
    let index = getClassById(allArrClasses, classId);
    document.getElementById("courseIdUpdate").value = allArrClasses[index].courseId;
    let btnDelete = document.getElementById("btnDelete");
    btnDelete.onclick = () => {
        deleteClass(classId)
    }
}
function deleteClass(classId) {
    // lay arrCourse tu item studentManagement trong localStorage
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    
    // lấy tất cả arrClass trong item studentManagement
    let allArrClasses = getAllArrClasses();

    // lấy index theo classId trong mảng allArrClasses
    let courseIndex = getClassById(allArrClasses, classId);

    // Lấy phần từ thứ courseIndex trong mảng allArrClasses
    let currentCourse = allArrClasses[courseIndex];
    console.log(allArrClasses[courseIndex]);

    // Lấy index theo currentCourse.courseId trong mảng arrCourse
    let currentCourseIndex = getCourseById(arrCourse, currentCourse.courseId);
    console.log(currentCourseIndex);
    
    // Lấy index theo classId
    let indexClass = getClassById(arrCourse[currentCourseIndex].arrClass, classId);

    // Trong mảng arrClass xóa từ vị trí indexClass đi 1 phần từ
    arrCourse[currentCourseIndex].arrClass.splice(indexClass, 1);

    // Save vào localStorage
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

    // Lấy lại dữ liệu từ localStorage
    allArrClasses = getAllArrClasses();

    // Render
    renderData(1, allArrClasses);
}
let btnSearch = document.getElementById("btnSearchClass");

btnSearch.addEventListener("click", function (event) {
    event.preventDefault();
    let allArrClasses = getAllArrClasses();
    let classNameSearch = document.getElementById("classNameSearch").value;
    console.log(classNameSearch);
    if (classNameSearch) {
        let listClassSearch = allArrClasses.filter(classes => classes.className.includes(classNameSearch));
        renderData(1, listClassSearch);
    } else {
        renderData(1, allArrClasses)

    }

})
// Hàm sắp xếp danh mục
function handSortClass() {
    let sortTarget = document.getElementById("sort").value;
    console.log(sortTarget);
    let allArrClasses = getAllArrClasses();
    switch (sortTarget) {
        case "classNameASC":
            // sắp xếp theo tên danh mục tăng dần: sử dụng hàm sort (tìm hiểu thêm)
            allArrClasses.sort((a, b) => (a.className > b.className) ? 1 : (a.className < b.className) ? -1 : 0);
            break;
        case "classNameDESC":
            // Sắp xếp theo tên danh mục giảm dần
            allArrClasses.sort((a, b) => (a.className > b.className) ? -1 : (a.className < b.className) ? 1 : 0);
            break;
       
    }
    renderData(1, allArrClasses);
}

document.onload = renderData(1, allArrClasses);