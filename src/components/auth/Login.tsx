import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    
    if (!formData.username.trim()) {
      newErrors.username = 'A felhasználónév megadása kötelező';
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
      // TODO: Implement actual login logic here
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Handle successful login (redirect, store token, etc.)
      setFormData({ username: '', password: '' });
      alert('Sikeres bejelentkezés! (Ez egy helykitöltő)');
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'A bejelentkezés sikertelen. Kérjük, próbálja újra.' });
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
              placeholder="Adja meg a felhasználónevét"
              autoComplete="username"
            />
            {errors.username && (
              <span className={styles.inputErrorText}>{errors.username}</span>
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
