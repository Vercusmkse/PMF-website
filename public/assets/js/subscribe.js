document.querySelector('#subscribeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('subscribeForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();

    if (!email || !email.includes('@')) {
      alert('Enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('Subscribed successfully!');
        form.reset();
      } else {
        alert('Subscription failed. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please retry later.');
    }
  });
});
