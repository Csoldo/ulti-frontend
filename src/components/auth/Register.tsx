import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { ApiError } from '../../types/Api';
import styles from './Register.module.css';
import routes from '../../utils/routes';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Az email cím megadása kötelező';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Érvényes email címet adjon meg';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'A felhasználónév megadása kötelező';
    } else if (formData.username.length < 3) {
      newErrors.username = 'A felhasználónév legalább 3 karakter hosszú legyen';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'A felhasználónév csak betűket, számokat és aláhúzást tartalmazhat';
    }
    
    if (!formData.password) {
      newErrors.password = 'A jelszó megadása kötelező';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A jelszó legalább 6 karakter hosszú legyen';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Kérjük, erősítse meg a jelszavát';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'A jelszavak nem egyeznek';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData.email, formData.username, formData.password);
      
      // Redirect to dashboard on success
      navigate(routes.login);
      
    } catch (error) {
      console.error('Registration error:', error);
      const apiError = error as ApiError;
      setErrors({ 
        general: apiError.message || 'A regisztráció sikertelen. Kérjük, próbálja újra.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Csatlakozzon az Ultihoz</h1>
          <p className={styles.subtitle}>Hozza létre fiókját a játék megkezdéséhez</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.general && (
            <div className={styles.errorMessage}>
              {errors.general}
            </div>
          )}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email cím
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="Adja meg az email címét"
              autoComplete="email"
            />
            {errors.email && (
              <span className={styles.inputErrorText}>{errors.email}</span>
            )}
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Felhasználónév
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              placeholder="Válasszon felhasználónevet"
              autoComplete="username"
            />
            {errors.username && (
              <span className={styles.inputErrorText}>{errors.username}</span>
            )}
            <span className={styles.inputHint}>
              3+ karakter, betűk, számok és aláhúzás
            </span>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Jelszó
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="Hozzon létre egy jelszót"
              autoComplete="new-password"
            />
            {errors.password && (
              <span className={styles.inputErrorText}>{errors.password}</span>
            )}
            <span className={styles.inputHint}>
              Legalább 6 karakter
            </span>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Jelszó megerősítése
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              placeholder="Erősítse meg a jelszavát"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className={styles.inputErrorText}>{errors.confirmPassword}</span>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Fiók létrehozása...' : 'Fiók létrehozása'}
          </button>
          
          <div className={styles.footer}>
            <p className={styles.signInText}>
              Már van fiókja?{' '}
              <Link to="/login" className={styles.signInLink}>
                Jelentkezzen be itt
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
