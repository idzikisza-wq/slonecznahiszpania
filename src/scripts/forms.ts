// Walidacja i wysyłka formularzy. Komunikaty błędów w small, w kolorze ink, pod polem.
// Bez klucza PUBLIC_WEB3FORMS_KEY: tryb demo (sukces i payload w konsoli).
// W trakcie wysyłki przycisk ma aria-disabled, a nie disabled: wyłączony przycisk gubi fokus.
// Żądanie ma limit czasu, żeby zawieszone połączenie skończyło się komunikatem błędu.

const ENDPOINT = 'https://api.web3forms.com/submit';
const KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIMEOUT = 15000;

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function setError(field: Field, message: string | null) {
  const error = document.getElementById(`${field.id}-error`);
  if (!error) return;
  error.textContent = message ?? '';
  error.hidden = !message;
  if (message) {
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', error.id);
  } else {
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }
}

function initForm(form: HTMLFormElement) {
  const messages = form.dataset;
  const fields = [...form.querySelectorAll<Field>('.input')];
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLElement>('[data-status]');
  const success = document.querySelector<HTMLElement>(`[data-success-for="${form.id}"]`);

  const check = (field: Field) => {
    const value = field.value.trim();
    if (field.required && !value) return messages.errorRequired ?? '';
    if (field.type === 'email' && value && !EMAIL.test(value)) return messages.errorEmail ?? '';
    return null;
  };

  const done = () => {
    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.focus();
    }
  };

  form.noValidate = true;

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) setError(field, check(field));
    });
  });

  let sending = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;

    const invalid = fields.filter((field) => {
      const message = check(field);
      setError(field, message);
      return message;
    });
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // honeypot: bot widzi sukces, nic nie wychodzi
    if (data.botcheck) return done();
    delete data.botcheck;
    // przekierowanie jest tylko dla wysyłki bez JS; tu odpowiedź ma być w JSON
    delete data.redirect;

    if (!KEY) {
      console.info('Formularz w trybie demo (brak PUBLIC_WEB3FORMS_KEY). Payload:', data);
      return done();
    }

    sending = true;
    form.setAttribute('aria-busy', 'true');
    button?.setAttribute('aria-disabled', 'true');
    if (status) status.hidden = true;
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, access_key: KEY }),
        signal: AbortSignal.timeout?.(TIMEOUT),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      done();
    } catch (error) {
      console.error('Wysyłka formularza nie powiodła się:', error);
      if (status) {
        status.textContent = messages.errorSend ?? '';
        status.hidden = false;
      }
    } finally {
      sending = false;
      form.removeAttribute('aria-busy');
      button?.removeAttribute('aria-disabled');
    }
  });
}

export function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = 'true';
    initForm(form);
  });
}
