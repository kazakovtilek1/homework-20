const url = "http://localhost:8000/posts"
const postsBtn = document.querySelector('#postsBtn')
const usersList = document.querySelector('#usersList')
const form = document.forms.form




/// GET

function getPosts (event) {
    fetch(url)
    .then(response => {
        return response.json()
    }) 
    .then(posts => {
        posts.forEach(post => {
            usersList.innerHTML +=`<li>${post.title}<button class="updateBtn" data-id="${post.id}">Update</button>
            </li>`

        });

        let updateBtn = document.querySelectorAll('.updateBtn')

        updateBtn.forEach(btn => {
            btn.addEventListener('click', updatePatchPost)
        })
    })
}

getPosts()



postsBtn.addEventListener('click', getPosts)

form.addEventListener('submit', createPost)



// PATCH

function updatePatchPost (event) {
    const {id} = event.target.dataset
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then(response => {
        getPosts()
    })
}