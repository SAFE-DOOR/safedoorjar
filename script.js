// --- Employee Data Mockup (Backend Data Simulation) ---
// Note: 9958655713 and 8810502513 are used alternately.
const salesExperts = {
    Jars: { 
        name: "Ms. Priya Singh", 
        role: "Plastic Jars Specialist",
        phone: "9958655713", 
        whatsapp: "919958655713",
        email: "priya.s@safedoor.in",
        city: "Mumbai"
    },
    Boxes: { 
        name: "Mr. Alok Verma", 
        role: "Corrugated Boxes Expert",
        phone: "8810502513", 
        whatsapp: "918810502513",
        email: "alok.v@safedoor.in",
        city: "Bangalore"
    },
    Sealing: { 
        name: "Ms. Kavita Reddy", 
        role: "Logistics Material Consultant",
        phone: "9958655713",
        whatsapp: "919958655713",
        email: "kavita.r@safedoor.in",
        city: "Chennai"
    },
    Custom: { 
        name: "Mr. Sameer Khan", 
        role: "Bulk & Custom Order Manager",
        phone: "8810502513",
        whatsapp: "918810502513",
        email: "sameer.k@safedoor.in",
        city: "Delhi"
    }
};


// --- Global Functions (Used by HTML) ---

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// --- Interactive Alert Bar ---
function dismissAlertBar() {
    const alertBar = document.getElementById('alertBar');
    const mainNav = document.getElementById('mainNav');
    const homeSection = document.getElementById('home');
    
    alertBar.classList.remove('alert-slide-down');
    alertBar.classList.add('alert-slide-up');
    
    // Adjust main navigation position after dismissing
    mainNav.style.top = '0';
    homeSection.style.paddingTop = '90px'; 
}

// --- Quick Quote Calculator (FIXED LOGIC) ---
function calculateQuote() {
    const productSelect = document.getElementById('calcProduct');
    const quantityInput = document.getElementById('calcQuantity');
    const resultDiv = document.getElementById('quoteResult');
    const resultValue = document.getElementById('quoteValue');

    const pricePerUnit = parseFloat(productSelect.value);
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 500) {
        alert("Please enter a quantity of 500 units or more.");
        resultDiv.classList.add('hidden');
        return;
    }

    let estimatedTotal = pricePerUnit * quantity;

    // Apply mock discount logic
    if (estimatedTotal > 50000) {
        estimatedTotal *= 0.90; // 10% discount
    }

    resultValue.textContent = `₹${estimatedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    resultDiv.classList.remove('hidden');
    console.log(`Quote Calculated: Total approx. ₹${estimatedTotal.toFixed(2)} for ${quantity} units.`);
}

// --- Expert Connect Logic (UPDATED NUMBERS) ---
function connectExpert() {
    const productKey = document.getElementById('expertProduct').value;
    const resultDiv = document.getElementById('expertConnectResult');
    
    const expert = salesExperts[productKey.replace(/\s/g, '')]; // Keys like 'Jars', 'Boxes'
    
    if (expert) {
        const whatsappMessage = encodeURIComponent(`Hello ${expert.name}, I am interested in ${expert.role} and need to place a bulk order. Please connect with me.`);
        
        resultDiv.innerHTML = `
            <p class="font-bold text-lg mb-2">👋 Expert Found: ${expert.name}</p>
            <p class="text-sm text-gray-700">Role: ${expert.role} | Contact: ${expert.phone}</p>
            <div class="mt-3 flex flex-col space-y-2">
                <a href="https://wa.me/${expert.whatsapp}?text=${whatsappMessage}" target="_blank" class="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 inline-flex items-center space-x-2 justify-center">
                    <i class="fab fa-whatsapp"></i> <span>Start WhatsApp Chat Now</span>
                </a>
                <a href="tel:+91${expert.phone}" class="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 inline-flex items-center space-x-2 justify-center">
                    <i class="fas fa-phone-alt"></i> <span>Call Directly</span>
                </a>
            </div>
        `;
        resultDiv.classList.remove('hidden');
        console.log(`Expert Connect: User connected to ${expert.name} (${expert.phone}).`);
    } else {
        resultDiv.innerHTML = `<p class="text-red-500">Sorry, expert not found. Please use the general contact form.</p>`;
        resultDiv.classList.remove('hidden');
    }
}


// --- Review Submission Logic (FIXED) ---
let currentRating = 0;

function setRating(rating) {
    currentRating = rating;
    const stars = document.getElementById('ratingStars').children;

    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars[i].classList.remove('far');
            stars[i].classList.add('fas');
        } else {
            stars[i].classList.remove('fas');
            stars[i].classList.add('far');
        }
    }
    document.getElementById('reviewRating').value = rating;
}

function submitReview() {
    if (currentRating === 0) {
        alert("Please select a star rating before submitting.");
        return;
    }
    
    const reviewName = document.getElementById('reviewName').value;
    if (!reviewName) {
        alert("Please enter your name.");
        return;
    }

    const reviewData = {
        name: reviewName,
        product: document.getElementById('reviewProduct').value,
        rating: currentRating,
        text: document.getElementById('reviewText').value,
        timestamp: new Date().toLocaleDateString('en-IN')
    };

    console.log("--- New Review Submitted (Mock Backend Data) ---");
    console.log(JSON.stringify(reviewData, null, 2));

    const reviewCard = document.createElement('div');
    reviewCard.className = 'bg-yellow-50 p-6 rounded-xl shadow-md slide-in border-t-4 border-green-500';
    reviewCard.innerHTML = `
        <div class="flex items-center text-yellow-500 mb-3">
            ${'<i class="fas fa-star"></i>'.repeat(reviewData.rating)}
            ${'<i class="far fa-star"></i>'.repeat(5 - reviewData.rating)}
            <span class="ml-3 text-gray-700 font-semibold text-sm">${reviewData.rating}.0 | ${reviewData.product} (New!)</span>
        </div>
        <p class="text-gray-700 italic mb-4">"${reviewData.text}"</p>
        <div class="flex items-center">
            <img src="https://picsum.photos/seed/newreview-${Math.random()}/40/40" alt="New Reviewer" class="w-10 h-10 rounded-full mr-3">
            <div>
                <p class="font-semibold text-green-600">${reviewData.name}</p>
                <p class="text-xs text-gray-500">Submitted on ${reviewData.timestamp}</p>
            </div>
        </div>
    `;

    document.getElementById('reviewCardsContainer').prepend(reviewCard); 
    
    alert('Review Submitted Successfully! It is now visible on the page (simulated). Thank you for your feedback!');
    document.getElementById('reviewForm').reset();
    setRating(0); // Reset stars to 0
}


// --- Product Quick View Modal ---

function openProductModal(title, description, specs, stockStatus, price) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    
    // 1. Stock Status Update
    const stockDiv = document.getElementById('modalStockStatus');
    stockDiv.className = 'font-bold text-lg mb-4';

    if (stockStatus === 'high') {
        stockDiv.classList.add('text-green-600');
        stockDiv.textContent = `✅ In Stock (Approx ₹${price}/unit)`;
    } else if (stockStatus === 'low') {
        stockDiv.classList.add('text-yellow-600');
        stockDiv.textContent = `⏳ Low Stock (Approx ₹${price}/unit - Order Soon!)`;
    } else {
        stockDiv.classList.add('text-red-600');
        stockDiv.textContent = '❌ Out of Stock (Contact for ETA)';
    }

    // 2. Specs Update
    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = ''; 
    specs.split(', ').forEach(spec => {
        const li = document.createElement('li');
        li.className = 'flex items-center text-gray-700';
        li.innerHTML = `<i class="fas fa-check-circle text-purple-500 mr-2"></i><span>${spec}</span>`;
        specsList.appendChild(li);
    });
    
    // 3. Update WhatsApp link
    const whatsappLink = document.getElementById('modalWhatsappLink');
    const encodedTitle = encodeURIComponent(title);
    // Link uses primary number 9958655713
    whatsappLink.href = `https://wa.me/919958655713?text=I%20am%20interested%20in%20your%20${encodedTitle}%20product%20(Price%20Approx%20Rs%20${price}/unit).%20Please%20send%20bulk%20pricing.`;

    // Show the modal
    document.getElementById('productModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = ''; 
}

// --- Delivery Check Function (Mock) ---
function checkDeliveryArea() {
    const pincode = prompt("Please enter your 6-digit Pincode to check delivery availability:");

    if (pincode && /^\d{6}$/.test(pincode)) {
        if (pincode.startsWith('11') || pincode.startsWith('40') || pincode.startsWith('70') || pincode.startsWith('56')) { 
            alert(`✅ Great news! We deliver to your Pincode ${pincode} within 2-5 business days.`);
        } else {
            alert(`⚠️ We cover most areas. Please contact us on WhatsApp (9958655713) or submit the inquiry form to confirm delivery to Pincode ${pincode}.`);
        }
    } else if (pincode !== null) {
        alert("❌ Please enter a valid 6-digit Pincode.");
    }
}

// --- Mock Backend Integration (Inquiry Form Submission) ---
function handleSubmit(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('contactName').value,
        company: document.getElementById('contactCompany').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        productInterest: document.getElementById('contactProduct').value,
        message: document.getElementById('contactMessage').value,
        timestamp: new Date().toISOString()
    };

    console.log("--- New Inquiry Submitted (Mock Backend Data) ---");
    console.log(JSON.stringify(formData, null, 2));
    
    alert('Inquiry Sent Successfully! (Data captured for backend). We will contact you shortly on your provided contact details or WhatsApp. Thank you!');
    event.target.reset(); 
}

// --- General Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Contact Form Submission listener
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
    
    // 2. Smooth scrolling for all internal navigation links (e.g., #home, #products)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // 3. Close modal when clicking outside (on the overlay)
    const modal = document.getElementById('productModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });

    // 4. Initial check for alert bar visibility and setting padding
    const alertBar = document.getElementById('alertBar');
    const mainNav = document.getElementById('mainNav');
    const homeSection = document.getElementById('home');
    
    if (alertBar && mainNav && homeSection) {
        // Initial setup for navigation and content padding
        const navHeight = mainNav.offsetHeight; 
        const alertHeight = alertBar.offsetHeight;
        
        mainNav.style.top = `${alertHeight}px`; 
        homeSection.style.paddingTop = `${navHeight + alertHeight + 30}px`; 
    }
});
