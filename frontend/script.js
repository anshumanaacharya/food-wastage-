const profileForm = document.getElementById('profile-form');
const profileList = document.getElementById('profile-list');

// Handle form submission for creating a new profile
if (profileForm) {
    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(profileForm);
        const newProfile = {
            name: formData.get('name'),
            email: formData.get('email'),
            additionalInfo: formData.get('additional-info'),
        };

        // Send the new profile data to the backend
        const response = await fetch('/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProfile),
        });

        if (response.ok) {
            // Clear the form and refresh the profile list
            profileForm.reset();
            fetchProfiles(); // Refresh the list of profiles
        } else {
            console.error('Error creating profile:', response.statusText);
        }
    });
}

// Function to fetch and display existing profiles
async function fetchProfiles() {
    const response = await fetch('/admin/users');
    const profiles = await response.json();

    // Clear the current profile list
    profileList.innerHTML = '';

    // Display each profile in the list
    profiles.forEach(profile => {
        const profileItem = document.createElement('div');
        profileItem.textContent = `Name: ${profile.name}, Email: ${profile.email}, Additional Info: ${profile.additionalInfo}`;
        profileList.appendChild(profileItem);
    });
}

// Fetch profiles on page load
fetchProfiles();

// New code for login functionality
const loginForm = document.getElementById('login-form');

// Handle form submission for login
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(loginForm);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        // Send the login data to the backend
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Display success message
            // Redirect to profile page or perform other actions
        } else {
            const error = await response.json();
            alert(error.message); // Display error message
        }
    });
}

// New code for registration functionality
const registerForm = document.getElementById('register-form');

// Handle form submission for registration
if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(registerForm);
        const registerData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        // Send the registration data to the backend
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Display success message
            registerForm.reset(); // Clear the form
        } else {
            const error = await response.json();
            alert(error.message); // Display error message
        }
    });
}
