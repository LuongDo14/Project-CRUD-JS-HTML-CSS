let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
document.getElementById("btnLogout").addEventListener("click", function () {
    //Xử lý logout
    //1. Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");
    //2. Điều hướng về trang login
    window.location.href = "login_page.html";
})

function thongKe() {
    let cntCourse = 0;
    let cntClass = 0;
    let cntClassActive = 0;
    let cntClassFinal = 0;
    let cntClassPending = 0;
    let cntStudent = 0;
    let cntStudentout = 0
    let cntStudentwait = 0;
    let cntStudentstudy = 0;
    let cntStudentcongrat = 0;
    studentManagement.forEach(course => {
        cntCourse++;
        course.arrClass.forEach(classItem => {
            cntClass++;
            if (classItem.status == "Hoạt động") {
                cntClassActive++;
            };
            if (classItem.status == "Kết thúc") {
                cntClassFinal++;
            };
            if (classItem.status == "Đang chờ") {
                cntClassPending++;
            };
            classItem.arrStudent.forEach(student => {
                cntStudent++;
                if (student.status == "Bảo lưu") {
                cntStudentout++;    
                };

                if (student.status == "Đang học") {
                cntStudentstudy++; 
                };

                 if (student.status == "Chờ lớp") {
                cntStudentwait++;    
                };

                 if (student.status == "Đình chỉ") {
                cntStudentout++;    
                };
                
                if (student.status == "Tốt nghiệp") {
                    cntStudentcongrat++;   
                }
            })
        })
        
    })
    document.getElementById("cntCourse").innerText += cntCourse;
    document.getElementById("cntClass").innerText += cntClass;
    document.getElementById("cntClassActive").innerText += cntClassActive;
    document.getElementById("cntClassFinal").innerText += cntClassFinal;
    document.getElementById("cntClassPending").innerText += cntClassPending;
    
    document.getElementById("cntStudent").innerText += cntStudent;
    document.getElementById("cntStudentout").innerText += cntStudentout;
    document.getElementById("cntStudentwait").innerText += cntStudentwait;
    document.getElementById("cntStudentstudy").innerText += cntStudentstudy;
    document.getElementById("cntStudentcongrat").innerText += cntStudentcongrat;

}
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
window.load = thongKe();
