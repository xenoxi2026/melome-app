// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

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

// Tracking function
function trackShipment() {
    const trackingNumber = document.getElementById('trackingNumber').value;
    const resultDiv = document.getElementById('trackingResult');
    
    if (!trackingNumber) {
        alert('Please enter a tracking number');
        return;
    }
    
    // Demo tracking data
    const mockTracking = {
        'MEL123456': {
            status: 'In Transit',
            location: 'Johannesburg Hub',
            estimatedDelivery: '2026-05-08',
            updates: [
                '2026-05-06 14:30 - Departed from Cape Town',
                '2026-05-06 08:00 - Picked up from shipper',
                '2026-05-05 16:00 - Label created'
            ]
        },
        'MEL789012': {
            status: 'Delivered',
            location: 'Customer Address',
            deliveredDate: '2026-05-05',
            updates: [
                '2026-05-05 15:00 - Delivered successfully',
                '2026-05-05 10:00 - Out for delivery',
                '2026-05-04 08:00 - Arrived at local facility'
            ]
        }
    };
    
    const trackingInfo = mockTracking[trackingNumber];
    
    if (trackingInfo) {
        resultDiv.innerHTML = `
            <h3>Shipment Status: ${trackingInfo.status}</h3>
            <p><strong>Current Location:</strong> ${trackingInfo.location}</p>
            <p><strong>Estimated Delivery:</strong> ${trackingInfo.estimatedDelivery || trackingInfo.deliveredDate}</p>
            <h4>Tracking History:</h4>
            <ul>
                ${trackingInfo.updates.map(update => `<li>${update}</li>`).join('')}
            </ul>
        `;
        resultDiv.style.display = 'block';
    } else {
        resultDiv.innerHTML = `
            <p style="color: red;">Tracking number not found. Please check and try again.</p>
            <p>Demo numbers: MEL123456, MEL789012</p>
        `;
        resultDiv.style.display = 'block';
    }
}

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    this.reset();
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'white';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'white';
    }
});