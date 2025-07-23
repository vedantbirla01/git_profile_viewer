document.addEventListener('DOMContentLoaded', () => {
      // DOM Elements
      const searchBtn = document.getElementById('search-btn');
      const usernameInput = document.getElementById('username');
      const profileContainer = document.getElementById('profile-container');
      const errorMessage = document.getElementById('error-message');
      const loading = document.getElementById('loading');
      
      // Profile Elements
      const avatar = document.getElementById('avatar');
      const name = document.getElementById('name');
      const login = document.getElementById('login');
      const bio = document.getElementById('bio');
      const followers = document.getElementById('followers');
      const following = document.getElementById('following');
      const repos = document.getElementById('repos');
      const profileLink = document.getElementById('profile-link');

      // Event Listeners
      searchBtn.addEventListener('click', fetchProfile);
      usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchProfile();
      });

      // Fetch GitHub Profile
      async function fetchProfile() {
        const username = usernameInput.value.trim();
        if (!username) {
          showError('Please enter a GitHub username');
          return;
        }

        // Show loading, hide others
        loading.style.display = 'block';
        profileContainer.style.display = 'none';
        errorMessage.style.display = 'none';

        try {
          const response = await fetch(`https://api.github.com/users/${username}`);
          
          if (!response.ok) {
            throw new Error(response.status === 404 ? 'User not found' : 'Failed to fetch profile');
          }

          const data = await response.json();
          displayProfile(data);
        } catch (error) {
          showError(error.message);
        } finally {
          loading.style.display = 'none';
        }
      }

      // Display Profile
      function displayProfile(data) {
        avatar.src = data.avatar_url;
        name.textContent = data.name || 'No name provided';
        login.textContent = `@${data.login}`;
        bio.textContent = data.bio || 'This user has no bio';
        followers.textContent = data.followers.toLocaleString();
        following.textContent = data.following.toLocaleString();
        repos.textContent = data.public_repos.toLocaleString();
        profileLink.href = data.html_url;
        
        profileContainer.style.display = 'block';
      }

      // Show Error
      function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
      }
    });