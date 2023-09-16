//Các dữ liệu cần lưu trữ trong localStorage theo cấu trúc sau
//Thông tin khóa học, lớp, sinh viên
let studentManagement = [
    //course Object
    {
        courseId: "RA01",
        courseName: "Khóa học 1",
        courseTime: 1000,
        status: true,
        arrClass: [
            {
                classId: "C001",
                className: "JV230627",
                description: "Mô tả lớp 1",
                totalNumber: 3,
                lecturer: "Nguyễn Duy Quang",
                status: "Hoạt động",//Đang chờ - Kết thúc - Hoạt động
                arrStudent: [
                    {
                        studentId: "SV001",
                        studentName: "Nguyễn Văn A",
                        year: 2003,
                        address: "Hà Nội",
                        email: "a@gmail.com",
                        phone: "0355555555",
                        sex: true,
                        status: "Đang học"//Đang học - Chờ lớp - Bảo lưu - Đình chỉ - Tốt nghiệp
                    },
                    {
                        studentId: "SV002",
                        studentName: "Nguyễn Văn B",
                        year: 2003,
                        address: "Hà Nội",
                        email: "a@gmail.com",
                        phone: "0355555555",
                        sex: true,
                        status: "Đang học"//Đang học - Chờ lớp - Bảo lưu - Đình chỉ - Tốt nghiệp
                    },
                    {
                        studentId: "SV003",
                        studentName: "Nguyễn Văn C",
                        year: 2003,
                        address: "Hà Nội",
                        email: "a@gmail.com",
                        phone: "0355555555",
                        sex: true,
                        status: "Chờ lớp"//Đang học - Chờ lớp - Bảo lưu - Đình chỉ - Tốt nghiệp
                    }
                ]
            },
            {
                classId: "C002",
                className: "JV230508",
                description: "Mô tả lớp 2",
                totalNumber: 2,
                lecturer: "Nguyễn Quốc An",
                status: "Đang chờ",//Đang chờ - Kết thúc - Hoạt động
                arrStudent: [
                    {
                        studentId: "SV004",
                        studentName: "Nguyễn Văn D",
                        year: 2003,
                        address: "Hà Nội",
                        email: "a@gmail.com",
                        phone: "0355555555",
                        sex: true,
                        status: "Bảo lưu"//Đang học - Chờ lớp - Bảo lưu - Đình chỉ - Tốt nghiệp
                    },
                    {
                        studentId: "SV005",
                        studentName: "Nguyễn Văn E",
                        year: 2003,
                        address: "Hà Nội",
                        email: "a@gmail.com",
                        phone: "0355555555",
                        sex: true,
                        status: "Đình chỉ"//Đang học - Chờ lớp - Bảo lưu - Đình chỉ - Tốt nghiệp
                    },
                    {
                        studentId: "SV003",
                        studentName: "Nguyễn Văn C",
                        year: 2003,
                        address: "Hà Nội",
                        email: "a@gmail.com",
                        phone: "0355555555",
                        sex: true,
                        status: "Đang học"//Đang học - Chờ lớp - Bảo lưu - Đình chỉ - Tốt nghiệp
                    }
                ]
            }
        ]
    },
    {
        courseId: "RA02",
        courseName: "Khóa học 2",
        courseTime: 1000,
        status: true,
        arrClass: [
            {
                classId: "C003",
                className: "JV230807",
                description: "Mô tả lớp 3",
                totalNumber: 3,
                lecturer: "Nguyễn Minh Hùng",
                status: "Đang chờ",//Đang chờ - Kết thúc - Hoạt động
                arrStudent: [
                    {
                        studentId: "SV006",
                        studentName: "Nguyễn Văn F",
                        year: 2003,
                        address: "Hà Nội",
                        email: "a@gmail.com",
                        phone: "0355555555",
                        sex: true,
                        status: "Đang học"//Đang học - Chờ lớp - Bảo lưu - Đình chỉ - Tốt nghiệp
                    }
                ]
            }
        ]
    }
]
localStorage.setItem("studentManagement", JSON.stringify(studentManagement));
//Thông tin đăng nhập
//item: userLogin:email
//Thông tin tài khoản hệ thống
let userSystems = [
    {
        email: "admin@gmail.com",
        password: "123456",
        fullName: "Nguyễn văn admin",
        status: true//true: hoạt động - false: Đang bị khóa
    },
    {
        email: "quangnd@gmail.com",
        password: "123456",
        fullName: "Nguyễn Duy Quang",
        status: true//true: hoạt động - false: Đang bị khóa
    },
    {
        email: "an@gmail.com",
        password: "123456",
        fullName: "Nguyễn Quảng An",
        status: false//true: hoạt động - false: Đang bị khóa
    }
]
localStorage.setItem("userSystems", JSON.stringify(userSystems));