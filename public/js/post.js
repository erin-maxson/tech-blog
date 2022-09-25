// const { doc } = require("prettier");

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('[name="post-name"]').value.trim();
  const description = document.querySelector('[name="post-description"]').value.trim();

  if (name && description) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: name,
        description: description, 
      }),
      
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('id')) {
    const id = event.target.getAttribute('id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
