//Modal Log in/ log out
const btnDangKy = document.querySelector('.js-dangky');
const btnDangNhap = document.querySelector('.js-dangnhap');
const modal = document.querySelector('.js-modal');
const modalDangNhap = document.querySelector('.js-form-dn');
const modalDangKy = document.querySelector('.js-form-dk');
const smallbtnDangKy = document.querySelector('.js-small-dk');
const smallbtnDangNhap = document.querySelector('.js-small-dn');
const btnClose = document.querySelector('.js-modal-close');
function showModalDangKy() {
    // Thêm class 'open'
    modal.classList.add('open');
    modalDangNhap.classList.add('hidedn');
}

function hideModal() {
    // Loại bỏ class 'open'
    modal.classList.remove('open');
    modalDangNhap.classList.remove('hidedn');
    modalDangKy.classList.remove('hidedk');
}

function openDangNhap() {
    // Loại bỏ class 'open'
    modalDangNhap.classList.remove('hidedn');
    modalDangKy.classList.add('hidedk');

}

function openDangKy() {
    // Loại bỏ class 'open'
    modalDangKy.classList.remove('hidedk');
    modalDangNhap.classList.add('hidedn');

}

function showModalDangNhap() {
    // Thêm class 'open'
    modal.classList.add('open');
    modalDangKy.classList.add('hidedk');
}

btnDangKy.addEventListener('click',showModalDangKy);
btnDangNhap.addEventListener('click',showModalDangNhap);
smallbtnDangKy.addEventListener('click',openDangKy);
smallbtnDangNhap.addEventListener('click',openDangNhap);
btnClose.addEventListener('click',hideModal);

// Xử lí form đăng nhập đăng ký
var formGroup = document.getElementsByClassName('auth-form__group');
var showMessage = document.getElementsByClassName('message-notify-dndk');
var email = document.getElementById('email');
var pass = document.getElementById('password');
var passAgain = document.getElementById('passwordagain');
var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//Nhap email
function isRequired() {
    var hasValue = email.value;
    if(hasValue.match(mailFormat)) {
        showMessage[0].innerText = '';
        formGroup[0].classList.remove('invalid');
        return undefined;
    }else {
        formGroup[0].classList.add('invalid');
        showMessage[0].innerText = 'Vui lòng nhập đúng email';
    }
}
email.oninput = function() {
    showMessage[0].innerText = '';
    formGroup[0].classList.remove('invalid');
}

//Nhap pass
function isPassword() {
    const hasPassword = pass.value;
    if(hasPassword.length >= 8) {
        showMessage[1].innerText = '';
        formGroup[1].classList.remove('invalid');
        return undefined;
    }else {
        formGroup[1].classList.add('invalid');
        showMessage[1].innerText = 'Nhập ít nhất 8 kí tự';
    }
}
pass.oninput = function() {
    showMessage[1].innerText = '';
    formGroup[1].classList.remove('invalid');
}

//Xac nhan pass
function correctPassword() {
    if(passAgain.value == pass.value) {
        showMessage[2].innerText = '';
        formGroup[2].classList.remove('invalid');
        return undefined;
    }else {
        formGroup[2].classList.add('invalid');
        showMessage[2].innerText = 'Bạn đã nhập sai mật khẩu';
    }
}
passAgain.oninput = function() {
    showMessage[2].innerText = '';
    formGroup[2].classList.remove('invalid');
}

// Đăng ký 
function signup(e) {
    event.preventDefault();
    var formGroup = document.getElementsByClassName('auth-form__group');
    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if(formGroup[0].classList.contains('invalid') || formGroup[1].classList.contains('invalid') || formGroup[2].classList.contains('invalid')) {
        alert("co loi kh dang ky dc");
    }else {
        var user = {
            username: username,
            password: password,
        }
        var json = JSON.stringify(user);
        localStorage.setItem(username,json);
        alert('Đăng ký thành công');
        openDangNhap();
    }
}

function login(e) {
    event.preventDefault();
    var username = document.getElementById('emaildn').value;
    var password = document.getElementById('passworddn').value;
    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    if((username == data.username) && (password == data.password)) {
        alert('Đăng nhập thành công');
        formGroup[3].classList.remove('invalid');
        showMessage[3].innerText = '';
        formGroup[4].classList.remove('invalid');
        showMessage[4].innerText = '';
        modal.classList.remove('open');

    }else {
        formGroup[3].classList.add('invalid');
        formGroup[4].classList.add('invalid');
        showMessage[4].innerText = 'Sai mật khẩu hoặc email';
    }
}