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
        alert("Đăng ký thất bại");
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

// Đăng nhập
function login(e) {
    event.preventDefault();
    var username = document.getElementById('emaildn').value;
    var password = document.getElementById('passworddn').value;
    var dangky = document.querySelector('.js-dangky');
    var dangnhap = document.querySelector('.js-dangnhap');
    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    if((username == data.username) && (password == data.password)) {
        alert('Đăng nhập thành công');
        formGroup[3].classList.remove('invalid');
        showMessage[3].innerText = '';
        formGroup[4].classList.remove('invalid');
        showMessage[4].innerText = '';
        modal.classList.remove('open');
        dangky.remove();
        dangnhap.classList.add('header__navbar-user');
        dangnhap.innerHTML = `
            <i class="header__navbar-icon fa-solid fa-user"></i>
            <span class="name-user">${username}</span>
            <ul class="header__navbar-user-menu">
                <li onclick="logOut()" class="header__navbar-user-item logout">
                    <a href="#">Đăng Xuất</a>
                </li>
            </ul>
        `;
    }else {
        formGroup[3].classList.add('invalid');
        formGroup[4].classList.add('invalid');
        alert('Đăng nhập thất bại');
        showMessage[4].innerText = 'Sai mật khẩu hoặc email';
    }
}



// ----------------------------------------PRODUCTS-----------------------------
// ==================== DATABASE ==========================
let DATABASE = localStorage.getItem('DATABASE') ? JSON.parse(localStorage.getItem('DATABASE')) : {
    PRODUCTS: [],
    ACCOUNTS: [
        // Set User Default role ADMIN
        {
            ID: generateUUIDV4(),
            username: "Đinh Sỹ Hùng",
            phoneNumber: "01672058923",
            address: "Hải Châu Đà Nẵng",
            email: "admin@gmail.com",
            password: "123",
            role: "Admin"
        }
    ],
    ORDERS: []
};

localStorage.setItem('DATABASE', JSON.stringify(DATABASE));

// Get table to use
let PRODUCTS = DATABASE.PRODUCTS;
let ACCOUNTS = DATABASE.ACCOUNTS;
let ORDERS = DATABASE.ORDERS;
let pork = document.getElementById('porkProduct');

window.onload = loadProduct(PRODUCTS);

function loadProduct(PRODUCTS) {
    PRODUCTS.forEach(product => {
        if(product.idcategory === "0") {
            renderPorkProduct(product);
        }
    });
}

function renderPorkProduct(product)  {
    let contents = `
        <div class="grid__column-5">
            <div class="products-item">
                <div class="box-img">
                    <img width="100%" height="100%" 
                    src="assets/img/${product.image}"
                    alt="AAA">
                </div>
                <h4 class="products-item-name">${product.productName}</h4>
                <div class="products-item-price">${product.price}đ</div>
                <button class="addtocart">CHỌN MUA</button>
            </div>
        </div>
    `;
    pork.innerHTML += contents;
}

// ----------------------------------------ADD TO CART-----------------------------
let btnAddToCart = document.getElementsByClassName('addtocart');
let numCart = document.getElementById('number-cart');
let cartdiv = document.querySelector('.cart-icon');
// Lấy từng nút button trong mảng
for(let e of btnAddToCart) {
    e.addEventListener('click', function() {
        numCart.textContent++;
        var parent = e.parentElement;
        var child = parent.querySelector('.box-img');
        var newChild = child.cloneNode(true);
        newChild.style.animation = "movetoCart 0.8s ease";
        numCart.appendChild(newChild);
        // newChild.style.width = "10%";
        // newChild.style.height = "10%";
        setTimeout( e => {
            newChild.style.display = "none";
        },800);
    })
}

// ****************** Search ********************************
let search = document.getElementById("search");
search.addEventListener('input', actSearch);

function actSearch() {
    let searchInput = search.value;
    let productCompare = PRODUCTS.filter(product => searchCompare(searchInput, product.productName));
    pork.innerHTML = '';
    productCompare.forEach(product => {
        renderPorkProduct(product);
    });
}

// Search Compare
function searchCompare(searchInput, productName) {
    let searchInputLower = searchInput.toLowerCase();
    let productNameLower = productName.toLowerCase();
    return productNameLower.includes(searchInputLower);
}
