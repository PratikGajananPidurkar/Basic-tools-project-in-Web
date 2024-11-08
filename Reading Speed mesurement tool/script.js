document.getElementById('start-btn').addEventListener('click', function() {
    const textElement = document.getElementById('text-to-read');
    const text = textElement.textContent;
    const wordCount = text.split(' ').length;

    // Check if the test has already started
    if (this.textContent === 'Stop Reading') {
        const endTime = new Date().getTime();
        const timeTaken = (endTime - this.startTime) / 1000; // time in seconds
        const readingSpeed = (wordCount / timeTaken) * 60; // WPM

        document.getElementById('reading-speed').textContent = Math.round(readingSpeed);

        // Reset the button text to "Start Reading" and remove the start time
        this.textContent = 'Start Reading';
        delete this.startTime;

    } else {
        // Start the test
        this.startTime = new Date().getTime();

        // Change the button text to "Stop Reading"
        this.textContent = 'Stop Reading';

        // Clear any previous result
        document.getElementById('reading-speed').textContent = '';
    }
});
