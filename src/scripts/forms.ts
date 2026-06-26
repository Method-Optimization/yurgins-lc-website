/**
 * Progressive form validation for [data-validate] forms.
 * - Validates required fields, email and tel on blur and on submit.
 * - Shows inline errors near each field via [data-error-for].
 * - role="alert" + aria-invalid for screen readers; focuses first invalid field.
 * - No backend yet: on a valid submit we show the form's [data-success] panel.
 *   The markup is Netlify-Forms ready and posts to [[FORM_ENDPOINT]] once wired.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_RE = /^[\d\s()+.-]{7,}$/;

function validateField(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
  const value = field.value.trim();
  const required = field.hasAttribute('required');
  const label = field.dataset.label || 'This field';

  if (required && !value) return `${label} is required.`;
  if (value && field.type === 'email' && !EMAIL_RE.test(value)) return 'Enter a valid email address.';
  if (value && field.type === 'tel' && !TEL_RE.test(value)) return 'Enter a valid phone number.';
  return '';
}

function showError(form: HTMLFormElement, field: HTMLElement, message: string) {
  const name = (field as HTMLInputElement).name;
  const slot = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  if (slot) slot.textContent = message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function initForm(form: HTMLFormElement) {
  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input[name], select[name], textarea[name]'
    )
  ).filter((f) => f.type !== 'hidden' && f.name !== 'bot-field');

  fields.forEach((field) => {
    field.addEventListener('blur', () => showError(form, field, validateField(field)));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') showError(form, field, validateField(field));
    });
  });

  form.addEventListener('submit', (e) => {
    let firstInvalid: HTMLElement | null = null;
    fields.forEach((field) => {
      const msg = validateField(field);
      showError(form, field, msg);
      if (msg && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      e.preventDefault();
      (firstInvalid as HTMLElement).focus();
      return;
    }

    // Valid. No live endpoint yet — show success inline instead of navigating.
    e.preventDefault();
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.dataset.original = btn.textContent || '';
      btn.textContent = 'Sending…';
    }
    window.setTimeout(() => {
      const success = form.parentElement?.querySelector<HTMLElement>('[data-success]');
      if (success) {
        form.style.display = 'none';
        success.classList.add('is-visible');
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    }, 600);
  });
}

document.querySelectorAll<HTMLFormElement>('form[data-validate]').forEach(initForm);
