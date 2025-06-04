// Presentation App JavaScript
class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 8;
        this.isCodeModalOpen = false;
        
        // Code snippets for each AI feature
        this.codeSnippets = {
            gemma: {
                title: "Gemma AI Summarization",
                code: `def gemma_summarize(text, lang):
    prompt = (
        "You are a professional summarizer for documents. "
        f"Summarize the following text in {lang} language:\\n\\n{text}"
    )
    model = genai.GenerativeModel(GEMMA_MODEL)
    response = model.generate_content(prompt)
    return response.text.strip()`
            },
            language: {
                title: "Language Detection",
                code: `def detect_language(text_pages):
    full_text = " ".join(text_pages)
    from langdetect import detect
    try:
        lang_code = detect(full_text)
        return {'en': 'English', 'ko': 'Korean', 'ja': 'Japanese'}.get(lang_code, 'English')
    except:
        return 'English' # fallback`
            },
            translation: {
                title: "Translation Functionality", 
                code: `def translate_text(text, src_lang='auto', tgt_lang='en'):
    '''
    Translate text using Google Translate via googletrans.
    src_lang: source language code (e.g., 'auto', 'en', 'ko')  
    tgt_lang: target language code (e.g., 'en', 'fr', 'ko')
    '''
    translator = Translator()
    try:
        result = translator.translate(text, src=src_lang, dest=tgt_lang)
        return result.text
    except Exception as e:
        print(f"Translation error: {e}")
        return text # fallback: return original if translation fails`
            },
            ocr: {
                title: "OCR Capabilities",
                code: `def extract_text_with_ocr(pdf_file):
    '''Extract text using OCR for scanned documents'''
    pdf_file.seek(0)
    pdf = fitz.open(stream=pdf_file.read(), filetype="pdf")
    text_pages = []
    for page_num in range(pdf.page_count):
        page = pdf[page_num]
        pix = page.get_pixmap()
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        text = pytesseract.image_to_string(img)
        text_pages.append(text)
    pdf.close()
    return text_pages`
            },
            qa: {
                title: "Q&A Functionality",
                code: `def ask_question_local(summary, question):
    prompt = (
        "You are a helpful assistant. Based on the summary below, "
        "answer the user's question clearly.\\n\\n"
        f"Summary:\\n{summary}\\n\\n"
        f"Question: {question}\\n"
        f"Answer:"
    )
    model = genai.GenerativeModel(GEMMA_MODEL)
    response = model.generate_content(prompt)
    ai_answer = response.text.strip()
    return (
        f"As for your uploaded PDF, here's what I found:\\n\\n"
        f"📌 Question: {question}\\n"
        f"💬 Answer: {ai_answer}\\n\\n"
        f"Generally, this is based on the summarized content of the document."
    )`
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateSlideCounter();
        this.updateNavigationState();
    }
    
    bindEvents() {
        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSlide());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSlide());
        
        // Slide dots navigation
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideNumber = parseInt(e.target.dataset.slide);
                this.goToSlide(slideNumber);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isCodeModalOpen) return;
            
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key >= '1' && e.key <= '8') {
                this.goToSlide(parseInt(e.key));
            } else if (e.key === 'Escape') {
                this.closeCodeModal();
            }
        });
        
        // AI feature buttons (Slide 5)
        document.querySelectorAll('.ai-feature-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const feature = e.target.dataset.feature;
                this.showCode(feature);
            });
        });
        
        // Code modal close button
        document.getElementById('close-code').addEventListener('click', () => {
            this.closeCodeModal();
        });
        
        // Close modal when clicking outside
        document.getElementById('code-modal').addEventListener('click', (e) => {
            if (e.target.id === 'code-modal') {
                this.closeCodeModal();
            }
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isCodeModalOpen) {
                this.closeCodeModal();
            }
        });
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides || slideNumber === this.currentSlide) {
            return;
        }
        
        // Remove active class from current slide
        const currentSlideElement = document.querySelector('.slide.active');
        if (currentSlideElement) {
            currentSlideElement.classList.remove('active');
            if (slideNumber < this.currentSlide) {
                currentSlideElement.classList.add('prev');
            }
        }
        
        // Add active class to new slide
        const newSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (newSlideElement) {
            newSlideElement.classList.remove('prev');
            newSlideElement.classList.add('active');
        }
        
        // Update current slide
        this.currentSlide = slideNumber;
        
        // Update UI
        this.updateSlideCounter();
        this.updateNavigationState();
        this.updateSlideDots();
        
        // Close code modal if open
        this.closeCodeModal();
    }
    
    updateSlideCounter() {
        document.getElementById('current-slide').textContent = this.currentSlide;
        document.getElementById('total-slides').textContent = this.totalSlides;
    }
    
    updateNavigationState() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.currentSlide === 1;
        nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    updateSlideDots() {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });
        
        const activeDot = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        if (activeDot) {
            activeDot.classList.add('active');
        }
    }
    
    showCode(feature) {
        const snippet = this.codeSnippets[feature];
        if (!snippet) return;
        
        const modal = document.getElementById('code-modal');
        const title = document.getElementById('code-title');
        const codeContent = document.getElementById('code-content');
        
        title.textContent = snippet.title;
        codeContent.textContent = snippet.code;
        
        modal.classList.remove('hidden');
        this.isCodeModalOpen = true;
        
        // Focus on close button for accessibility
        setTimeout(() => {
            document.getElementById('close-code').focus();
        }, 100);
    }
    
    closeCodeModal() {
        const modal = document.getElementById('code-modal');
        modal.classList.add('hidden');
        this.isCodeModalOpen = false;
    }
    
    // Auto-start presentation
    start() {
        this.goToSlide(1);
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PresentationApp();
    app.start();
    
    // Add some visual enhancements
    addVisualEnhancements();
});

// Additional visual enhancements
function addVisualEnhancements() {
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add intersection observer for slide animations
    const slides = document.querySelectorAll('.slide');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    slides.forEach(slide => {
        slideObserver.observe(slide);
    });
    
    // Add hover effects for interactive elements
    document.querySelectorAll('.ai-feature-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading states for code buttons
    document.querySelectorAll('.ai-feature-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.opacity = '0.8';
            setTimeout(() => {
                btn.style.opacity = '1';
            }, 200);
        });
    });
    
    // Add focus trap for modal
    const modal = document.getElementById('code-modal');
    const closeBtn = document.getElementById('close-code');
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Keep focus within modal
            e.preventDefault();
            closeBtn.focus();
        }
    });
    
    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        if (document.getElementById('code-modal').classList.contains('hidden')) {
            touchStartX = e.changedTouches[0].screenX;
        }
    });
    
    document.addEventListener('touchend', (e) => {
        if (document.getElementById('code-modal').classList.contains('hidden')) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe left - next slide
                const app = window.presentationApp;
                if (app) app.nextSlide();
            } else {
                // Swipe right - previous slide
                const app = window.presentationApp;
                if (app) app.previousSlide();
            }
        }
    }
    
    // Make app globally accessible for touch events
    window.presentationApp = new PresentationApp();
}