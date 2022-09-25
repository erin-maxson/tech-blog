// const { doc } = require("prettier");

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('[name="plant-name"]').value.trim();
  const description = document.querySelector('[name="plant-description"]').value.trim();

  if (name && description) {
    const response = await fetch(`/api/plants`, {
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
      document.location.replace('/plants');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('id')) {
    const id = event.target.getAttribute('id');

    const response = await fetch(`/api/plants/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/plants');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-plant-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.plant-list')
  .addEventListener('click', delButtonHandler);
