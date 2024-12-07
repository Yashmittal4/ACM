document.addEventListener('DOMContentLoaded', () => {
    
    const heroSlider = document.querySelector('.hero-slider');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const progressBar = document.querySelector('.progress-bar');
    let currentSlide = 0;
    const slideInterval = 5000; 

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        updateSlider();
    }

    function updateSlider() {
        heroSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        progressBar.style.width = '0%';
        progressBar.style.transition = 'none';
        setTimeout(() => {
            progressBar.style.width = '100%';
            progressBar.style.transition = `width ${slideInterval}ms linear`;
        }, 10);
    }

    setInterval(nextSlide, slideInterval);
    updateSlider();

    
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');

    function setDarkMode(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        moonIcon.style.display = isDark ? 'none' : 'inline-block';
        sunIcon.style.display = isDark ? 'inline-block' : 'none';
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }

    
    setDarkMode(localStorage.getItem('darkMode') === 'enabled');

    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    });

    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    
    const modal = document.getElementById('eventModal');
    const viewButtons = document.querySelectorAll('.btn-view');
    const closeButtons = document.querySelectorAll('.close-modal');
    const registerButton = document.getElementById('registerButton');

    const eventDetails = {
        'hackathon': {
            title: 'Hackathon 2024',
            date: 'January 15-17, 2024',
            time: '9:00 AM - 6:00 PM',
            venue: 'Main Campus, XIM University',
            capacity: '200 Participants',
            image: './images/Event_s/DSC_0019.JPG',
            description: 'Join us for an exciting 48-hour hackathon where you can showcase your coding skills, work on innovative projects, and win exciting prizes. This event is perfect for students who want to challenge themselves and learn from peers.',
            requirements: [
                'Laptop with required software installed',
                'Student ID card',
                'Basic programming knowledge',
                'Team of 2-4 members'
            ],
            schedule: [
                { time: '9:00 AM', event: 'Registration and Team Formation' },
                { time: '10:00 AM', event: 'Opening Ceremony' },
                { time: '11:00 AM', event: 'Coding Begins' },
                { time: '7:00 PM', event: 'First Day Review' },
                { time: '9:00 AM (Day 2)', event: 'Second Day Begins' },
                { time: '5:00 PM', event: 'Project Submission' },
                { time: '6:00 PM', event: 'Presentations and Judging' }
            ]
        },
        'ai-workshop': {
            title: 'AI Workshop Series',
            date: 'January 20-22, 2024',
            time: '10:00 AM - 4:00 PM',
            venue: 'Tech Hub, XIM University',
            capacity: '100 Participants',
            image: './images/Event_s/DSC_0018.JPG',
            description: 'A comprehensive three-day workshop series on Artificial Intelligence and Machine Learning. Learn from industry experts and get hands-on experience with the latest AI tools and technologies.',
            requirements: [
                'Laptop with Python installed',
                'Basic understanding of programming',
                'Mathematics background (statistics)',
                'Jupyter Notebook installed'
            ],
            schedule: [
                { time: '10:00 AM', event: 'Introduction to AI & ML' },
                { time: '11:30 AM', event: 'Python for AI Workshop' },
                { time: '2:00 PM', event: 'Hands-on ML Projects' },
                { time: '3:30 PM', event: 'Project Presentations' }
            ]
        },
        'security-summit': {
            title: 'Cyber Security Summit',
            date: 'January 25, 2024',
            time: '9:00 AM - 5:00 PM',
            venue: 'Auditorium, XIM University',
            capacity: '150 Participants',
            image: './images/chaptergrp/DSC_0109.JPG',
            description: 'A one-day summit featuring expert talks and workshops on cybersecurity, ethical hacking, and network security. Learn about the latest security threats and how to protect against them.',
            requirements: [
                'Laptop with required software',
                'Basic networking knowledge',
                'Virtual Machine installed',
                'Student ID card'
            ],
            schedule: [
                { time: '9:00 AM', event: 'Registration' },
                { time: '10:00 AM', event: 'Keynote Speech' },
                { time: '11:30 AM', event: 'Ethical Hacking Workshop' },
                { time: '2:00 PM', event: 'Network Security Session' },
                { time: '3:30 PM', event: 'CTF Competition' },
                { time: '4:30 PM', event: 'Closing Ceremony' }
            ]
        }
    };

    function updateModal(eventId) {
        const event = eventDetails[eventId];
        document.getElementById('modalTitle').textContent = event.title;
        document.getElementById('modalImage').src = event.image;
        document.getElementById('modalDate').textContent = event.date;
        document.getElementById('modalTime').textContent = event.time;
        document.getElementById('modalVenue').textContent = event.venue;
        document.getElementById('modalCapacity').textContent = event.capacity;
        document.getElementById('modalDescription').textContent = event.description;

        const requirementsList = document.getElementById('modalRequirements');
        requirementsList.innerHTML = event.requirements
            .map(req => `<li>${req}</li>`)
            .join('');

        const scheduleTimeline = document.getElementById('modalSchedule');
        scheduleTimeline.innerHTML = event.schedule
            .map(item => `
                <div class="schedule-item">
                    <strong>${item.time}</strong>
                    <p>${item.event}</p>
                </div>
            `)
            .join('');
    }

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventId = button.getAttribute('data-event');
            updateModal(eventId);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    registerButton.addEventListener('click', () => {
        alert('Registration successful! You will receive a confirmation email shortly.');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                animateValue(target, 0, endValue, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');

        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

    
    const chatButton = document.getElementById('chatButton');
    const chatModal = document.getElementById('chatModal');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');

    chatButton.addEventListener('click', () => {
        chatModal.style.display = 'block';
    });

    closeChat.addEventListener('click', () => {
        chatModal.style.display = 'none';
    });

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage(message) {
        addMessage(message, true);
        setTimeout(() => {
            addMessage("Thank you for your message. An ACM representative will get back to you soon.");
        }, 1000);
    }

    sendMessage.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            handleUserMessage(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                handleUserMessage(message);
                chatInput.value = '';
            }
        }
    });

    
    addMessage("Hello! How can I assist you today?");
});

