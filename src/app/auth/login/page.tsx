'use client'
import React, { useState } from 'react';
import styles from '../auth.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {

  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validate = () => {
    const newErrors = {
      email: '',
      password: ''
    };
    // Simple email regex
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    console.log('submitting..')
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    console.log('cek validation..', validationErrors, Object.values(validationErrors).filter((error)=>error.length > 0).length)
    if (Object.values(validationErrors).filter((error)=>error.length > 0).length === 0) {
      console.log('start handle login..')
      handleLogin()
    }
  };

  const handleLogin = async () => {
    console.log('loging in...')
    const res = await signIn("credentials",{
      redirect:false,
      email,
      password,
    })

    if(res?.error){
      console.log('error login ', res.error)
      alert(res.error)
    }else{
      router.push('/dashboard')
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={errors.password ? styles.errorInput : ''}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <button type="submit" className={styles.button}>Login</button>
        {/* <div className={styles.footer}>
        <label>Dont have an account?</label>
        <Link
        href='/auth/register'>
        <button type="button" className={styles.button}>Create Account</button></Link>
        </div> */}
      </form>
    </div>
  );
};

export default LoginPage;