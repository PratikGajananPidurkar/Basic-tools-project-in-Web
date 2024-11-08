const shortenUrl = async () => {
  const longUrl = document.getElementById('long-url').value;
  const accessToken = '57bf950c0fe1596c1f1844a801e985d4c24b509c';  // Your Bitly access token

  if (!longUrl) {
      alert('Please enter a valid URL.');
      return;
  }

  try {
      const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ long_url: longUrl })
      });

      if (!response.ok) {
          throw new Error('Failed to shorten the URL');
      }

      const data = await response.json();
      console.log('Response data:', data);

      const shortUrl = data.link;

      const shortUrlContainer = document.getElementById('short-url-container');
      const shortUrlLink = document.getElementById('short-url');
      shortUrlLink.href = shortUrl;
      shortUrlLink.textContent = shortUrl;
      shortUrlContainer.style.display = 'block';

      const copyBtn = document.getElementById('copy-btn');
      copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(shortUrl).then(() => {
              alert('Copied to clipboard!');
          });
      });
  } catch (error) {
      console.error('An error occurred:', error.message);
      alert('An error occurred while shortening the URL. Please try again.');
  }
};

const shortenBtn = document.getElementById('shorten-btn');
shortenBtn.addEventListener('click', shortenUrl);
