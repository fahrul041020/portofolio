document.addEventListener('DOMContentLoaded', () => {
    // === 1. Navigation & Sticky Header ===
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-links');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link indicator on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });


    // === 2. Theme Toggle (Dark / Light Mode) ===
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // SVG paths for Sun and Moon
    const moonIconPath = 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.38 5.38 0 0 1-4.4 2.26 5.4 5.4 0 0 1-5.4-5.4 5.38 5.38 0 0 1 2.26-4.4C12.92 3.04 12.46 3 12 3z';
    const sunIconPath = 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM5.64 5.64a1 1 0 0 1 1.41 0l1.41 1.41a1 1 0 0 1-1.41 1.41L5.64 7.05a1 1 0 0 1 0-1.41zm11.31 11.31a1 1 0 0 1 1.41 0l1.41 1.41a1 1 0 0 1-1.41 1.41l-1.41-1.41a1 1 0 0 1 0-1.41zM2 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zM5.64 18.36a1 1 0 0 1 0-1.41l1.41-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41 0zM16.95 5.64a1 1 0 0 1 0-1.41l1.41-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41 0z';

    // Get saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.querySelector('path').setAttribute('d', moonIconPath);
        } else {
            themeIcon.querySelector('path').setAttribute('d', sunIconPath);
        }
    }


    // === 3. Typing Text Effect ===
    const typingText = document.getElementById('typing-text');
    const words = ['Front End', 'Laravel & PHP', 'Web Development', 'SQA Testing', 'Desain Modern'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }
    type();


    // === 4. Scroll Reveal & Skill Bar Animation ===
    const reveals = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If it's the about section, trigger skill bar animation
                if (entry.target.id === 'about') {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });


    // === 5. Project Filtering ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // === 6. Project Detail Modal ===
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackBtn = document.getElementById('modal-back-btn');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDesc = document.getElementById('modal-desc');
    const modalSvg = document.getElementById('modal-svg');

    // Projects Mock Data
    const projectDetails = {
        '1': {
            title: 'Sistem Absensi Karyawan',
            category: 'Web App',
            tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'ChartJS'],
            desc: 'Sistem absensi lengkap dengan fitur absensi masuk/pulang, rekap kehadiran otomatis, manajemen pengajuan cuti, serta visualisasi data statistik kehadiran bulanan untuk memudahkan HRD.',
            imgSrc: 'assets/images/dashboard_admin.png',
            liveUrl: 'http://absensilaksanajaya.lovestoblog.com' // Ganti dengan URL live proyek Anda, contoh: 'https://absensi.example.com'
        },
        '2': {
            title: 'Sistem Absensi Karyawan Web Design',
            category: 'UI/UX',
            tags: ['Figma', 'UI/UX', 'Web Design'],
            desc: 'Desain mockup antarmuka web sistem absensi karyawan. Berfokus pada panel admin yang bersih, pencatatan absensi yang intuitif, serta penyesuaian layout dashboard yang responsif dan mudah digunakan oleh karyawan maupun tim HRD.',
            imgSrc: 'assets/images/ui_ux.png',
            liveUrl: 'https://www.figma.com/design/81SQ13DDHjTZbenLiF7Dsj/Absensi?node-id=0-1&t=zjmzlKuZ6DslXCiZ-1' // Ganti dengan link Figma Anda, contoh: 'https://figma.com/file/...'
        }
    };

    const modalMediaContainer = document.getElementById('modal-media-container');
    const modalLiveBtn = document.getElementById('modal-live-btn');

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectDetails[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;

                // Render image or SVG dynamically
                if (data.imgSrc) {
                    modalMediaContainer.innerHTML = `<img src="${data.imgSrc}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">`;
                } else if (data.svgContent) {
                    modalMediaContainer.innerHTML = `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%; background:#151c2c;">${data.svgContent}</svg>`;
                }

                // Render tags
                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tech-tag';
                    tagSpan.textContent = tag;
                    modalTags.appendChild(tagSpan);
                });

                // Update tombol Lihat Live
                modalLiveBtn.removeAttribute('download');
                modalLiveBtn.textContent = 'Lihat Live';
                if (data.liveUrl && data.liveUrl !== '#') {
                    modalLiveBtn.href = data.liveUrl;
                    modalLiveBtn.style.display = '';
                } else {
                    modalLiveBtn.href = '#';
                    modalLiveBtn.style.display = 'none'; // Sembunyikan jika belum ada URL
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalBackBtn.addEventListener('click', closeModal);

    // Certificate Modal Listener
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');
    viewCertBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certTitle = btn.getAttribute('data-cert-title');
            const certIssuer = btn.getAttribute('data-cert-issuer');
            const certDate = btn.getAttribute('data-cert-date');
            const certImg = btn.getAttribute('data-cert-img');

            modalTitle.textContent = certTitle;
            modalDesc.textContent = `Sertifikat resmi diterbitkan oleh ${certIssuer} pada ${certDate}.`;

            if (certImg) {
                if (certImg.toLowerCase().endsWith('.pdf')) {
                    modalMediaContainer.innerHTML = `<iframe src="${certImg}" style="width: 100%; height: 100%; border: none;"></iframe>`;
                    modalLiveBtn.href = certImg;
                    modalLiveBtn.download = certTitle.replace(/[^a-zA-Z0-9]/g, '_') + '.pdf';
                    modalLiveBtn.textContent = 'Unduh PDF';
                    modalLiveBtn.style.display = '';
                } else {
                    modalMediaContainer.innerHTML = `<img src="${certImg}" alt="${certTitle}" style="width: 100%; height: 100%; object-fit: contain; background: #000;">`;
                    modalLiveBtn.style.display = 'none';
                }
            } else {
                modalMediaContainer.innerHTML = `<div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg, var(--bg-secondary), var(--bg-primary)); padding:20px; text-align:center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px;">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    <h4 style="color:var(--text-primary); font-size:1.1rem; margin-bottom:4px;">${certIssuer}</h4>
                    <p style="color:var(--text-muted); font-size:0.85rem;">Tanggal Terbit: ${certDate}</p>
                </div>`;
                modalLiveBtn.style.display = 'none';
            }

            modalTags.innerHTML = '';
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tech-tag';
            tagSpan.textContent = 'Sertifikat Resmi';
            modalTags.appendChild(tagSpan);

            modalLiveBtn.style.display = 'none';

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal if clicked outside modal-content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


    // === 7. Contact Form Handling ===
    const contactForm = document.getElementById('contact-form');
    const successAlert = document.getElementById('form-success');
    const errorAlert = document.getElementById('form-error');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ganti dengan nomor WhatsApp Anda (menggunakan kode negara, tanpa tanda '+')
        const whatsappNumber = '6282215397137';

        // Pesan default yang dikirim ke WhatsApp
        const textMessage = `Halo kak Fakhrul !!, saya tertarik untuk mendiskusikan peluang proyek atau kolaborasi web dengan Anda.`;
        const encodedMessage = encodeURIComponent(textMessage);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

        // Buka chat WhatsApp di tab baru
        window.open(whatsappUrl, '_blank');

        // Tampilkan feedback sukses
        successAlert.style.display = 'block';

        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 5000);
    });
});
