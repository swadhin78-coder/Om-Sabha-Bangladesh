document.addEventListener('DOMContentLoaded', function() {
    
    // --- ১. মোবাইল মেনু টগল লজিক (3 ডট/হ্যাবার্গার আইকন) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-btn');

    // মেনু খোলার ফাংশন
    function openMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            document.body.classList.add('no-scroll'); // পেজের স্ক্রল বন্ধ
        }
    }

    // মেনু বন্ধ করার ফাংশন
    function closeMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll'); // পেজের স্ক্রল চালু
        }
    }

    // ইভেন্ট লিসেনার সেট করা
    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- ২. প্রতিদিনের বার্তা (Daily Message) পেজের লজিক ---
    const dailyMessageSections = document.querySelectorAll('.daily-article-section');
    const mainContent = document.getElementById('daily-messages-container');
    
    if (dailyMessageSections.length > 0 && mainContent) {
        
        // বর্তমান তারিখ YYYY-MM-DD ফরম্যাটে তৈরি করা
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        // 🛑 এইখানে কোনো স্থির মান নয়, বর্তমান বছর স্বয়ংক্রিয়ভাবে ব্যবহার করা হচ্ছে।
        const todayDateString = `${yyyy}-${mm}-${dd}`; 
        
        // CSS ট্রানজিশন ব্যবহার করে সেকশনগুলিকে flex কলামে সাজানোর প্রস্তুতি
        mainContent.style.display = 'flex';
        mainContent.style.flexDirection = 'column';
        
        dailyMessageSections.forEach(section => {
            const articleDate = section.getAttribute('data-date');
            
            // ১. যদি আজকের তারিখের বার্তা পাওয়া যায়
            if (articleDate === todayDateString) {
                section.classList.add('today'); // CSS হাইলাইট হবে
            } else {
                section.classList.remove('today');
            }
        });
        
        // ২. সমস্ত সেকশনকে তারিখ অনুযায়ী সাজানো
        const sortedSections = Array.from(dailyMessageSections).sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            // ডিসেন্ডিং অর্ডার: নতুন তারিখ আগে (b - a)
            return dateB - dateA; 
        });

        // ৩. সাজানো সেকশনগুলি DOM-এ পুনরায় যুক্ত করা (নতুন ক্রম অনুযায়ী)
        const heroSection = document.getElementById('daily-hero');
        
        // heroSection এবং অন্যান্য স্থির কন্টেন্ট বাদ দিয়ে DOM পুনর্বিন্যাস
        
        // প্রথমে হিরো সেকশন যোগ করুন (যদি থাকে)
        if (heroSection) {
            mainContent.insertBefore(heroSection, mainContent.firstChild);
        }

        // এরপর সাজানো সেকশনগুলো যোগ করুন
        sortedSections.forEach(section => {
            mainContent.appendChild(section); 
        });
        
    }
    
    // --- ৩. ফুটারে বর্তমান বছর আপডেট করা ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        const year = new Date().getFullYear();
        currentYearSpan.textContent = year;
    }
    
});
