import React from 'react';
import { Link } from 'react-router-dom';

const EnterPage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Twitter</h1>
      <p>Connect with friends and the world around you.</p>
      <div>
        <Link to="/login" className="btn btn-primary" style={styles.button}>Login</Link>
        <Link to="/register" className="btn btn-secondary" style={styles.button}>Sign Up</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  button: {
    margin: '10px',
  },
};

export default EnterPage;
