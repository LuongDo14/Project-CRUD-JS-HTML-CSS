
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
let btnlogout = JSON.parse(localStorage.getItem("userSystems")) || [];
document.getElementById("btnLogout").addEventListener("click", function () {
    // localStorage.removeItem("userLogin");
    window.location.href = "login_page.html";
})
// let action = "Create";
let userSystems = JSON.parse(localStorage.getItem("userSystems")) || [];
let currentPage = 1;
let recordsPerPage = 3;

function renderData(page, userSystems) {
    //     // 1. Lấy userSystems từ localStorage 
    //     console.log(userSystems);
    //     // Trường hợp trong localStorage chưa có key là userSystems -> khởi tạo userSystems = []
    //     // let userSystems = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    //     // 2. Validate page
    let pageMax = getTotalPage(userSystems);
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
    if (indexMaxOnPage > userSystems.length) {
        indexMaxOnPage = userSystems.length;
    }

    //     // 3.3. Render dữ liệu với indexMinOnPage <= index < indexMaxOnPage
    let listCourse = document.getElementById("listCourse");
    listCourse.innerHTML = "";
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
        listCourse.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${userSystems[index].email}</td>
                <td>${userSystems[index].password}</td>
                <td>${userSystems[index].fullName}</td>
                <td>${userSystems[index].status ? "Đang hoạt động" : "Đang bị khóa"}</td>
                <td>
                <button id="updateAccount" onclick="initEdit('${userSystems[index].email}')" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#updateAccount"  ></i>
                <button id="deleteAccount" onclick="initDeleteAccount('${userSystems[index].email}')" class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#deleteAccountModal" ></i>
                </td>
                <td>
                <button id="lockAccount" onclick="lockAccount('${userSystems[index].email}')"  data-bs-toggle="modal" data-bs-target="#lockAccountModal"  <i class="fa-solid fa-lock-open"></i>
                <button id="unLockAccount" onclick="unLockAccount('${userSystems[index].email}')"  data-bs-toggle="modal" data-bs-target="#unLockAccountModal"   <i class="fa-solid fa-lock"></i>
                </td>
            </tr>
        `;
    }
}
{}
// Hàm tính tổng số trang trên tổng dữ liệu
function getTotalPage(userSystems) {
    return Math.ceil(userSystems.length / recordsPerPage);
}
// Hàm render dữ liệu theo trang khi click vào các trang
function clickPage(page) {
    currentPage = page;
    let userSystems = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    renderData(page, userSystems);
}
// Hàm previewPage
function previewPage() {
    currentPage--;
    // render lại dữ liệu lên table
    let userSystems = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    renderData(currentPage, userSystems);
}
// Hàm nextPage
function nextPage() {
    currentPage++;
    let userSystems = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    renderData(currentPage, userSystems);
}

function createAccount() {
    let userSystems = JSON.parse(localStorage.getItem("userSystems")) || [];

    let email = document.getElementById("emailCreate").value;
    let fullName = document.getElementById("accountPasswordCreate").value;
    let password = document.getElementById("fullNameCreate").value;
    let status = document.querySelector("input[name=statusCreate]:checked").value == "true" ? true : false;
    let newAccount = { email, fullName, password, status };
    if (!validateEmail(email)) {
        return;
    }
    console.log(status);
    userSystems.push(newAccount);
    localStorage.setItem("userSystems", JSON.stringify(userSystems));
    resetForm();
    renderData(currentPage, userSystems);

}
document.getElementById("btnCreateAccount").addEventListener("click", function (event) {
    event.preventDefault();
    createAccount();
});
function resetForm() {
    document.getElementById("emailCreate").value = "";
    document.getElementById("accountPasswordCreate").value = "";
    document.getElementById("fullNameCreate").value = "";
    document.getElementById("activeCreate").checked = true;
}
function getDataForm() {
    let email = document.getElementById("emailCreate").value;
    let fullName = document.getElementById("accountPasswordCreate").value;
    let password = document.getElementById("fullNameCreate").value;
    let status = document.querySelector("input[name='statusCreate']:checked").value == "true" ? true : false;
    let updateAccount = { email, fullName, password, status };
    return updateAccount;
}
function getDataFormEdit() {
    let email = document.getElementById("emailUpdate").value;
    let fullName = document.getElementById("passwordUpdate").value;
    let password = document.getElementById("fullNameUpdate").value;
    let status = document.querySelector("input[name='statusUpdate']:checked").value == "true" ? true : false;
    let updateAccount = { email, fullName, password, status };
    return updateAccount;
}
function getDataFormLockUnlock() {
    let
}
function validateEmail(email) {
    let userSystems = JSON.parse(localStorage.getItem("userSystems")) || [];
    let indexToFind = userSystems.findIndex(
        (element) => element.email === email
    );
    if (indexToFind >= 0) {
        //Đã tồn tại mã danh mục trong userSystems
        // document.getElementById("email").style.backgroundColor=="yellow";
        alert("Mã khóa học đã tồn tại");
        return false;
    }
    // document.getElementById("email").style.backgroundColor =="";
    return true;
}
function initEdit(email) {
    // 1. Lấy userSystems từ localStorage
    let userSystems = JSON.parse(localStorage.getItem("userSystems")) || [];
    // 2. Lấy thông tin danh mục cần cập nhật
    let indexUpdate = getUserByEmail(email);
    // 3. Hiển thị thông tin danh mục cần cập nhật lên Input Form
    if (indexUpdate >= 0) {
        document.getElementById("emailUpdate").value = userSystems[indexUpdate].email;
        document.getElementById("emailUpdate").readOnly = true;
        document.getElementById("passwordUpdate").value = userSystems[indexUpdate].fullName;
        document.getElementById("fullNameUpdate").value = userSystems[indexUpdate].password;
        if (userSystems[indexUpdate].status == "Đang hoạt động") {
            document.getElementById("activeUpdate").value = "Đang hoạt động";
        } else {
            document.getElementById("inActiveUpdate").value = "Đang bị khóa";
        }
        console.log(userSystems[indexUpdate].password);
        console.log(userSystems[indexUpdate].status);
    }
}
function updateAccount() {

    let updateAccount = getDataFormEdit();
    let indexUpdate = getUserByEmail(updateAccount.email);
    if (indexUpdate > -1) {
        userSystems[indexUpdate] = updateAccount;
    }
    localStorage.setItem("userSystems", JSON.stringify(userSystems));
    resetForm();
    renderData(currentPage, userSystems);
}
document.getElementById("btnUpdateAccount").addEventListener("click", function (event) {
    event.preventDefault();
    updateAccount();
});
function initDeleteAccount(email) {
    let btnDelete = document.getElementById("btnDelete");
    btnDelete.onclick = () => {
        deleteAccount(email)
    }
}
function deleteAccount(email) {
    console.log(email);
    let index = getUserByEmail(email);
    userSystems.splice(index, 1);
    localStorage.setItem("userSystems", JSON.stringify(userSystems));
    renderData(currentPage, userSystems);
};
function getUserByEmail(email) {
    let userSystems = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    for (let index = 0; index < userSystems.length; index++) {
        if (userSystems[index].email == email) {
            return index;
        }
    }
    return -1;
}
function lockAccount(email) {
    let btnLock = document.getElementById("btnLock");
    btnLock.onclick = function () {
        let index = getUserByEmail(email);
        userSystems[index].status = true;
        localStorage.setItem("userSystems", JSON.stringify(userSystems));
        renderData(currentPage, userSystems);
    }
};
function unLockAccount(email) {
    let btnUnLock = document.getElementById("btnUnLock");
    btnUnLock.onclick = function () {
        let index = getUserByEmail(email);
        userSystems[index].status = false;
        localStorage.setItem("userSystems", JSON.stringify(userSystems));
        renderData(currentPage, userSystems);
    }
};
let btnSearch = document.getElementById("btnSearchAccountName");

btnSearch.addEventListener("click", function (event) {
    event.preventDefault();
    let userSystems = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    let accountNameSearch = document.getElementById("searchAccountName").value;
    let listAccountSearch = userSystems.filter(account => account.fullName.includes(accountNameSearch));
    // 4. render data
    renderData(1, listAccountSearch);
})
// Hàm sắp xếp danh mục
function handSortAccount() {
    // 1. Lấy tiêu chí sắp xếp
    let sortTarget = document.getElementById("sort").value;
    console.log(sortTarget);
    // 2. Lấy userSystems từ localStorage
    let userSystems = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    // 3. Sắp xếp theo các tiêu chí
    switch (sortTarget) {
        case "fullNameASC":
            // sắp xếp theo tên danh mục tăng dần: sử dụng hàm sort (tìm hiểu thêm)
            userSystems.sort((a, b) => (a.fullName > b.fullName) ? 1 : (a.fullName < b.fullName) ? -1 : 0);
            break;
        case "fullNameDESC":
            // Sắp xếp theo tên danh mục giảm dần
            userSystems.sort((a, b) => (a.fullName > b.fullName) ? -1 : (a.fullName < b.fullName) ? 1 : 0);
            break;
       
    }
    renderData(1, userSystems);
}

document.onload = renderData(1, userSystems);
