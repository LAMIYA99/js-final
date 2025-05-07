const ProductBox = document.querySelector("#ProductBox");
const CollectionBox = document.querySelector("#CollectionBox");
const SeedsBox = document.querySelector("#SeedsBox");
const dealProductBox = document.querySelector("#dealProducts");
const blogBox = document.querySelector("#blogBox");
const featureBox = document.querySelector("#featureBox");

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 5000
});


const getApiData = async (url) => {
    const response = await axiosInstance(url);
    return response.data;
}

let cart = [];
const cartSidebar = document.querySelector("#cartSidebar");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItemsContainer = document.querySelector(".cart-items");
const cartSubtotal = document.getElementById("cartSubtotal");
const closeCartBtn = document.querySelector(".close-cart");


const openCart = () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
};

const closeCart = () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
};

// closeCartBtn.addEventListener("click", closeCart);
// cartOverlay.addEventListener("click", closeCart);



const addToCart = (product) => {
    cart.push(product);
    updateCartUI();
    openCart();
};


const updateCartUI = () => {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <div style="display:flex; gap:10px; margin-bottom: 15px;">
                <img src="${item.image}" width="60" height="60" alt="${item.title}" />
                <div>
                    <p style="margin:0;">${item.title}</p>
                    <p style="margin:0;">$${item.price}</p>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    cartSubtotal.textContent = total.toFixed(2);
};


getApiData("products").then((products) => {
    const deals = products.slice(0, 4);
    dealProductBox &&
        deals?.forEach((item) => {
            console.warn(deals)
            dealProductBox.innerHTML += `<div class="col">
                                    <div class="cards">
                                        <div class="cards_img">
                                            <img src="${item.image}" alt="${item.title}">
                                            <div class="hover_img">
                                                <img src="${item.hoverImage}" alt="${item.title}">
                                            </div>
                                            <div class="hover_icon">
                                                <i class="ri-eye-line"></i>
                                                <i class="ri-shopping-bag-line"></i>
                                                <i class="ri-heart-line"></i>
                                            </div>
                                        </div>
                                        <div class="cards_body">
                                            <div class="cards_title">
                                                <a href="#">${item.title}</a>
                                            </div>
                                            <div class="price">
                                                <span class="current">$${item.price}</span>
                                            </div>
                                            <div class="cards_color">
                                                <ul>
                                                    ${item.colors.map(color => `<li style="background-color:${color}"></li>`).join("")}
                                                </ul>
                                            </div>
                                            <div class="cards_size">
                                                <ul>
                                                    ${item.sizes.map(size => `<li><a href="#">${size}</a></li>`).join("")}
                                                </ul>
                                            </div>
                                            <div class="cards_btn">
                                                <button>Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                            </div>`
        })
    ProductBox &&
        products?.forEach((item) => {
            let render = `
        <div class="col-xl-3">
            <div class="cards">
                <div class="cards_img">
                <img src="${item.image}" alt="${item.title}">
                    <div class="hover_img">
                        <img src="${item.hoverImage}" alt="${item.title}">
                    </div>
                    <div class="hover_icon">
                        <i class="ri-eye-line"></i>
                        <i class="ri-shopping-bag-line"></i>
                        <i class="ri-heart-line"></i>
                    </div>
                </div>
                <div class="cards_body">
                    <div class="cards_title">
                        <a href="#">${item.title}</a>
                    </div>
                    <div class="price">
                        <span class="current">$${item.price}</span>
                    </div>
                    <div class="cards_color">
                        <ul>
                            ${item.colors.map(color => `<li style="background-color:${color}"></li>`).join("")}
                        </ul>
                    </div>
                    <div class="cards_size">
                        <ul>
                            ${item.sizes.map(size => `<li><a href="#">${size}</a></li>`).join("")}
                        </ul>
                    </div>
                    <div class="cards_btn">
                        <button class="add-to-cart-btn">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
        `;
            ProductBox.innerHTML += render;
        });

    const cartButtons = document.querySelectorAll(".add-to-cart-btn");
    cartButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () => addToCart(products[idx]));
    });
});



getApiData("latestCollection").then((latestCollection) => {
    latestCollection &&
        latestCollection?.forEach((item) => {
            let render = `<div class="col-xl-4">
                        <div class="cards">
                            <div class="cards_img">
                                <img src="${item.image}"
                                    alt="${item.title}">
                                <div class="hover_img">
                                </div>
                                <div class="hover_btn">
                                    <button>Shop Now</button>
                                </div>
                            </div>
                            <div class="collection_text">
                                <h1>${item.title}</h1>
                                <h3>${item.description}</h3>
                            </div>
                        </div>
                    </div>`
                ;
            CollectionBox.innerHTML += render;

        });
});

getApiData("seedsCollection").then((seedsCollection) => {
    seedsCollection &&
        seedsCollection?.forEach((item) => {
            let render = `
        <div class="col-xl-4">
            <div class="cards">
                <div class="cards_img">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="hover_btn">
                        <button>${item.category}</button>
                    </div>
                </div>
                <div class="cards_body">
                    <p>${item.title}</p>
                    <div class="year">
                        <i class="ri-calendar-2-line"> ${new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</i>
                    </div>
                </div>
            </div>
        </div>`;
            SeedsBox.innerHTML += render;
        });
});

getApiData("blogCollection").then((blogCollection) => {
    blogCollection?.forEach((item) => {
        console.warn(item)
        let render = `
        <div class="col-xl-4">
            <div class="cards">
                <div class="cards_img">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="hover_btn">
                        <button>${item.category}</button>
                    </div>
                </div>
                <div class="cards_body">
                    <p>${item.title}</p>
                    <div class="year">
                        <i class="ri-calendar-2-line"> ${new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</i>
                    </div>
                </div>
            </div>
        </div>`;
        blogBox.innerHTML += render;
    });
});






getApiData("featured").then((featured) => {
    console.warn(featured)
    featured?.forEach((item) => {
        let render = `
    <div class="col">
        <div class="cards">
            <div class="cards_img">
                <img src="${item.image}" alt="${item.title}">
                <div class="hover_img">
                    <img src="${item.hoverImage}" alt="${item.title}">
                </div>
                <div class="hover_icon">
                    <i class="ri-eye-line"></i>
                    <i class="ri-shopping-bag-line"></i>
                    <i class="ri-heart-line"></i>
                </div>
            </div>
            <div class="cards_body">
                <div class="cards_title">
                    <a href="#">${item.title}</a>
                </div>
                <div class="price">
                    <span class="current">$${item.price}</span>
                </div>
                <div class="cards_color">
                    <ul>
                        ${item.colors.map(color => `<li style="background-color:${color}"></li>`).join("")}
                    </ul>
                </div>
                <div class="cards_size">
                    <ul>
                        ${item.sizes.map(size => `<li><a href="#">${size}</a></li>`).join("")}
                    </ul>
                </div>
                <div class="cards_btn">
                    <button 
                        class="add-to-cart-btn" 
                        data-title="${item.title}" 
                        data-price="${item.price}" 
                        data-image="${item.image}"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

        featureBox.innerHTML += render;
    });
});




const userBtn = document.querySelector(".user-login-btn");
const userLogin = document.querySelector(".loginModals");
const closeBtn = document.querySelector(".closelogin");

userBtn && userBtn.addEventListener("click", function () {
    userLogin && userLogin.classList.add("active");
})
closeBtn && closeBtn.addEventListener("click", function () {
    userLogin.classList.remove("active");
})


// login &&
//   login.addEventListener("click", () => {
//     loginModals.classList.add("activeLogin");
//   });
// closelogin &&
//     closelogin.addEventListener("click", () => {
//     loginModals.classList.remove("activeLogin");
//   });

const email_Input = document.querySelector(".email");
const password_Input = document.querySelector(".password");
const loginForm = document.querySelector("#loginForm");
const submitButton = document.querySelector("#submit");

const axiosLogin = axios.create({
    baseURL: "https://dummyjson.com/auth/",
    timeout: 5000,
});
const postLoginData = async (url, payload) => {
    const res = await axiosLogin.post(url, payload);
    return res.data;
};

loginForm &&
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const payload = {
            username: email_Input.value,
            password: password_Input.value,
        };
        postLoginData("login", payload).then((data) => {
            if (data) {
                Swal.fire({
                    title: "Drag me!",
                    icon: "success",
                    draggable: true,
                });
            }
            sessionStorage.setItem("token", data.accessToken);
        });
    });



var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
    },
});



