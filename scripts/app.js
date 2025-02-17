
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const loginBtn = document.querySelector('#login-btn');
const loginUser = document.querySelector('#login-user');
const userName = document.querySelector('#user-profile-name');
const userProfileImage = document.querySelector('#user-profile-img');
const postBlogBtn = document.querySelector('#post-blog');
const blogTitle = document.querySelector('#blog-title');
const blogContent = document.querySelector('#blog-content');
const blogsContainer = document.querySelector('#blogs-container');

let currentUser;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        loginBtn.classList.add('d-none');
        loginUser.classList.remove('d-none');
        userName.textContent = user.displayName || "User";
        userProfileImage.src = user.photoURL || "default-profile.png";
        loadUserBlogs();
    } else {
        window.location = "login.html";
    }
});

async function postBlog() {
    if (!blogTitle.value || !blogContent.value) {
        alert("Please fill in all fields");
        return;
    }
    try {
        await addDoc(collection(db, "blogs"), {
            uid: currentUser.uid,
            title: blogTitle.value,
            content: blogContent.value,
            timestamp: new Date()
        });
        blogTitle.value = "";
        blogContent.value = "";
        loadUserBlogs();
    } catch (error) {
        console.error("Error adding blog: ", error);
    }
}

async function loadUserBlogs() {
    blogsContainer.innerHTML = "";
    const q = query(collection(db, "blogs"), where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const blog = doc.data();
        const blogCard = `
            <div class="col-md-6 mb-3">
                <div class="card p-3">
                    <h5>${blog.title}</h5>
                    <p>${blog.content}</p>
                </div>
            </div>
        `;
        blogsContainer.innerHTML += blogCard;
    });
}

postBlogBtn.addEventListener('click', postBlog);
