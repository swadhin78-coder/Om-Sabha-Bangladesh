document.addEventListener('DOMContentLoaded', function() {
    // ... (আপনার অন্যান্য DOMContentLoaded লজিক যেমন, মোবাইল মেনু টগল, ডোনেট বাটন ইত্যাদি) ...

    // --- প্রতিদিনের বার্তা (Daily Message) পেজের লজিক ---
    const dailyMessageSections = document.querySelectorAll('.daily-article-section');
    const mainContent = document.getElementById('daily-messages-container');
    
    if (dailyMessageSections.length > 0 && mainContent) {
        
        // বর্তমান তারিখ YYYY-MM-DD ফরম্যাটে তৈরি করা
        // এখানে বর্তমান সময়: Wednesday, December 10, 2025
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        const todayDateString = `${yyyy}-${mm}-${dd}`; // যেমন: "2025-12-10"
        
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
        // .today ক্লাস থাকার কারণে CSS order: -1 ব্যবহার করে এটি সবার উপরে চলে আসবে।
        // বাকি সেকশনগুলি ডিসেন্ডিং (নতুন থেকে পুরোনো) ক্রমে সাজানো হলো
        
        const sortedSections = Array.from(dailyMessageSections).sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            // ডিসেন্ডিং অর্ডার: নতুন তারিখ আগে (b - a)
            return dateB - dateA; 
        });

        // ৩. সাজানো সেকশনগুলি DOM-এ পুনরায় যুক্ত করা (নতুন ক্রম অনুযায়ী)
        const heroSection = document.getElementById('daily-hero');
        
        // heroSection এবং অন্যান্য স্থির কন্টেন্ট বাদ দিয়ে DOM পুনর্বিন্যাস
        if (heroSection) {
             mainContent.appendChild(heroSection); // hero কে প্রথমে রাখুন
        }

        sortedSections.forEach(section => {
             // নতুন ক্রমানুসারে সেকশনগুলিকে hero এর পরে যুক্ত করা হলো
             mainContent.appendChild(section); 
        });
        
        // hero কে নিশ্চিতভাবে সবার উপরে রাখুন
         if (heroSection) {
             mainContent.insertBefore(heroSection, mainContent.firstChild);
        }
    }
    // ... (বাকি কোড) ...
});