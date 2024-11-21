// Script for controlling animations & functionality for interactive elements.

// Sections
const landing = document.getElementById("landing");
const action = document.getElementById("action");
const signup = document.getElementById("signup");

// Helper funcs
const isHidden = (element) => {
    return "hidden" in element.classList;
};

// Transition func
const doTransition = (start, end) => {
    start.classList.toggle("animate");
    start.addEventListener('transitionend', () => {
        start.classList.toggle("hidden");
        end.classList.toggle("hidden");
        setTimeout(() => end.classList.toggle("animate"), 100);
    }, {once: true});
};

// Handle Logout Feature
const profile = document.getElementById("profile");
const currentUser = JSON.parse(localStorage.getItem("user"));
profile.textContent = (currentUser) ? `${currentUser.firstname} (Logout)` : '';
profile.addEventListener('click', (e) => {
    localStorage.removeItem('user');
});

// "Join Now" button animation
const actionButton = document.getElementById("actionButton");
actionButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!currentUser) {
        doTransition(landing, action);
    } else {
        await fetchPosts();
        doTransition(landing, feed);
    }
});

// "Back Button" animation
const actionBackButton = document.getElementById("actionBackButton");
actionBackButton.addEventListener('click', (e) => {
    e.preventDefault();

    doTransition(action, landing);
})

// "Login Button" animation
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    doTransition(action, login);
});

// "Back Button" animation
const loginBackButton = document.getElementById("loginBackButton");
loginBackButton.addEventListener('click', (e) => {
    e.preventDefault();

    doTransition(login, action);
});

// "Register Button" animation
const registerButton = document.getElementById("registerButton");
registerButton.addEventListener('click', (e) => {
    e.preventDefault();

    doTransition(action, signup);
});

// "Back Button" animation
const signupBackButton = document.getElementById("signupBackButton");
signupBackButton.addEventListener('click', (e) => {
    e.preventDefault();

    doTransition(signup, action);
});

// API Endpoint
const API_URL = 'http://127.0.0.1:5000';

// Retrieve posts
const posts = document.getElementById("posts");
const feed = document.getElementById("feed");
const activePost = document.getElementById("post");
const fetchPosts = async (callback=null) => {
    try {
        const response = await fetch(`${API_URL}/posts`);

        if (!response.ok) {
            alert("Could not fetch posts. Please refresh the page and try again later.");
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let postsData = data.posts;

        if (callback) {
            console.log(postsData);
            postsData = postsData.filter(callback);
            console.log(postsData);
        }

        posts.innerHTML = "";
        
        postsData.forEach(post => {
            const postItem = document.createElement("li");
            postItem.classList.add("post-item");
            const postTitle = document.createElement("span");
            postTitle.classList.add("post-title");
            postTitle.textContent = post.title;
            const postAuthor = document.createElement("small");
            postAuthor.classList.add("post-author");
            postAuthor.textContent = `By: ${post.author.firstname} ${post.author.lastname} | Date ${post.date_created}`;

            postItem.appendChild(postTitle);
            postItem.appendChild(postAuthor);
            posts.appendChild(postItem);

            postItem.addEventListener('click', (e) => {
                document.querySelector(".post-main .post-title").textContent = `${post.title}`;
                document.querySelector(".post-data .post-author").textContent = `${post.author.firstname} ${post.author.lastname}`;
                document.querySelector(".post-data .post-author-mc").textContent = `${post.author.motorcycle_model}`;
                activePost.querySelector("#post .post-date").textContent = `Date Posted: ${post.date_created}`;
                activePost.querySelector("#post .post-content").textContent = post.body;
                doTransition(feed, activePost);
            });
        });
    } catch (error) {
        console.log('Error:', error);
    }
}

// "Back Button" animation
const postBackButton = document.getElementById("postBackButton");
postBackButton.addEventListener('click', async (e) => {
    doTransition(activePost, feed);
});

// Login feature
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': formData.get('email'),
                'password': formData.get('password')
            })
        });

        if (!response.ok) {
            alert("Could not sign in. Make sure that the credentials you have provided are valid.");
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        await fetchPosts();
        doTransition(login, feed);
        profile.textContent = `${data.user.firstname} (Logout)`;
    } catch (error) {
        console.log('Error:', error);
    }
});

// Signup feature
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': formData.get('email'),
                'password': formData.get('password'),
                'firstname': formData.get('firstname'),
                'lastname': formData.get('lastname'),
                'control_number': formData.get('control_number'),
                'motorcycle_model': formData.get('motorcycle_model'),
                'plate_number': formData.get('plate_number')
            })
        });

        if (!response.ok) {
            alert("Could not create account. Make sure that the information you have provided are valid and try again");
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success! ', data);
    } catch (error) {
        console.log('Error:', error);
    }
});

const postSearch = document.getElementById("postSearch");
postSearch.addEventListener('input', (e) => {
    fetchPosts(
        post => post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                `${post.author.firstname} ${post.author.lastname}`.toLowerCase().includes(e.target.value.toLowerCase())
    );
});
