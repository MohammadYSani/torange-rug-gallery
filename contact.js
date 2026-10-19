/* Torange contact form: submit to Formspree without leaving our website. */
(() => {
  const form = document.getElementById('torange-contact-form');
  const status = document.getElementById('contact-form-status');
  const success = document.getElementById('contact-success');
  const again = document.getElementById('contact-another');
  if (!form || !status || !success || !again) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending…';
    status.hidden = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Submission was not accepted');
      form.hidden = true;
      success.hidden = false;
      success.focus();
      form.reset();
    } catch (error) {
      status.textContent = 'We could not send your message. Please try again, or email torangeruggallery@gmail.com directly.';
      status.hidden = false;
    } finally {
      button.disabled = false;
      button.innerHTML = 'Send Message <span aria-hidden="true">↗</span>';
    }
  });

  again.addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    status.hidden = true;
    form.querySelector('input[name="name"]').focus();
  });
})();
