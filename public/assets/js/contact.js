document.querySelector('#contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };
  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        alert('Message sent!');
        form.reset();
      } else {
        alert('Something went wrong. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please retry later.');
    }
  });
});
