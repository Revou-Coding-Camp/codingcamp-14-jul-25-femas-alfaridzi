// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Dynamic Welcome Message
    function updateWelcomeMessage() {
        const welcomeElement = document.getElementById('welcome-message');
        if (welcomeElement) {
            const currentHour = new Date().getHours();
            let greeting;
            
            if (currentHour < 12) {
                greeting = "Good Morning";
            } else if (currentHour < 17) {
                greeting = "Good Afternoon";
            } else {
                greeting = "Good Evening";
            }
            
            // Get user's name (you can modify this to get from localStorage or input)
            const userName = "Femas"; // This can be dynamic
            welcomeElement.textContent = `I'm ${userName}, ${greeting}! Welcome To My Website`;
        }
    }

    // Current Time Dis
    // lay
    function updateCurrentTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            };
            
            timeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    // Form Validation and Display
    const messageForm = document.getElementById('messageForm');
    const formOutput = document.getElementById('form-output');

    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nama = document.getElementById('nama').value;
            const tanggal = document.getElementById('tanggal').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const pesan = document.getElementById('pesan').value;

            // Validate form
            if (!nama || !tanggal || !gender || !pesan) {
                alert('Mohon lengkapi semua field yang diperlukan!');
                return;
            }

            // Format date
            const dateObj = new Date(tanggal);
            const formattedDate = dateObj.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            // Display form data
            if (formOutput) {
                formOutput.innerHTML = `
                    <p><strong>Nama:</strong> ${nama}</p>
                    <p><strong>Tanggal Lahir:</strong> ${formattedDate}</p>
                    <p><strong>Jenis Kelamin:</strong> ${gender.value}</p>
                    <p><strong>Pesan:</strong> ${pesan}</p>
                `;
            }

            // Show success message
            alert('Pesan berhasil dikirim!');
            
            // Reset form
            messageForm.reset();
        });
    }

    // Initialize functions
    updateWelcomeMessage();
    updateCurrentTime();
    
    // Update time every second
    setInterval(updateCurrentTime, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.headquarters-item, .team-member, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});