// auth.js (Frontend)

const API_URL = 'http://localhost:3000/api/auth'; // Update with your backend endpoint

// Register User
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        alert('Registration successful');
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert(error.message);
    }
}

// Login User
async function loginUser(loginData) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        // Store the token in localStorage for future requests
        localStorage.setItem('token', data.token);
        alert('Login successful');
        window.location.href = '/dashboard';  // Redirect after successful login
    } catch (error) {
        console.error('Error during login:', error.message);
        alert(error.message);
    }
}

// Example usage (Replace with actual form submission logic)
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        address: e.target.address.value,
        role: 'user'
    };
    await registerUser(userData);
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginData = {
        email: e.target.email.value,
        password: e.target.password.value
    };
    await loginUser(loginData);
});
