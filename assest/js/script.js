// ====================================
// ১. গ্লোবাল ভেরিয়েবল এবং ফাংশন
// ====================================

let slideIndex = 1;
let slideTimer;
const slideInterval = 3000; // ৩ সেকেন্ড অটো-প্লে বিরতি (ইউজারের অনুরোধ অনুযায়ী)


/**
 * স্লাইড স্বয়ংক্রিয়ভাবে পরিবর্তন করে।
 */
function autoPlaySlides() {
    // slideIndex কে এক বাড়িয়ে showSlides কল করা
    showSlides(slideIndex + 1);
}

/**
 * স্লাইড দেখানোর মূল ফাংশন।
 * @param {number} n - স্লাইডের ইনডেক্স নম্বর।
 */
function showSlides(n) {
    const slides = document.querySelectorAll(".slide"); 
    const dots = document.querySelectorAll(".dot"); 
    
    // কোনো স্লাইড না থাকলে ফাংশন বন্ধ
    if (slides.length === 0) return;

    // স্লাইড ইনডেক্স চেক ও লুপ
    if (n > slides.length) {
        slideIndex = 1;
    } else if (n < 1) { // else if ব্যবহার করে লজিক ঠিক করা হলো
        slideIndex = slides.length;
    } else {
        slideIndex = n; // যখন n বৈধ, তখন গ্লোবাল ইনডেক্স আপডেট করা
    }
    
    // সমস্ত স্লাইড হাইড করা এবং ডট থেকে 'active-dot' ক্লাস সরানো
    slides.forEach(slide => {
        slide.style.display = "none";
    });
    dots.forEach(dot => {
        dot.classList.remove("active-dot"); 
    });
    
    // বর্তমান স্লাইড এবং ডট হাইলাইট করা
    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].classList.add("active-dot"); 
    
    // স্বয়ংক্রিয় স্লাইড পরিবর্তনের জন্য টাইমার রিসেট ও সেট করা
    clearTimeout(slideTimer);
    slideTimer = setTimeout(autoPlaySlides, slideInterval); 
}

/**
 * নেভিগেশন তীর বাটন ক্লিক হ্যান্ডেল করে (নেক্সট/প্রিভিয়াস)।
 * (HTML থেকে সরাসরি কল করার জন্য window অবজেক্টের সাথে যুক্ত করা হলো)
 * @param {number} n - (+1 বা -1)
 */
window.plusSlides = function(n) {
    // slideIndex এর বর্তমান মানের সাথে n যোগ করে showSlides কে কল করা হলো
    showSlides(slideIndex + n);
}

/**
 * বর্তমান স্লাইড সেট করার ফাংশন (ডট ক্লিক)।
 * (HTML থেকে সরাসরি কল করার জন্য window অবজেক্টের সাথে যুক্ত করা হলো)
 * @param {number} n - সরাসরি স্লাইড ইনডেক্স।
 */
window.currentSlide = function(n) {
    showSlides(n);
}


// ====================================
// ২. DOMContentLoaded ইভেন্ট হ্যান্ডলার
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // --- DOM এলিমেন্ট নির্বাচন ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const currentYearSpan = document.getElementById('current-year'); 
    const donateButton = document.querySelector('.donate-button'); 
    const sliderContainer = document.querySelector('.slider-container'); 
    const bKashTriggerButton = document.getElementById('bKash-trigger-button');
    const bKashInfoBox = document.getElementById('bKash-info');

    
    // ১. স্লাইডার শুরু করা (যদি স্লাইডার সেকশন থাকে)
    if (sliderContainer) {
        showSlides(slideIndex);
    }
    
    // ২. স্বয়ংক্রিয় বছর আপডেট
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ৩. মোবাইল মেনু টগল ফাংশন এবং স্ক্রল লক
    function toggleMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.toggle('active'); 
            // document.body.classList.toggle('no-scroll');
        }
    }

    if (menuToggle && mobileMenuOverlay) {
        menuToggle.addEventListener('click', toggleMobileMenu);
        closeBtn?.addEventListener('click', toggleMobileMenu);
    }

    // ৪. মেনু লিঙ্কে ক্লিক করলে মেনু বন্ধ করা
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ৫. ডোনেশন বাটন ক্লিক হ্যান্ডলার (সাধারণ অ্যালার্ট)
    if (donateButton) {
        donateButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            alert('আপনাকে আমাদের ডোনেশন পেজে নিয়ে যাওয়া হচ্ছে। দয়া করে অনুদানের জন্য প্রস্তুত থাকুন।');
        });
    }
    
    // ৬. বিকাশ বাটন ক্লিক হ্যান্ডলার (নির্দেশাবলী টগল)
    if (bKashTriggerButton && bKashInfoBox) {
        bKashTriggerButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            bKashInfoBox.classList.toggle('visible');

            if (bKashInfoBox.classList.contains('visible')) {
                 bKashTriggerButton.textContent = 'নির্দেশাবলী লুকান';
            } else {
                 bKashTriggerButton.textContent = 'বিকাশ/অনলাইনে দান করুন';
            }
        });
    }

    // ৭. স্লাইডারে হোভার/টাচ করলে অটো-প্লে বন্ধ করার লজিক
    if (sliderContainer) {
        let isPaused = false;
        
        const pauseSlider = () => {
            clearTimeout(slideTimer);
            isPaused = true;
        };
        
        const resumeSlider = () => {
            if (isPaused) {
                // বিরতির পর আবার টাইমার সেট করে শুরু করা
                slideTimer = setTimeout(autoPlaySlides, slideInterval); 
                isPaused = false;
            }
        };

        // ইভেন্ট লিসেনার যোগ করা
        sliderContainer.addEventListener('mouseenter', pauseSlider);
        sliderContainer.addEventListener('mouseleave', resumeSlider);
        
        // মোবাইল ডিভাইসের জন্য টাচ ইভেন্ট যোগ করা
        sliderContainer.addEventListener('touchstart', pauseSlider);
        sliderContainer.addEventListener('touchend', resumeSlider);
    }
});


// ====================================
// ৩. Window Load ইভেন্ট হ্যান্ডলার
// ====================================

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // লোড হওয়ার 300 মিলিসেকেন্ড পর প্রিলোডারটি অদৃশ্য হবে (ফেইড আউট)
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 300); 
    }
});