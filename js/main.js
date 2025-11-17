// JavaScript for form handling and mobile menu toggle

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inquiry-form');
    const messageBox = document.getElementById('message-box');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });

    // --- Inquiry Form Submission ---
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the default form submission

        // In a real application, you would collect the data and send it to your server/CRM.
        // const formData = new FormData(form);
        // const data = Object.fromEntries(formData.entries());
        // console.log('Form data submitted:', data);

        // Simulate a successful submission
        const name = document.getElementById('name').value;
        
        // Show a success message in the custom message box
        messageBox.textContent = `Thank you, ${name}! Your inquiry for a luxury event has been received by JB Events and Moments. We will contact you shortly.`;
        messageBox.classList.remove('hidden');
        
        // Clear the form after a short delay
        setTimeout(() => {
            form.reset();
        }, 500);

        // Hide the message after 5 seconds
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 7000);
    });
    
    // --- Auto-close mobile menu on link click ---
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });
});


 // Custom Configuration for Bodoni font and luxurious theme 


tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-gold': '#D4AF37', // Rich Gold (Primary Accent)
                'secondary-black': '#000000', // True Black (Contrast/Buttons)
                'dark-text': '#111827', // Near Black for body text
                'page-bg': '#FFFFFF', // Pure White background
                'light-gold': '#F2E8D5', // Light Gold for subtle backgrounds

                // Custom colors derived from the image's aesthetic
                'custom-cream': '#fcfbf8', // Very light, off-white background
                'custom-accent': '#a08d7c', // Muted brown/rose for headings
                'custom-social-bg': '#e7d8d0', // Lighter tone for social buttons
                'custom-link': '#3b82f6', // Standard blue for clickable links (email)
            
            },
            fontFamily: {
                // Defined a serif stack using Bodoni with classic elegant fallbacks
                bodoni: ['Bodoni', 'Garamond', 'Georgia', 'serif'],
                lora: ['Lora', 'serif'],
            },
        }
    }
}


// --- Contact Popup Logic ---

  document.addEventListener("DOMContentLoaded", () => {
    const contactBtn = document.getElementById("contactBtn");
    const ContactBtn2 = document.getElementById("ContactBtn2");
    const popupOverlay = document.getElementById("popupOverlay");
    const closePopup = document.getElementById("closePopup");
  
    // Open popup
    contactBtn.addEventListener("click", () => {
      popupOverlay.classList.remove("hidden");
    });

    ContactBtn2.addEventListener("click", () => {
        popupOverlay.classList.remove("hidden");
      });
  
    // Close popup
    closePopup.addEventListener("click", () => {
      popupOverlay.classList.add("hidden");
    });
  
    // Close popup if clicked outside the form
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.classList.add("hidden");
      }
    });
  });
  


  // --- Testimonials carousel ---
(() => {
    const track = document.getElementById('tTrack');
    if (!track) return; // page safety
  
    const slides = Array.from(track.children);
    const prev = document.getElementById('tPrev');
    const next = document.getElementById('tNext');
    const dots = Array.from(document.querySelectorAll('#tDots button'));
    const section = document.getElementById('testimonials');
  
    let idx = 0;
    function goTo(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('bg-primary-gold', j === idx));
      dots.forEach((d, j) => d.classList.toggle('bg-stone-300', j !== idx));
    }
  
    prev.addEventListener('click', () => goTo(idx - 1));
    next.addEventListener('click', () => goTo(idx + 1));
    dots.forEach((d, j) => d.addEventListener('click', () => goTo(j)));
  
    // autoplay (pause on hover)
    let timer = setInterval(() => goTo(idx + 1), 5000);
    section.addEventListener('mouseenter', () => clearInterval(timer));
    section.addEventListener('mouseleave', () => {
      timer = setInterval(() => goTo(idx + 1), 5000);
    });
  
    goTo(0);
  })();


  // text elements to animate
const animatedElements = document.querySelectorAll(
  ".fade-left, .fade-left-strong, .image-reveal"
);

// Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Animate only once
      }
    });
  },
  { threshold: 0.3 }
);


// Observe each element
animatedElements.forEach((el) => observer.observe(el));



  // List of elements with custom animation durations
const images = [
  { selector: ".image1", duration: "1s" },
  { selector: ".image2", duration: "2s" },
  { selector: ".image3", duration: "3s" },
  { selector: ".image4", duration: "1s" },
  { selector: ".image5", duration: "2s" },
  { selector: ".image6", duration: "3s" }
];

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty("--duration", entry.target.dataset.duration);
        entry.target.classList.add("show");
        observer2.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 } // ~80% from top equivalent
);

// Apply durations and observe
images.forEach((img) => {
  const element = document.querySelector(img.selector);
  if (element) {
    element.dataset.duration = img.duration;
    observer2.observe(element);
  }
});


// Pop-in animation using Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  const image = document.querySelector("#animated-image");

  // Add initial pop-in state
  image.classList.add("pop-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        image.classList.add("visible");
        observer.unobserve(image); // animate once only
      }
    });
  }, { threshold: 0.5 });

  observer.observe(image);
});



// Pure JavaScript Hero Slider (No GSAP)

const slides = document.querySelectorAll(".hero-slide");
let current = 0;
let autoSlide;

// Initialize: show first slide
slides[current].classList.add("active");

// Switch to a slide index
function goToSlide(index) {
  if (index === current) return;

  slides[current].classList.remove("active");
  slides[index].classList.add("active");

  current = index;
}

// Auto play every 3 seconds
function startAutoSlide() {
  autoSlide = setInterval(() => {
    let next = (current + 1) % slides.length;
    goToSlide(next);
  }, 3000);
}

function stopAuto() {
  clearInterval(autoSlide);
}

// Next & Prev buttons
document.getElementById("nextSlide").addEventListener("click", () => {
  stopAuto();
  goToSlide((current + 1) % slides.length);
  startAutoSlide();
});

document.getElementById("prevSlide").addEventListener("click", () => {
  stopAuto();
  goToSlide((current - 1 + slides.length) % slides.length);
  startAutoSlide();
});

// Start autoplay
startAutoSlide();
