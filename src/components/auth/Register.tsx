import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
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
      // TODO: Implement actual registration logic here
      console.log('Registration attempt:', {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Handle successful registration (redirect to login, auto-login, etc.)
      alert('Sikeres regisztráció! (Ez egy helykitöltő)');
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'A regisztráció sikertelen. Kérjük, próbálja újra.' });
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
              placeholder="Hozzon létre erős jelszót"
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
