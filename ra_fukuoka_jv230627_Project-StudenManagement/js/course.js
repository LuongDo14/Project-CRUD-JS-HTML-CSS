
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
function openNav() {
    document.getElementById("side_bar").style.width = "300px";
}

function closeNav() {
    document.getElementById("side_bar").style.width = "0";
}
let btnlogout = JSON.parse(localStorage.getItem("studentManagement")) || [];
document.getElementById("btnLogout").addEventListener("click", function () {
    //Xử lý logout
    //1. Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");
    //2. Điều hướng về trang login
    window.location.href = "login_page.html";
})
let action = "Create";
let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
let currentPage = 1;
let recordsPerPage = 3;

function renderData(page, arrCourse) {
    // 1. Lấy arrCourse từ localStorage 
    console.log(arrCourse);
    // Trường hợp trong localStorage chưa có key là arrCourse -> khởi tạo arrCourse = []
    // let arrCourse = localStorage.getItem("arrCourse") ? JSON.parse(localStorage.getItem("arrCourse")) : [];
    // 2. Validate page
    let pageMax = getTotalPage(arrCourse);
    if (page < 1) {
        page = 1;
    }
    if (page > pageMax) {
        page = pageMax;
    }

    let listPages = document.getElementById("listPages");
    listPages.innerHTML = "";
    for (let i = 1; i <= pageMax; i++) {
        listPages.innerHTML += `
        <li><a href="javascript:clickPage('${i}')">${i}</a></li>`;
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
    if (indexMaxOnPage > arrCourse.length) {
        indexMaxOnPage = arrCourse.length;
    }

    // 3.3. Render dữ liệu với indexMinOnPage <= index < indexMaxOnPage
    let listCourse = document.getElementById("listCourse");
    listCourse.innerHTML = "";
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
        listCourse.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${arrCourse[index].courseId}</td>
                <td>${arrCourse[index].courseName}</td>
                <td>${arrCourse[index].courseTime}</td>
                <td>${arrCourse[index].status ? "Hoạt động" : "Không hoạt động"}</td>
                <td>
                <button id="updateCourse" onclick="initEdit('${arrCourse[index].courseId}')" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#updateCourse"  ></i>
                <button id="deleteCourse" onclick="deleteCourse('${arrCourse[index].courseId}')" class="fa-solid fa-trash"  ></i>
                </td>
            </tr>
        `;
    }
}

// Hàm tính tổng số trang trên tổng dữ liệu
function getTotalPage(arrCourse) {
    return Math.ceil(arrCourse.length / recordsPerPage);
}
// Hàm render dữ liệu theo trang khi click vào các trang
function clickPage(page) {
    currentPage = page;
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    renderData(page, arrCourse);
}
// Hàm previewPage
function previewPage() {
    currentPage--;
    // render lại dữ liệu lên table
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    renderData(currentPage, arrCourse);
}
// Hàm nextPage
function nextPage() {
    currentPage++;
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];

    renderData(currentPage, arrCourse);
}
var newCourseModal = new bootstrap.Modal(document.getElementById('newCourse'), {
    keyboard: false
})
function createCourse() {
    //1. Lấy dữ liệu arrCourse từ localStorage
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    //2. Lấy dữ liệu trên modal
    let courseId = document.getElementById("courseIdCreate").value;
    let courseName = document.getElementById("courseNameCreate").value;
    let courseTime = document.getElementById("courseTimeCreate").value;
    let status = document.querySelector("input[name=statusCreate]:checked").value == "true" ? true : false;
    let newCourse = { courseId, courseName, courseTime, status, arrClass: [] };
    if (!validateCourseId(courseId)) {
        return;
    }
    if (!validateCourseName(courseName)) {
        return;
    }
    //3. push dư liệu thêm mới vào arrCourse
    arrCourse.push(newCourse);
    //4. Đẩy arrCourse vào localStorage
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    newCourseModal.hide();
    //5. Đóng modal
    resetForm();
    //6. render lại dữ liệu
    renderData(currentPage, arrCourse);

}
function validateCourseId(courseId) {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let indexToFind = arrCourse.findIndex(
        (element) => element.courseId === courseId
    );
    if (indexToFind >= 0) {
        //Đã tồn tại mã danh mục trong arrCourse
        // document.getElementById("courseId").style.backgroundColor=="yellow";
        alert("Mã khóa học đã tồn tại");
        return false;
    }
    // document.getElementById("courseId").style.backgroundColor =="";
    return true;
}
function validateCourseName(courseName) {
    let indexToFind = arrCourse.findIndex(
        (element) => element.courseName === courseName
    );
    //Nếu indexToFind>=0 tức là index đã tồn tại trong mảng
    if (indexToFind >= 0) {
        document.getElementById("courseNameCreate").style.backgroundColor == "yellow";
        alert("Tên khóa học đã tồn tại");
        return false;
    }
    document.getElementById("courseNameCreate").style.backgroundColor == "";
    return true;
}
// Hàm resetForm
function resetForm() {
    document.getElementById("courseIdCreate").value = "";
    document.getElementById("courseNameCreate").value = "";
    document.getElementById("courseTimeCreate").value = "";
    document.getElementById("activeCreate").checked = true;
}
function getDataForm() {
    let courseId = document.getElementById("courseIdCreate").value;
    let courseName = document.getElementById("courseNameCreate").value;
    let courseTime = document.getElementById("courseTimeCreate").value;
    let status = document.querySelector("input[name='statusCreate']:checked").value == "true" ? true : false;
    let updateCourse = { courseId, courseName, courseTime, status, arrClass: [] };
    return updateCourse;
}
function getDataFormEdit() {
    let courseId = document.getElementById("courseIdUpdate").value;
    let courseName = document.getElementById("courseNameUpdate").value;
    let courseTime = document.getElementById("courseTimeUpdate").value;
    let status = document.querySelector("input[name='statusUpdate']:checked").value == "true" ? true : false;
    let updateCourse = { courseId, courseName, courseTime, status, arrClass: [] };
    return updateCourse;
}
// Hàm cập nhật danh mục

var updateCourseModal = new bootstrap.Modal(document.getElementById('updateCourse'), {
    keyboard: false
})

// Hàm hiển thị thông tin danh mục cần cập nhật lên Input Form
function initEdit(courseId) {
    // 1. Lấy arrCourse từ localStorage
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    // 2. Lấy thông tin danh mục cần cập nhật
    updateCourseModal.show();
    let indexUpdate = getCourseById(courseId);
    // 3. Hiển thị thông tin danh mục cần cập nhật lên Input Form
    if (indexUpdate >= 0) {
        document.getElementById("courseIdUpdate").value = arrCourse[indexUpdate].courseId;
        document.getElementById("courseIdUpdate").readOnly = true;
        document.getElementById("courseNameUpdate").value = arrCourse[indexUpdate].courseName;
        document.getElementById("courseTimeUpdate").value = arrCourse[indexUpdate].courseTime;
        if (arrCourse[indexUpdate].status == "true") {
            document.getElementById("activeUpdate").value = "Hoạt động";
        } else {
            document.getElementById("inActiveUpdate").value = "Không hoạt động";
        }
    }
    action = "Edit";
}
let modalCloseUpdateData = document.getElementById("editCourse");
modalCloseUpdateData.addEventListener("hide.bs.modal", function () {
    clearForm();
    document.getElementById("courseId").readOnly = false;
});


function updateCourse() {

    let updateCourse = getDataFormEdit();
    let indexUpdate = getCourseById(updateCourse.courseId);
    if (indexUpdate > -1) {
        arrCourse[indexUpdate] = updateCourse;
    }
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    action = "Create";
    resetForm();
    updateCourseModal.hide();
    renderData(currentPage, arrCourse);
}
document.getElementById("btnUpdateCourse").addEventListener("click", function (event) {
    event.preventDefault();
    updateCourse();
})
document.getElementById("btnCreateCourse").addEventListener("click", function (event) {
    event.preventDefault();
    if (action == "Create") {
        createCourse();
    } else {
        updateCourse();
    }
});
let deleteCourseModal = new bootstrap.Modal(document.getElementById("deleteCourseModal"), {
    keyboard: false,
});
// Hàm xóa danh mục sản phẩm
function deleteCourse(courseId) {
    console.log(courseId);
    deleteCourseModal.show();
    let btnDelete = document.getElementById("btnDelete");
    let btnNoDelete = document.getElementById("btnNoDelete");
    btnDelete.onclick = function () {
        let index = getCourseById(courseId);
        if (arrCourse[index].arrClass.length >= 1) {
            deleteCourseModal.hide();
        } else {
            arrCourse.splice(index, 1);
            localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
            renderData(currentPage, arrCourse);
            deleteCourseModal.hide();
        }
    };
    btnNoDelete.onclick = function () {
        deleteCourseModal.hide();
    };
}
function getCourseById(courseId) {
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    for (let index = 0; index < arrCourse.length; index++) {
        console.log(arrCourse);
        console.log(courseId);
        if (arrCourse[index].courseId == courseId) {
            return index;
        }
    }
    return -1;
}
let btnSearch = document.getElementById("btnSearchCourseName");

btnSearch.addEventListener("click", function (event) {
    event.preventDefault();
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    let courseNameSearch = document.getElementById("searchCourseName").value;
    let listCourseSearch = arrCourse.filter(course => course.courseName.includes(courseNameSearch));
    // 4. render data
    renderData(1, listCourseSearch);
})
// Hàm sắp xếp danh mục
function handSortCatalog() {
    // 1. Lấy tiêu chí sắp xếp
    let sortTarget = document.getElementById("sort").value;
    console.log(sortTarget);
    // 2. Lấy arrCourse từ localStorage
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    // 3. Sắp xếp theo các tiêu chí
    switch (sortTarget) {
        case "courseNameABC":
            // sắp xếp theo tên danh mục tăng dần: sử dụng hàm sort (tìm hiểu thêm)
            arrCourse.sort((a, b) => (a.courseName > b.courseName) ? 1 : (a.courseName < b.courseName) ? -1 : 0);
            break;
        case "courseNameDESC":
            // Sắp xếp theo tên danh mục giảm dần
            arrCourse.sort((a, b) => (a.courseName > b.courseName) ? -1 : (a.courseName < b.courseName) ? 1 : 0);
            break;
       
    }
    renderData(1, arrCourse);
}

document.onload = renderData(1, arrCourse);
