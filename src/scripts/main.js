// Main JavaScript file for MetalShares - Premium Precious Metals Affiliate Platform

document.addEventListener('DOMContentLoaded', function() {
    console.log('MetalShares Platform loaded');
    
    // Initialize any interactive components here
    initializeComponents();
    
    // Simulate real-time price updates
    updateMetalPrices();
    setInterval(updateMetalPrices, 5000); // Update every 5 seconds
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize affiliate program tabs
    initializeAffiliateTabs();
    
    // Initialize affiliate link tracking
    initializeAffiliateTracking();
});

function initializeComponents() {
    // Add form submission handler
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && isValidEmail(email)) {
                // In a real implementation, you would send this to your backend
                console.log('Subscribed with email:', email);
                alert('Thank you for subscribing to MetalShares! Check your email for confirmation.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
    
    // Add navbar toggle functionality for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for fixed navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function isValidEmail(email) {
    // Basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function updateMetalPrices() {
    // Simulate real-time price updates
    const goldPriceElement = document.querySelector('.metal-name:first-child + .metal-price');
    const silverPriceElement = document.querySelector('.metal-name:last-child + .metal-price');
    
    if (goldPriceElement && silverPriceElement) {
        // Generate random price movements
        const goldChange = (Math.random() * 10 - 5).toFixed(2);
        const silverChange = (Math.random() * 0.5 - 0.25).toFixed(2);
        
        // Get current prices
        const currentGold = parseFloat(goldPriceElement.textContent.replace(/,/g, ''));
        const currentSilver = parseFloat(silverPriceElement.textContent.replace(/,/g, ''));
        
        // Calculate new prices
        const newGold = (currentGold + parseFloat(goldChange)).toFixed(2);
        const newSilver = (currentSilver + parseFloat(silverChange)).toFixed(2);
        
        // Update prices
        goldPriceElement.textContent = `${newGold}`;
        silverPriceElement.textContent = `${newSilver}`;
        
        // Update price change indicators
        const goldChangeElement = document.querySelector('.price-change:first-child');
        const silverChangeElement = document.querySelector('.price-change:last-child');
        
        if (goldChangeElement && silverChangeElement) {
            goldChangeElement.textContent = `${goldChange >= 0 ? '+' : ''}${goldChange}%`;
            goldChangeElement.className = `price-change ${goldChange >= 0 ? 'positive' : 'negative'}`;
            
            silverChangeElement.textContent = `${silverChange >= 0 ? '+' : ''}${silverChange}%`;
            silverChangeElement.className = `price-change ${silverChange >= 0 ? 'positive' : 'negative'}`;
        }
    }
}

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check if theme toggle element exists
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.setAttribute('data-theme', 'dark');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        console.log('Theme toggle clicked');
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Switching from', currentTheme, 'to', newTheme);
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function initializeAffiliateTabs() {
    // Get all tab buttons and tab panes
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const targetPane = document.getElementById(`${tabId}-tab`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

function initializeAffiliateTracking() {
    // Get all affiliate links
    const affiliateLinks = document.querySelectorAll('.affiliate-link');
    
    // Add click event listeners to track affiliate clicks
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const affiliateType = this.getAttribute('data-affiliate');
            const partnerName = this.getAttribute('data-partner');
            
            // In a real implementation, you would send this data to your analytics/affiliate tracking system
            console.log(`Affiliate link clicked: ${affiliateType} - ${partnerName}`);
            
            // Here you could also:
            // 1. Send data to your backend for tracking
            // 2. Add UTM parameters to the link
            // 3. Record the click in localStorage for retargeting
            // 4. Trigger any special offers or popups
            
            // For now, we'll just log the click and add a small delay to simulate tracking
            // In a real implementation, you might want to prevent the default action
            // until tracking is complete
        });
    });
}

// Function to get affiliate ID from environment or configuration
function getAffiliateId(affiliateType) {
    // In a real implementation, you would get this from your backend or environment variables
    // For now, we'll use a placeholder
    const affiliateIds = {
        'precious_metals': 'METALSHARES_PM',
        'digital_products': 'METALSHARES_CLICKBANK',
        'general_products': 'METALSHARES_AMAZON',
        'other_affiliates': 'METALSHARES_CJ'
    };
    
    return affiliateIds[affiliateType] || 'METALSHARES_DEFAULT';
}