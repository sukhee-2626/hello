// ===== AUTH FUNCTIONALITY =====

// Switch between login and signup tabs
function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');

    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        // For now, just store in localStorage (you can connect to backend later)
        const user = {
            email: email,
            loggedIn: true,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('user', JSON.stringify(user));

        // Show success message
        if (window.showToast) {
            window.showToast('Login successful! Welcome back! 🎂', 'success');
        } else {
            alert('Login successful!');
        }

        // Clear form
        e.target.reset();

        // Scroll to products
        document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Login error:', error);
        if (window.showToast) {
            window.showToast('Login failed. Please try again.', 'error');
        } else {
            alert('Login failed. Please try again.');
        }
    }
});

// Handle signup form submission
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        // For now, just store in localStorage (you can connect to backend later)
        const user = {
            name: name,
            email: email,
            loggedIn: true,
            signupTime: new Date().toISOString()
        };

        localStorage.setItem('user', JSON.stringify(user));

        // Show success message
        if (window.showToast) {
            window.showToast(`Welcome ${name}! Account created successfully! 🎉`, 'success');
        } else {
            alert('Account created successfully!');
        }

        // Clear form
        e.target.reset();

        // Switch to login tab
        switchAuthTab('login');

        // Scroll to products
        setTimeout(() => {
            document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);

    } catch (error) {
        console.error('Signup error:', error);
        if (window.showToast) {
            window.showToast('Signup failed. Please try again.', 'error');
        } else {
            alert('Signup failed. Please try again.');
        }
    }
});

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user && user.loggedIn) {
        console.log('User is logged in:', user.email);
        // You can show user info in navbar or hide login section
    }
});

// Toast notification function
window.showToast = function (message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Add to body
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
