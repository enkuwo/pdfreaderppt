// Presentation App JavaScript
class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 9;
        this.isCodeModalOpen = false;
        
        // Code snippets for each AI feature
        this.codeSnippets = {
            appjs: {
                title: "app.js - Secondary Application Logic",
                code: `let chartLoaded = false;

    function showTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById('tab-' + tabName).classList.add('active');

        if (tabName === 'chart' && !chartLoaded) {
            renderChart();
            chartLoaded = true;
        }
    }

    function searchSummary() {
        const input = document.getElementById("searchInput").value.toLowerCase();
        const summaryDiv = document.getElementById("tab-summary");
        const original = summaryDiv.innerText;

        if (!input) {
            summaryDiv.innerHTML = summaryDiv.innerText;
            return;
        }

        const regex = new RegExp("({$input})", "gi");
        const highlighted = original.replace(regex, "<mark>$1</mark>");
        summaryDiv.innerHTML = highlighted;
    }

    function renderChart() {
        const ctx = document.getElementById('myChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['example', 'data', 'result'],
                    datasets: [{
                        label: 'Keyword Count',
                        data: [5, 3, 2],
                        backgroundColor: ['#007bff', '#6c757d', '#28a745']
                    }]
                }
            });
        }
    }
    `
            },


            stylecss: {
                title: "styl.css - Presentation Styles",
                code: `/* Import Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

/* === GLOBAL ANIMATIONS === */
@keyframes floatIn {
  0% { transform: translateY(40px) scale(0.98); opacity: 0; }
  60% { transform: translateY(-8px) scale(1.02); opacity: 0.7; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes glassPulse {
  0%, 100% { box-shadow: 0 8px 24px 0 rgba(16,163,127,0.08); }
  50% { box-shadow: 0 12px 32px 0 rgba(16,163,127,0.18); }
}

/* === BASE LAYOUT === */
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #e0f7fa 0%, #f7f9fb 100%);
  margin: 0;
  padding: 40px;
  color: #181c21;
  min-height: 100vh;
  transition: background 0.5s cubic-bezier(.4,0,.2,1), color 0.3s;
  animation: fadeIn 1s cubic-bezier(.4,0,.2,1);
  letter-spacing: 0.01em;
}

body.dark {
  background: linear-gradient(135deg, #15181c 0%, #23272e 100%);
  color: #f5f5f5;
}

/* === CONTAINER (GLASSMORPHISM) === */
.container {
  max-width: 880px;
  margin: 0 auto;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(16,163,127,0.10), 0 1.5px 8px rgba(0,0,0,0.04);
  padding: 48px 40px;
  animation: floatIn 1.1s cubic-bezier(.4,0,.2,1);
  position: relative;
  z-index: 1;
  border: 1.5px solid rgba(16,163,127,0.07);
  transition: background 0.4s, box-shadow 0.4s;
  animation: glassPulse 2.5s infinite alternate;
}
body.dark .container {
  background: rgba(44, 48, 56, 0.86);
  box-shadow: 0 8px 32px rgba(16,163,127,0.13), 0 1.5px 8px rgba(0,0,0,0.16);
  border: 1.5px solid rgba(16,163,127,0.12);
}

/* === HEADINGS === */
h1, h2, h3, h4 {
  text-align: center;
  margin-bottom: 28px;
  color: #0c1a26;
  font-weight: 700;
  letter-spacing: 0.01em;
  background: linear-gradient(90deg, #10a37f 10%, #3b82f6 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
body.dark h1, body.dark h2, body.dark h3, body.dark h4 {
  background: linear-gradient(90deg, #10a37f 10%, #60a5fa 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* === PARAGRAPH === */
p {
  text-align: center;
  color: #4b5563;
  font-size: 1.08em;
  margin-bottom: 18px;
  line-height: 1.7;
}
body.dark p { color: #b5bfcf; }

/* === INPUTS & SELECTS === */
input[type="file"],
input[type="text"],
select {
  width: 100%;
  padding: 16px 14px;
  font-size: 17px;
  border: 1.5px solid #d1d5db;
  border-radius: 14px;
  background: rgba(249,250,251,0.96);
  margin: 14px 0;
  transition: border 0.2s, box-shadow 0.2s, background 0.3s;
  box-shadow: 0 1.5px 6px rgba(16,163,127,0.05);
  color: #1f2937;
}
input:focus, select:focus {
  border-color: #10a37f;
  outline: none;
  box-shadow: 0 0 0 4px rgba(16,163,127,0.18);
  background: #fff;
}
body.dark input, body.dark select {
  background: #23272e;
  border-color: #444;
  color: #eee;
}
body.dark input:focus, body.dark select:focus {
  background: #23272e;
  border-color: #10a37f;
  box-shadow: 0 0 0 4px rgba(16,163,127,0.25);
}

/* === BUTTONS === */
button {
  padding: 15px 28px;
  font-size: 17px;
  background: linear-gradient(90deg, #10a37f 0%, #3b82f6 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: 0 2px 10px rgba(16,163,127,0.08);
  transition: transform 0.18s, box-shadow 0.18s, background 0.22s;
  animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1);
  position: relative;
  overflow: hidden;
}
button:hover, button:focus {
  background: linear-gradient(90deg, #3b82f6 0%, #10a37f 100%);
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 18px rgba(16,163,127,0.18);
}
body.dark button {
  background: linear-gradient(90deg, #10a37f 0%, #60a5fa 100%);
}
body.dark button:hover, body.dark button:focus {
  background: linear-gradient(90deg, #60a5fa 0%, #10a37f 100%);
}

/* === ERROR MESSAGE === */
.error {
  color: #dc2626;
  background: linear-gradient(90deg, #fee2e2 60%, #fff 100%);
  border: 1.5px solid #fecaca;
  padding: 14px 18px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 22px;
  font-weight: 500;
  animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1);
}
body.dark .error {
  color: #ff8181;
  background: #2c2c2c;
  border-color: #ff8181;
}

/* === TABS === */
.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 28px;
  animation: fadeIn 1.1s cubic-bezier(.4,0,.2,1);
}
.tab-buttons button {
  background: rgba(243,244,246,0.88);
  color: #374151;
  padding: 11px 22px;
  border-radius: 12px;
  font-weight: 500;
  border: none;
  font-size: 16px;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  box-shadow: 0 1px 4px rgba(16,163,127,0.05);
}
.tab-buttons button:hover {
  background: #e0f2fe;
  color: #10a37f;
  transform: scale(1.04);
}
.tab-buttons .active {
  background: linear-gradient(90deg, #10a37f 0%, #3b82f6 100%);
  color: #fff;
  transform: scale(1.07);
  box-shadow: 0 2px 10px rgba(16,163,127,0.11);
}
body.dark .tab-buttons button {
  background: #23272e;
  color: #eee;
}
body.dark .tab-buttons .active {
  background: linear-gradient(90deg, #10a37f 0%, #60a5fa 100%);
  color: #fff;
}

/* === TAB CONTENT === */
.tab-content {
  display: none;
  opacity: 0;
  transform: translateY(16px) scale(0.98);
  transition: opacity 0.32s, transform 0.32s;
}
.tab-content.active {
  display: block;
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: floatIn 1.1s cubic-bezier(.4,0,.2,1);
}

/* === SUMMARY BLOCK === */
.summary-block {
  background: rgba(249,250,251,0.95);
  padding: 24px 20px;
  border-radius: 16px;
  border: 1.5px solid #e5e7eb;
  line-height: 1.7;
  white-space: pre-wrap;
  color: #1f2937;
  box-shadow: 0 1.5px 8px rgba(16,163,127,0.07);
  font-size: 1.09em;
  animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1);
  margin-bottom: 18px;
}
body.dark .summary-block {
  background: rgba(44, 48, 56, 0.94);
  border-color: #444;
  color: #eee;
}

/* === TABLE STYLES === */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 22px;
  font-size: 15.5px;
  background: rgba(255,255,255,0.92);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1.5px 8px rgba(16,163,127,0.06);
  animation: fadeIn 1.3s cubic-bezier(.4,0,.2,1);
}
th, td {
  border: 1.5px solid #e5e7eb;
  padding: 16px 12px;
  text-align: center;
}
th {
  background: linear-gradient(90deg, #e0f7fa 0%, #f3f4f6 100%);
  font-weight: 700;
  color: #111827;
  font-size: 1.05em;
}
body.dark table, body.dark th, body.dark td {
  background: #23272e;
  border-color: #444;
  color: #eee;
}
body.dark th {
  background: linear-gradient(90deg, #23272e 0%, #2c2c2c 100%);
}

/* === DOWNLOAD FORM === */
.download-form {
  margin-top: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1);
}

/* === LINKS === */
a {
  color: #10a37f;
  text-align: center;
  display: block;
  margin-top: 32px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.04em;
  transition: color 0.18s, text-decoration 0.18s;
  animation: fadeIn 1.3s cubic-bezier(.4,0,.2,1);
}
a:hover {
  color: #3b82f6;
  text-decoration: underline;
}
body.dark a {
  color: #10a37f;
}

/* === IMAGE STYLING === */
.image-container img {
  max-width: 100%;
  height: auto;
  margin: 12px 0;
  border-radius: 14px;
  box-shadow: 0 2px 18px rgba(16,163,127,0.12), 0 1.5px 8px rgba(0,0,0,0.08);
  transition: transform 0.22s, box-shadow 0.22s;
  animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1);
}
.image-container img:hover {
  transform: scale(1.025) rotate(-1.5deg);
  box-shadow: 0 6px 32px rgba(16,163,127,0.20);
}

/* === SCROLLBAR (MODERN) === */
::-webkit-scrollbar {
  width: 11px;
  background: #e0f7fa;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #10a37f 0%, #3b82f6 100%);
  border-radius: 8px;
}
body.dark ::-webkit-scrollbar {
  background: #23272e;
}
body.dark ::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #10a37f 0%, #60a5fa 100%);
}
`
            },


            upload: {
                title: "upload.html - File Upload",
                code: `<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Smart PDF Summarizer</title>
    <link rel=\"stylesheet\" href=\"{{ url_for('static', filename='style.css') }}\">
</head>
<body>
<div class=\"container\">
    <h1>📄 Smart PDF Summarizer</h1>
    <p>Upload any research PDF and our AI will summarize it with simple explanation, tables and charts.</p>

    {% if error %}
        <div class=\"error\">{{ error }}</div>
    {% endif %}

    <form method=\"POST\" enctype=\"multipart/form-data\">
        <label><strong>Choose PDF File:</strong></label>
        <input type=\"file\" name=\"file\" accept=\"application/pdf\">

        <label style=\"margin-top: 20px;\"><strong>Select Summary Mode:</strong></label>
        <select name=\"mode\" onchange=\"toggleKeywordInput(this.value)\">
            <option value=\"\">-- Choose Summary Mode --</option>
            <option value=\"full\">Full Summary (entire PDF)</option>
            <option value=\"page\">Page-by-Page Summary</option>
            <option value=\"group\">Grouped Summary (every 3 pages)</option>
            <option value=\"numbers\">Number Search</option>
            <option value=\"most_used\">Most Used Keyword</option>
            <option value=\"keyword\">Search & Summarize by Keyword</option>
            <option value=\"illustration\">Illustration Mode (AI-generated numbers + meaning)</option>
        </select>

        <div id=\"keywordInput\" style=\"display: none; margin-top: 10px;\">
            <input type=\"text\" name=\"keyword\" placeholder=\"Enter keyword to search\">
        </div>

        <div style=\"margin-top: 30px;\">
            <label><strong>Translate PDF (optional):</strong></label><br>
            <input type=\"checkbox\" id=\"translateToggle\" name=\"translate\" value=\"1\" onchange=\"toggleTranslationOptions()\">
            <label for=\"translateToggle\">Enable Translation</label>

            <div id=\"translationOptions\" style=\"display: none; margin-top: 10px;\">
                <label>From:</label>
                <select name=\"src_lang\">
                    <option value=\"\">Auto-detect</option>
                    <option value=\"en\">English</option>
                    <option value=\"fr\">French</option>
                    <option value=\"de\">German</option>
                    <option value=\"es\">Spanish</option>
                    <option value=\"it\">Italian</option>
                    <option value=\"ja\">Japanese</option>
                    <option value=\"ko\">Korean</option>
                    <option value=\"zh\">Chinese</option>
                </select>

                <label style=\"margin-left: 10px;\">To:</label>
                <select name=\"tgt_lang\" required>
                    <option value=\"en\">English</option>
                    <option value=\"fr\">French</option>
                    <option value=\"de\">German</option>
                    <option value=\"es\">Spanish</option>
                    <option value=\"it\">Italian</option>
                    <option value=\"ja\">Japanese</option>
                    <option value=\"ko\">Korean</option>
                    <option value=\"zh\">Chinese</option>
                </select>
            </div>
        </div>

        <button type=\"submit\">Summarize PDF</button>
        <br><br><br><br>
        <label><strong>Ask something (optional):</strong></label>
        <input type=\"text\" name=\"chat_question\" placeholder=\"Ask anything...\" style=\"width: 100%; padding: 10px; margin-top: 10px;\">
        <button type=\"submit\" name=\"ask\">Ask now</button>
        <button onclick=\"toggleDarkMode()\" style=\"position: fixed; top: 20px; right: 20px; z-index: 999;\">
            🌓 Toggle Mode
        </button>
    </form>
</div>
<script>
function toggleKeywordInput(mode) {
    const keywordBox = document.getElementById('keywordInput');
    keywordBox.style.display = (mode === 'keyword') ? 'block' : 'none';
}
function toggleTranslationOptions() {
    const translationOptions = document.getElementById('translationOptions');
    const toggle = document.getElementById('translateToggle');
    translationOptions.style.display = toggle.checked ? 'block' : 'none';
}
</script>
<script>
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}
window.onload = () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
};
</script>
</body>
</html>`
            },


            result: {
                title: "result.html - Result Display",
                code: `<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Summary Result</title>
    <link rel=\"stylesheet\" href=\"{{ url_for('static', filename='style.css') }}\">
    <script src=\"https://cdn.jsdelivr.net/npm/chart.js\"></script>
</head>
<body>
<div class=\"container\">

    {% if summary %}
        <h2>PDF Summary</h2>

        <!-- Tabs -->
        <div class=\"tab-buttons\">
            <button onclick=\"showTab('summary')\">📝 Summary</button>
            <button onclick=\"showTab('chart')\">📊 Chart</button>
        </div>

        <!-- Search -->
        <input type=\"text\" id=\"searchInput\" placeholder=\"Search in summary...\" oninput=\"searchSummary()\">

        <!-- Summary -->
        <div id=\"tab-summary\" class=\"tab-content active summary-block\">
    {{ summary | e | safe }}
</div>`
            },


            require: {
                title: "requirements.txt - Dependencies",
                code: `blinker==1.9.0
certifi==2025.1.31
charset-normalizer==3.4.1
click==8.1.8
Flask==3.1.0
idna==2.10
itsdangerous==2.2.0
Jinja2==3.1.6
MarkupSafe==3.0.2
PyMuPDF==1.25.5
requests==2.32.3
urllib3==2.3.0
Werkzeug==3.1.3
langdetect==1.0.9
pdf2image==1.17.0
pytesseract==0.3.13
fpdf==1.7.2
python-docx==1.1.2
gunicorn
openai
joblib
# Google API-related packages
google-api-python-client==2.130.0
google-auth==2.29.0
google-auth-oauthlib==1.2.0
google-auth-httplib2==0.2.0
google-generativeai==0.5.4
googletrans==4.0.0-rc1`
            },


            docker: {
                title: "Dockerfile - Containerization",
                code: `FROM python:3.11-slim

# Install system packages
RUN apt-get update && \n
    apt-get install -y \n
    tesseract-ocr \n
    poppler-utils \n
    libglib2.0-0 \n
    libgl1-mesa-glx \n
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy app files
COPY . .

# Start the app
CMD ["gunicorn", "app:app"]`
            },

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
            illus: {
                title: "Illustration Mode",
                code: `prompt = (
        "Extract number-related facts from the following text. "
        "Format each fact like this: Label in Year = Value\n\n"
        + "\n".join(lines[:50])
    )
    data = []
    try:
        model = genai.GenerativeModel(GEMMA_MODEL)
        response = model.generate_content(prompt)
        results = response.text.strip().split("\n")
        for line in results:
            if "=" in line and "in" in line:
                data.append(line.strip())
    except Exception as e:
        print("⚠️ AI error:", e)
    return data[:10]`
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
            } else if (e.key >= '1' && e.key <= '9') {
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
    
    const app = new PresentationApp();
    app.start();
    window.presentationApp = app;
}