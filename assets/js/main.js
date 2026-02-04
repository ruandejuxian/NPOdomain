document.addEventListener('DOMContentLoaded', () => {
    
    // Select Elements
    const domainInput = document.getElementById('domainInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultContainer = document.getElementById('searchResult');

    // Configuration
    const DOMAIN_EXTENSION = '.npo.com';
    const MIN_LENGTH = 3;

    // Helper: Valid Domain Regex (Only alphanumeric and hyphens)
    const isValidDomain = (str) => /^[a-z0-9-]+$/.test(str);

    // Main Function: Check Availability
    const checkAvailability = () => {
        const query = domainInput.value.trim().toLowerCase();

        // 1. Validation Logic
        if (!query) {
            showResult('Please enter your organization name.', 'error');
            return;
        }

        if (query.length < MIN_LENGTH) {
            showResult(`Domain must be at least ${MIN_LENGTH} characters long.`, 'error');
            return;
        }

        if (!isValidDomain(query)) {
            showResult('Only letters, numbers, and hyphens (-) are allowed.', 'error');
            return;
        }

        // 2. Loading State
        showLoading();

        // 3. Simulate API Call (Mocking Backend)
        // In a real app, you would fetch('/api/check-domain', { body: query })
        setTimeout(() => {
            const isAvailable = mockDatabaseCheck(query);
            
            if (isAvailable) {
                showResult(`
                    <span>Congratulations! <strong>${query}${DOMAIN_EXTENSION}</strong> is available.</span>
                    <a href="#register" style="margin-left:10px; text-decoration:underline; font-weight:bold;">Register Now</a>
                `, 'success');
            } else {
                showResult(`Sorry, <strong>${query}${DOMAIN_EXTENSION}</strong> is already taken.`, 'error');
            }
        }, 1500); // 1.5s delay for realism
    };

    // UI Helper: Show Loading Spinner
    const showLoading = () => {
        searchBtn.disabled = true;
        searchBtn.style.opacity = '0.7';
        resultContainer.innerHTML = '<i class="fa-solid fa-circle-notch spinner"></i> Checking availability...';
    };

    // UI Helper: Display Result Message
    const showResult = (message, type) => {
        searchBtn.disabled = false;
        searchBtn.style.opacity = '1';
        
        const className = type === 'success' ? 'alert-success' : 'alert-error';
        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

        resultContainer.innerHTML = `
            <div class="alert ${className}">
                <i class="fa-solid ${icon}"></i>
                <div>${message}</div>
            </div>
        `;
    };

    // Mock Logic: Simulate "taken" domains
    const mockDatabaseCheck = (query) => {
        const takenDomains = ['admin', 'root', 'support', 'help', 'donate', 'redcross', 'unicef'];
        return !takenDomains.includes(query);
    };

    // Event Listeners
    searchBtn.addEventListener('click', checkAvailability);
    
    // Allow pressing "Enter" key
    domainInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAvailability();
    });

    // Input Sanitization (Auto lowercase)
    domainInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    });

});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. FAQ Accordion Logic ---
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle active class for icon rotation
            header.classList.toggle('active');

            // Toggle body height
            const body = header.nextElementSibling;
            if (header.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = 0;
            }

            // Close other items (Optional - creates "accordion" effect)
            accordions.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = 0;
                }
            });
        });
    });

    // --- 2. Simple Subdomain Input Validation (Visual only) ---
    const subInput = document.getElementById('subdomainAppInput');
    if(subInput) {
        subInput.addEventListener('input', (e) => {
            // Force lowercase and remove special chars
            e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {
    // Logic cho FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        const answer = item.querySelector('.faq-a');
        const icon = question.querySelector('i');

        // Khởi tạo: đóng tất cả
        answer.style.display = 'none';

        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Đóng tất cả trước (tùy chọn)
            faqItems.forEach(i => {
                i.querySelector('.faq-a').style.display = 'none';
                i.querySelector('i').className = 'fa-solid fa-plus'; // Đổi icon sang Plus
            });

            // Nếu đang đóng thì mở ra
            if (!isOpen) {
                answer.style.display = 'block';
                icon.className = 'fa-solid fa-xmark'; // Đổi icon sang X
            } else {
                answer.style.display = 'none';
                icon.className = 'fa-solid fa-plus';
            }
        });
    });

    // Reset form submit demo
    const applyBtn = document.querySelector('.btn-dark-block');
    if(applyBtn) {
        applyBtn.addEventListener('click', () => {
            alert('Application submitted! We will contact you via email within 12 hours.');
        });
    }
});