import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '../errorMessages';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    terms: false,
    touched: { email: false, password: false, terms: false },
  });

  const errors = useMemo(() => {
    const e = {};
    if (form.touched.email && !emailRegex.test(form.email)) {
      e.email = errorMessages.emailInvalid;
    }
    if (form.touched.password && !strongPassRegex.test(form.password)) {
      e.password = errorMessages.passwordInvalid;
    }
    if (form.touched.terms && !form.terms) {
      e.terms = errorMessages.termsRequired;
    }
    return e;
  }, [form]);

  const isValid = useMemo(() => {
    return emailRegex.test(form.email) && strongPassRegex.test(form.password) && form.terms;
  }, [form]);

  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => setCanSubmit(isValid), [isValid]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const markTouched = (name) => {
    setForm((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, touched: { email: true, password: true, terms: true } }));

    if (isValid) {
      navigate('/success');
    }
  };

  const visibleErrors = Object.values(errors);

  return (
    <div style={{maxWidth: 480, margin: '48px auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            name="email"
            type="email"
            data-testid="email-input"
            value={form.email}
            onChange={handleChange}
            onBlur={() => markTouched('email')}
            placeholder="ornek@mail.com"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.email && (
            <p data-testid="error-msg" role="alert" style={{ color: 'crimson', margin: '6px 0 0' }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Şifre</label><br />
          <input
            id="password"
            name="password"
            type="password"
            data-testid="password-input"
            value={form.password}
            onChange={handleChange}
            onBlur={() => markTouched('password')}
            placeholder="En az 8 karakter, Aa1!"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.password && (
            <p data-testid="error-msg" role="alert" style={{ color: 'crimson', margin: '6px 0 0' }}>
              {errors.password}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <input
              name="terms"
              type="checkbox"
              data-testid="terms-checkbox"
              checked={form.terms}
              onChange={handleChange}
              onBlur={() => markTouched('terms')}
            />
            Şartları kabul ediyorum
          </label>
          {errors.terms && (
            <p data-testid="error-msg" role="alert" style={{ color: 'crimson', margin: '6px 0 0' }}>
              {errors.terms}
            </p>
          )}
        </div>

        <button
          type="submit"
          data-testid="submit-btn"
          disabled={!canSubmit}
          style={{ padding: '10px 16px', cursor: canSubmit ? 'pointer' : 'not-allowed' }}
        >
          Giriş Yap
        </button>
        <div data-testid="error-count" data-count={visibleErrors.length} style={{ display: 'none' }} />
      </form>
    </div>
  );
}
