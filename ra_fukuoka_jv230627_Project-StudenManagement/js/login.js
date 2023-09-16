document.getElementById("btnLogin").addEventListener("click", function (event) {
    //Đăng nhập
    event.preventDefault();
    //1. Lấy thông tin các tài khoản của hệ thống
    let userSystems = JSON.parse(localStorage.getItem("userSystems")) || [];
    //2. Lấy thông tin trên form đăng nhập: email, password
    let email = document.getElementById("staticEmail").value;
    let password = document.getElementById("inputPassword").value;
    //3. Kiểm tra email và passwrord có trùng với tài khoản hệ thống đang ở trạng thái hoạt động
    let indexUserLogin = userSystems.findIndex(user => user.email == email && user.password == password);
    //4. Điều hướng trang sang trang thích hợp
    if (indexUserLogin == -1) {
        document.getElementById("staticEmail").value = "";
        document.getElementById("inputPassword").value = "";
        alert("Email hoặc password không chính xác");
    } else {
        //Kiểm tra trạng thái user
        if (userSystems[indexUserLogin].status) {
            //set thông tin người dùng đăng nhập vào localStorage
            localStorage.setItem("userLogin", email);
            //User đăng nhập đang hoạt động --> điều hướng sang trang chủ
            window.location.href = "home_page.html";
        } else {
            alert("Tài khoản đăng nhập đang bị khóa");
        }
    }

})
