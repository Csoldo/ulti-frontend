import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { ApiError } from '../../types/Api';
import styles from './Login.module.css';
import routes from '../../utils/routes';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    if (!formData.password) {
      newErrors.password = 'A jelszó megadása kötelező';
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
      await login(formData.email, formData.password);
      
      // Clear form and redirect on success
      setFormData({ email: '', password: '' });
      navigate(routes.dashboard);
      
    } catch (error) {
      console.error('Login error:', error);
      const apiError = error as ApiError;
      setErrors({ 
        general: apiError.message || 'A bejelentkezés sikertelen. Kérjük, próbálja újra.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Üdvözöljük az Ulti játékban</h1>
          <p className={styles.subtitle}>Jelentkezzen be a fiókjába</p>
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
              disabled={isLoading}
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email}</span>
            )}
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
              placeholder="Adja meg a jelszavát"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className={styles.inputErrorText}>{errors.password}</span>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
          </button>
          
          <div className={styles.footer}>
            <p className={styles.signUpText}>
              Nincs még fiókja?{' '}
              <Link to="/register" className={styles.signUpLink}>
                Regisztráljon itt
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
