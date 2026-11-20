/* ======================================
   SA TRAINING — APP.JS
   Navigation · Chatbot · Filters · UX
====================================== */

/* ===== PAGE NAVIGATION ===== */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('data-page') === pageId);
  });

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== MOBILE NAV TOGGLE ===== */
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

/* ===== COURSE FILTER ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.course-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ===== CONTACT FORM ===== */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('form-success').style.display = 'block';
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#12B76A';
    btn.style.borderColor = '#12B76A';
    e.target.reset();
  }, 1200);
}

/* ===== AI CHATBOT ===== */
const chatKnowledge = {
  greetings: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
  courses: {
    triggers: ['course', 'courses', 'track', 'programme', 'program', 'study', 'learn', 'enroll', 'enrol', 'join', 'training', 'what do you offer', 'available'],
    response: `We offer 9 comprehensive courses across AI/Data, Development, Cloud & Infrastructure, and Cybersecurity:<br/><br/>
🤖 <strong>AI & Machine Learning</strong> — 6 months<br/>
💻 <strong>Full-Stack Web Development</strong> — 5 months<br/>
📊 <strong>Data Science & Analytics</strong> — 4 months<br/>
☁️ <strong>Cloud Computing (AWS)</strong> — 3 months<br/>
⚙️ <strong>DevOps Engineering</strong> — 4 months<br/>
🛡️ <strong>Ethical Hacking & Cybersecurity</strong> — 4 months<br/>
📱 <strong>Mobile App Development</strong> — 4 months<br/>
🧠 <strong>Generative AI & Prompt Engineering</strong> — 2 months<br/>
🗄️ <strong>Database Design & SQL</strong> — 2 months<br/><br/>
Which area interests you most?`
  },
  aiml: {
    triggers: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'deep learning', 'neural', 'llm', 'nlp', 'pytorch', 'tensorflow'],
    response: `Our <strong>AI & Machine Learning track</strong> is our most popular course — 6 months, 48 modules, 5 real-world projects.<br/><br/>
You'll cover:<br/>
✅ Python for AI, NumPy, Pandas<br/>
✅ Supervised & Unsupervised Learning<br/>
✅ Deep Learning with TensorFlow & PyTorch<br/>
✅ Natural Language Processing & Computer Vision<br/>
✅ LLM integration & fine-tuning<br/>
✅ MLOps — deploying models in production<br/><br/>
Prerequisites: basic Python helps, but we have a primer module for beginners.<br/>
Placement rate for this track: <strong>94%</strong> within 3 months of completion.`
  },
  fullstack: {
    triggers: ['full stack', 'fullstack', 'web development', 'react', 'node', 'nodejs', 'frontend', 'backend', 'javascript'],
    response: `Our <strong>Full-Stack Web Development track</strong> is a 5-month, 42-module programme covering:<br/><br/>
✅ HTML, CSS, JavaScript (ES6+)<br/>
✅ React.js & state management<br/>
✅ Node.js & Express APIs<br/>
✅ SQL & MongoDB databases<br/>
✅ Docker & deployment on AWS<br/><br/>
You'll build 4 complete projects including a full e-commerce platform and a real-time chat application — both of which go into your portfolio.`
  },
  fees: {
    triggers: ['fee', 'fees', 'cost', 'price', 'pricing', 'charge', 'payment', 'emi', 'scholarship', 'discount'],
    response: `Course fees vary by programme and duration. As a general guide:<br/><br/>
💰 Short courses (2–3 months): ₹15,000 – ₹25,000<br/>
💰 Standard tracks (4–5 months): ₹30,000 – ₹45,000<br/>
💰 Comprehensive tracks (6 months): ₹50,000 – ₹65,000<br/><br/>
We offer:<br/>
✅ Flexible EMI options (3–12 months, 0% interest)<br/>
✅ Merit-based scholarships (up to 30% reduction)<br/>
✅ Group discounts for 3+ students<br/><br/>
For exact current pricing, please call us at <strong>+91 98400 00000</strong> or fill the contact form — fees may vary by batch.`
  },
  placement: {
    triggers: ['placement', 'job', 'hire', 'hiring', 'placed', 'salary', 'package', 'career', 'interview', 'resume'],
    response: `Placement support is built into every course at SA Training:<br/><br/>
✅ Resume review & rewriting<br/>
✅ LinkedIn profile optimisation<br/>
✅ 3 rounds of mock technical interviews<br/>
✅ Soft skills & communication sessions<br/>
✅ Direct referrals to 40+ hiring partners<br/><br/>
Our overall placement rate is <strong>92%</strong>. For the AI/ML track it's 94%. Average time-to-placement: 6–10 weeks after course completion.<br/><br/>
Hiring partners include mid-size product companies, GCCs, and IT services firms across Tamil Nadu and beyond.`
  },
  schedule: {
    triggers: ['schedule', 'timing', 'batch', 'weekend', 'weekday', 'morning', 'evening', 'online', 'offline', 'mode', 'classroom', 'duration'],
    response: `We run courses in multiple formats:<br/><br/>
📅 <strong>Weekday batches</strong>: Mon–Fri, 2 hours/day (morning or evening slots)<br/>
📅 <strong>Weekend batches</strong>: Sat–Sun, 4 hours/day<br/>
🖥️ <strong>Online mode</strong>: Live instructor-led sessions with recordings<br/>
🏢 <strong>Offline mode</strong>: At our Tamil Nadu campus<br/><br/>
New batches typically start every 4–6 weeks. Contact us to find out the next available batch for your preferred course.`
  },
  beginners: {
    triggers: ['beginner', 'no experience', 'fresher', 'fresh graduate', 'starting', 'new to', 'basics', 'foundation', 'prerequisites', 'background'],
    response: `Absolutely — many of our students start with zero IT background. Here's how we help:<br/><br/>
🎯 Courses marked "Beginner → Advanced" include foundation modules<br/>
🎯 Pre-course Python primer available for AI/ML & Data Science tracks<br/>
🎯 Dedicated support channels where you can ask trainers questions outside class<br/>
🎯 Peer study groups organised by batch<br/><br/>
<strong>Best tracks for complete beginners:</strong><br/>
• Full-Stack Web Development<br/>
• Database Design & SQL<br/>
• Generative AI & Prompt Engineering<br/><br/>
Not sure where to start? Let our counsellors guide you — just fill the contact form!`
  },
  about: {
    triggers: ['about', 'who are you', 'sa training', 'founded', 'history', 'how old', 'experience', 'trustworthy', 'reviews', 'rating'],
    response: `SA Training was founded in Tamil Nadu in 2018 by IT professionals who had spent years on hiring panels.<br/><br/>
📊 <strong>By the numbers:</strong><br/>
• 2,400+ students trained<br/>
• 92% placement rate<br/>
• 35+ active courses<br/>
• 40+ hiring partners<br/>
• 4.8★ average student rating<br/><br/>
Every trainer at SA Training is a practising professional — not just someone who once worked in the field. We update our curriculum every 6 months to keep pace with the industry.`
  },
  contact: {
    triggers: ['contact', 'reach', 'call', 'visit', 'address', 'location', 'phone', 'email', 'talk to someone', 'counselling', 'advisor'],
    response: `You can reach us through several channels:<br/><br/>
📞 <strong>Phone:</strong> +91 98400 00000<br/>
✉️ <strong>Email:</strong> info@satraining.in<br/>
📍 <strong>Location:</strong> Tamil Nadu, India<br/>
🕐 <strong>Hours:</strong> Mon–Sat, 9 AM – 7 PM<br/><br/>
Or scroll up and fill our contact form — we'll get back to you within one business day. You can also book a <strong>free 30-minute counselling session</strong> to discuss which course fits your goals.`
  },
  certifications: {
    triggers: ['certificate', 'certification', 'certified', 'credential', 'aws', 'azure', 'google cloud', 'ceh', 'comptia'],
    response: `SA Training prepares students for globally recognised certifications, including:<br/><br/>
☁️ <strong>Cloud:</strong> AWS Solutions Architect, AWS Developer, Azure Fundamentals, AZ-104<br/>
🛡️ <strong>Security:</strong> CEH (Certified Ethical Hacker), CompTIA Security+, CompTIA Network+<br/>
📊 <strong>Data:</strong> Google Data Analytics, Microsoft Power BI certification<br/>
🤖 <strong>AI:</strong> TensorFlow Developer Certificate, AWS ML Specialty<br/><br/>
Our certification prep modules are built into the relevant course tracks, with dedicated mock exam sessions in the final month.`
  },
  default: [
    `Thanks for asking! For a detailed answer, our counsellors can help. Would you like to:\n\n• Explore our courses — just ask "What courses do you offer?"\n• Know about fees — ask "What are the fees?"\n• Understand placement support — ask "Tell me about placement"\n\nOr fill the contact form and we'll reach out within one business day! 😊`,
    `Great question! I can help with information about our courses, fees, schedules, placement support, and more. Could you give me a bit more detail about what you're looking for?`,
    `I want to make sure I give you the most accurate answer. For this specific query, I'd recommend speaking directly with our team at +91 98400 00000 (Mon–Sat, 9 AM – 7 PM) or filling the contact form above. Is there anything else I can help with?`
  ]
};

let defaultIndex = 0;

function getBotResponse(message) {
  const lower = message.toLowerCase();

  if (chatKnowledge.greetings.some(g => lower.includes(g))) {
    return `Hi there! 👋 Great to hear from you! I'm SAAI, your SA Training course advisor.<br/><br/>How can I help you today? You can ask me about our courses, fees, batch schedules, placement support, or anything else about SA Training!`;
  }

  const categories = ['courses', 'aiml', 'fullstack', 'fees', 'placement', 'schedule', 'beginners', 'about', 'contact', 'certifications'];
  for (const cat of categories) {
    if (chatKnowledge[cat].triggers.some(t => lower.includes(t))) {
      return chatKnowledge[cat].response;
    }
  }

  const def = chatKnowledge.default[defaultIndex % chatKnowledge.default.length];
  defaultIndex++;
  return def;
}

function appendMessage(text, sender) {
  const messages = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  msg.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${time}</div>`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot chat-typing';
  typing.id = 'typingIndicator';
  typing.innerHTML = `<div class="chat-bubble">
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  </div>`;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  // Remove quick replies after first user message
  const qr = document.getElementById('quickReplies');
  if (qr) qr.remove();

  appendMessage(text, 'user');
  input.value = '';

  showTyping();
  const delay = 800 + Math.random() * 600;
  setTimeout(() => {
    removeTyping();
    appendMessage(getBotResponse(text), 'bot');
  }, delay);
}

function sendQuickReply(text) {
  const qr = document.getElementById('quickReplies');
  if (qr) qr.remove();

  appendMessage(text, 'user');
  showTyping();
  setTimeout(() => {
    removeTyping();
    appendMessage(getBotResponse(text), 'bot');
  }, 900);
}

function handleChatKey(e) {
  if (e.key === 'Enter') sendChatMessage();
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});
