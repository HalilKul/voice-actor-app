document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menü işlevselliği
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Menü bağlantılarına tıklandığında menüyü kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sayfa içi gezinme animasyonu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Hamburger menüyü kapat (eğer açıksa)
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }

                // Yumuşak kaydırma animasyonu
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth',
                    duration: 1000 // Animasyon süresi
                });

                // URL'yi güncelle
                history.pushState(null, null, targetId);

                // Hedef bölümü vurgula
                targetElement.classList.add('section-highlight');
                setTimeout(() => {
                    targetElement.classList.remove('section-highlight');
                }, 1500);
            }
        });
    });
    
    // CTA butonları için olay dinleyicileri
    const ctaButton = document.querySelector('.cta-button');
    const demoButton = document.querySelector('.demo-button');
    const pitchButton = document.querySelector('.pitch-button');
    
    ctaButton.addEventListener('click', () => {
        // Kullanıcıyı demo sayfasına yönlendir
        document.querySelector('#demo').scrollIntoView({ behavior: 'smooth' });
    });
    
    demoButton.addEventListener('click', () => {
        alert('Sesli kitap örneği oynatılıyor...');
        
    });
    
    pitchButton.addEventListener('click', () => {
        alert('Pitch Deck indiriliyor...');
       
    });
    
    // İletişim formu gönderimi
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        
        console.log('Form verileri:', formValues);
        
        // Kullanıcıya geri bildirim veriyor
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        this.reset();
    });
    
    // Sayfa yüklendiğinde animasyon
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease';
        heroContent.style.opacity = '1';
    }, 300);
    
    // Scroll animasyonları
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
    
    // Animasyon sınıfı için CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
});

// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menü işlevselliği
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Ses kontrolü için gerekli elementler
    const audio = document.getElementById('demoAudio');
    const playBtn = document.querySelector('.play-btn');

    if (audio && playBtn) {
        // Ses dosyası yüklendiğinde
        audio.addEventListener('loadeddata', () => {
            console.log('Ses dosyası başarıyla yüklendi');
            playBtn.disabled = false;
        });

        // Ses dosyası yüklenirken hata olursa
        audio.addEventListener('error', (e) => {
            console.error('Ses dosyası yükleme hatası:', e);
            playBtn.disabled = true;
            playBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Hata';
        });
    }

    // Sayfa içi yumuşak geçişler
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Hamburger menüyü kapat
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                }

                // Sayfayı kaydır
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        });
    });
});

// Ses çalma/durdurma fonksiyonu
function toggleAudio() {
    const audio = document.getElementById('demoAudio');
    const playBtn = document.querySelector('.play-btn');
    
    if (!audio || !playBtn) return;

    const playIcon = playBtn.querySelector('i');
    
    if (audio.paused) {
        audio.play()
            .then(() => {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                playBtn.classList.add('playing');
            })
            .catch(error => {
                console.error('Ses çalma hatası:', error);
                playBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Hata';
            });
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playBtn.classList.remove('playing');
    }
}

function playAudioInNewTab() {
    const audioUrl = 'media/simyaci-demo.mp3';
    window.open(audioUrl, '_blank');
}

// Pitch Deck indirme fonksiyonu
function downloadPitchDeck() {
    const pdfUrl = 'media/VoiceActor Pitch Deck.pptx';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'VoiceActor-Pitch-Deck.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} 