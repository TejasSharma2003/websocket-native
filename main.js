"use strict"

const formData = document.querySelector("#postinfo");
const nameInput = document.querySelector("#name-input");
const messageInput = document.querySelector("#message-input");
const postContainer = document.querySelector(".posts");
const refreshBtn = document.querySelector("#refresh-btn");

let posts = [];

async function createPost() {
    try {
        const name = nameInput.value;
        const message = messageInput.value;

        console.log("Creating post...");
        const res = await fetch("http://localhost:3000/create-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                message
            })
        });
        nameInput.value = "";
        messageInput.value = "";

    } catch (err) {
        console.log(err)
    }
}

async function loadPosts() {
    try {
        const res = await fetch("http://localhost:3000/posts");
        const allPosts = await res.json();
        posts = allPosts.data;
    } catch (err) {
        console.log(err);
    }
}

function renderPosts() {
    // Cleaning previous posts
    postContainer.innerHTML = '';
    posts.forEach(post => {
        const nameContainer = document.createElement("h1");
        nameContainer.textContent = post.name;

        const messageContainer = document.createElement("p");
        messageContainer.textContent = post.message;

        postContainer.append(nameContainer);
        postContainer.append(messageContainer);
    })
}
async function fetchAndRender() {
    await loadPosts();
    renderPosts()
}

formData.addEventListener("submit", async (event) => {
    event.preventDefault();
    await createPost();
})

window.addEventListener("DOMContentLoaded", async () => {
    await fetchAndRender();
})

refreshBtn.addEventListener("click", async () => {
    await fetchAndRender();
})

