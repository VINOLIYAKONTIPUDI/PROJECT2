// EV Quiz Logic - quiz.js

// Quiz data and state management
const quizData = {
    questions: [
        {
            id: 1,
            question: "What is your primary use for this electric vehicle?",
            type: "single",
            options: [
                { value: "daily-commute", text: "Daily commuting to work", icon: "🚗" },
                { value: "family-trips", text: "Family trips and errands", icon: "👨‍👩‍👧‍👦" },
                { value: "long-distance", text: "Long-distance travel", icon: "🛣️" },
                { value: "city-driving", text: "City driving and short trips", icon: "🏙️" },
                { value: "weekend-recreation", text: "Weekend recreation and leisure", icon: "🎯" }
            ]
        },
        {
            id: 2,
            question: "What is your preferred vehicle size?",
            type: "single",
            options: [
                { value: "compact", text: "Compact car (easy parking, efficiency)", icon: "🚙" },
                { value: "sedan", text: "Sedan (comfort and style)", icon: "🚗" },
                { value: "suv", text: "SUV (space and versatility)", icon: "🚐" },
                { value: "truck", text: "Pickup truck (utility and hauling)", icon: "🛻" },
                { value: "luxury", text: "Luxury vehicle (premium features)", icon: "✨" }
            ]
        },
        {
            id: 3,
            question: "What is your budget range for purchasing an EV?",
            type: "single",
            options: [
                { value: "under-30k", text: "Under $30,000", icon: "💰" },
                { value: "30k-50k", text: "$30,000 - $50,000", icon: "💳" },
                { value: "50k-70k", text: "$50,000 - $70,000", icon: "💎" },
                { value: "70k-100k", text: "$70,000 - $100,000", icon: "🏆" },
                { value: "over-100k", text: "Over $100,000", icon: "👑" }
            ]
        },
        {
            id: 4,
            question: "How important is driving range to you?",
            type: "range",
            min: 1,
            max: 10,
            step: 1,
            defaultValue: 5,
            labels: ["Not important", "Extremely important"],
            question_detail: "Rate the importance of having a long driving range on a single charge"
        },
        {
            id: 5,
            question: "What is your typical daily driving distance?",
            type: "single",
            options: [
                { value: "under-25", text: "Under 25 miles", icon: "🏠" },
                { value: "25-50", text: "25-50 miles", icon: "🚗" },
                { value: "50-100", text: "50-100 miles", icon: "🛣️" },
                { value: "100-200", text: "100-200 miles", icon: "🌍" },
                { value: "over-200", text: "Over 200 miles", icon: "✈️" }
            ]
        },
        {
            id: 6,
            question: "Which charging features are most important to you?",
            type: "multiple",
            options: [
                { value: "fast-charging", text: "Fast charging capability", icon: "⚡" },
                { value: "home-charging", text: "Home charging compatibility", icon: "🏠" },
                { value: "public-network", text: "Access to public charging networks", icon: "🔌" },
                { value: "wireless-charging", text: "Wireless charging capability", icon: "📡" },
                { value: "solar-integration", text: "Solar panel integration", icon: "☀️" }
            ]
        },
        {
            id: 7,
            question: "What eco-friendly features matter most to you?",
            type: "multiple",
            options: [
                { value: "zero-emissions", text: "Zero direct emissions", icon: "🌱" },
                { value: "renewable-energy", text: "Renewable energy sourcing", icon: "🌞" },
                { value: "sustainable-materials", text: "Sustainable interior materials", icon: "🌿" },
                { value: "recycling-program", text: "Battery recycling programs", icon: "♻️" },
                { value: "carbon-neutral", text: "Carbon-neutral manufacturing", icon: "🌍" }
            ]
        },
        {
            id: 8,
            question: "How important are advanced technology features?",
            type: "range",
            min: 1,
            max: 10,
            step: 1,
            defaultValue: 5,
            labels: ["Basic features only", "Latest tech essential"],
            question_detail: "Rate the importance of having cutting-edge technology and smart features"
        }
    ],
    
    // Sample EV database for recommendations
    evDatabase: [
        {
            id: 1,
            name: "Tesla Model 3",
            brand: "Tesla",
            type: "sedan",
            price: 38990,
            range: 358,
            charging: "fast-charging",
            features: ["autopilot", "supercharging", "over-the-air-updates"],
            eco_score: 95,
            tech_score: 98,
            image: "tesla-model-3.jpg"
        },
        {
            id: 2,
            name: "Nissan Leaf",
            brand: "Nissan",
            type: "compact",
            price: 27400,
            range: 149,
            charging: "standard",
            features: ["e-pedal", "propilot", "nissan-connect"],
            eco_score: 92,
            tech_score: 75,
            image: "nissan-leaf.jpg"
        },
        {
            id: 3,
            name: "Ford Mustang Mach-E",
            brand: "Ford",
            type: "suv",
            price: 42895,
            range: 314,
            charging: "fast-charging",
            features: ["sync4", "hands-free-driving", "wireless-charging"],
            eco_score: 88,
            tech_score: 85,
            image: "ford-mach-e.jpg"
        },
        {
            id: 4,
            name: "Chevrolet Bolt EV",
            brand: "Chevrolet",
            type: "compact",
            price: 25600,
            range: 259,
            charging: "standard",
            features: ["regen-on-demand", "mylink", "teen-driver"],
            eco_score: 90,
            tech_score: 70,
            image: "chevy-bolt.jpg"
        },
        {
            id: 5,
            name: "BMW iX",
            brand: "BMW",
            type: "luxury",
            price: 83200,
            range: 324,
            charging: "fast-charging",
            features: ["idrive8", "gesture-control", "air-suspension"],
            eco_score: 85,
            tech_score: 95,
            image: "bmw-ix.jpg"
        },
        {
            id: 6,
            name: "Rivian R1T",
            brand: "Rivian",
            type: "truck",
            price: 67500,
            range: 400,
            charging: "fast-charging",
            features: ["tank-turn", "air-suspension", "towing-package"],
            eco_score: 87,
            tech_score: 88,
            image: "rivian-r1t.jpg"
        },
        {
            id: 7,
            name: "Hyundai Ioniq 5",
            brand: "Hyundai",
            type: "suv",
            price: 43650,
            range: 303,
            charging: "ultra-fast-charging",
            features: ["v2l", "digital-key", "augmented-reality"],
            eco_score: 91,
            tech_score: 92,
            image: "hyundai-ioniq5.jpg"
        },
        {
            id: 8,
            name: "Lucid Air Dream",
            brand: "Lucid Motors",
            type: "luxury",
            price: 139000,
            range: 516,
            charging: "ultra-fast-charging",
            features: ["dreamdrive", "glass-roof", "massage-seats"],
            eco_score: 93,
            tech_score: 97,
            image: "lucid-air.jpg"
        }
    ]
};

// Quiz state management
let currentQuestion = 0;
let userAnswers = {};
let quizStartTime = Date.now();

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

// Initialize the quiz
function initializeQuiz() {
    currentQuestion = 0;
    userAnswers = {};
    quizStartTime = Date.now();
    updateProgress();
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = quizData.questions[currentQuestion];
    const quizContent = document.getElementById('quizContent');
    
    // Add loading animation
    quizContent.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    // Simulate loading delay for smooth transition
    setTimeout(() => {
        let questionHTML = `
            <div class="question fade-in">
                <h2>${question.question}</h2>
        `;
        
        if (question.question_detail) {
            questionHTML += `<p class="question-detail">${question.question_detail}</p>`;
        }
        
        if (question.type === 'single') {
            questionHTML += '<div class="question-options">';
            question.options.forEach((option, index) => {
                const isSelected = userAnswers[question.id] === option.value;
                questionHTML += `
                    <div class="option ${isSelected ? 'selected' : ''}" 
                         onclick="selectSingleOption(${question.id}, '${option.value}', this)"
                         data-value="${option.value}">
                        <div class="option-text">
                            <span class="option-icon">${option.icon}</span>
                            ${option.text}
                        </div>
                    </div>
                `;
            });
            questionHTML += '</div>';
            
        } else if (question.type === 'multiple') {
            questionHTML += '<div class="question-options">';
            question.options.forEach((option, index) => {
                const isSelected = userAnswers[question.id] && userAnswers[question.id].includes(option.value);
                questionHTML += `
                    <div class="option ${isSelected ? 'selected' : ''}" 
                         onclick="selectMultipleOption(${question.id}, '${option.value}', this)"
                         data-value="${option.value}">
                        <div class="option-text">
                            <span class="option-icon">${option.icon}</span>
                            ${option.text}
                        </div>
                    </div>
                `;
            });
            questionHTML += '</div>';
            
        } else if (question.type === 'range') {
            const currentValue = userAnswers[question.id] || question.defaultValue;
            questionHTML += `
                <div class="range-container">
                    <input type="range" 
                           class="range-input" 
                           min="${question.min}" 
                           max="${question.max}" 
                           step="${question.step}" 
                           value="${currentValue}"
                           oninput="updateRangeValue(${question.id}, this.value)"
                           onchange="selectRangeOption(${question.id}, this.value)">
                    <div class="range-labels">
                        <span>${question.labels[0]}</span>
                        <span>${question.labels[1]}</span>
                    </div>
                    <div class="range-value">
                        <span id="rangeValue${question.id}">${currentValue}/10</span>
                    </div>
                </div>
            `;
        }
        
        questionHTML += '</div>';
        
        quizContent.innerHTML = questionHTML;
        
        // Add fade-in animation
        setTimeout(() => {
            const questionElement = quizContent.querySelector('.question');
            if (questionElement) {
                questionElement.classList.add('visible');
            }
        }, 100);
        
    }, 300);
    
    updateNavigationButtons();
}

// Handle single option selection
function selectSingleOption(questionId, value, element) {
    // Remove selection from all options
    const allOptions = element.parentElement.querySelectorAll('.option');
    allOptions.forEach(option => option.classList.remove('selected'));
    
    // Add selection to clicked option
    element.classList.add('selected');
    
    // Store answer
    userAnswers[questionId] = value;
    
    // Add ripple effect
    addRippleEffect(element);
    
    // Auto-advance after a short delay for better UX
    setTimeout(() => {
        if (currentQuestion < quizData.questions.length - 1) {
            nextQuestion();
        }
    }, 500);
}

// Handle multiple option selection
function selectMultipleOption(questionId, value, element) {
    // Initialize array if it doesn't exist
    if (!userAnswers[questionId]) {
        userAnswers[questionId] = [];
    }
    
    // Toggle selection
    if (userAnswers[questionId].includes(value)) {
        // Remove from selection
        userAnswers[questionId] = userAnswers[questionId].filter(item => item !== value);
        element.classList.remove('selected');
    } else {
        // Add to selection
        userAnswers[questionId].push(value);
        element.classList.add('selected');
    }
    
    // Add ripple effect
    addRippleEffect(element);
}

// Handle range input selection
function selectRangeOption(questionId, value) {
    userAnswers[questionId] = parseInt(value);
}

// Update range value display
function updateRangeValue(questionId, value) {
    const rangeValueElement = document.getElementById(`rangeValue${questionId}`);
    if (rangeValueElement) {
        rangeValueElement.textContent = `${value}/10`;
    }
}

// Add ripple effect to clicked elements
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        updateProgress();
        displayQuestion();
    } else {
        finishQuiz();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateProgress();
        displayQuestion();
    }
}

// Update progress bar and navigation
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.questions.length}`;
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.style.display = currentQuestion > 0 ? 'inline-flex' : 'none';
    }
    
    if (nextBtn) {
        if (currentQuestion === quizData.questions.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Finish Quiz';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }
}

// Finish quiz and show results
function finishQuiz() {
    const quizTime = Date.now() - quizStartTime;
    const recommendations = calculateRecommendations(userAnswers);
    
    showResults(recommendations, quizTime);
}

// Calculate EV recommendations based on user answers
function calculateRecommendations(answers) {
    const recommendations = [];
    
    // Get user preferences
    const budget = getBudgetRange(answers[3]);
    const vehicleType = answers[2];
    const dailyDistance = answers[5];
    const rangeImportance = answers[4] || 5;
    const techImportance = answers[8] || 5;
    
    // Filter and score EVs
    quizData.evDatabase.forEach(ev => {
        let score = 0;
        let matchReasons = [];
        
        // Budget matching (high weight)
        if (ev.price >= budget.min && ev.price <= budget.max) {
            score += 30;
            matchReasons.push('Within budget');
        } else if (ev.price < budget.min) {
            score += 20;
            matchReasons.push('Great value');
        }
        
        // Vehicle type matching
        if (ev.type === vehicleType) {
            score += 25;
            matchReasons.push('Perfect size match');
        }
        
        // Range importance
        const rangeScore = Math.min((ev.range / 300) * rangeImportance * 2, 20);
        score += rangeScore;
        if (ev.range > 300) {
            matchReasons.push('Excellent range');
        }
        
        // Technology importance
        const techScore = (ev.tech_score / 100) * techImportance * 2;
        score += techScore;
        if (ev.tech_score > 90) {
            matchReasons.push('Advanced technology');
        }
        
        // Eco-friendliness bonus
        score += (ev.eco_score / 100) * 10;
        if (ev.eco_score > 90) {
            matchReasons.push('Eco-friendly');
        }
        
        // Charging features matching
        if (answers[6] && answers[6].includes('fast-charging') && ev.charging === 'fast-charging') {
            score += 10;
            matchReasons.push('Fast charging');
        }
        
        recommendations.push({
            ...ev,
            score: Math.round(score),
            matchReasons: matchReasons
        });
    });
    
    // Sort by score and return top 3
    return recommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}

// Get budget range from user answer
function getBudgetRange(budgetAnswer) {
    const budgetRanges = {
        'under-30k': { min: 0, max: 30000 },
        '30k-50k': { min: 30000, max: 50000 },
        '50k-70k': { min: 50000, max: 70000 },
        '70k-100k': { min: 70000, max: 100000 },
        'over-100k': { min: 100000, max: 1000000 }
    };
    
    return budgetRanges[budgetAnswer] || { min: 0, max: 1000000 };
}

// Show results modal
function showResults(recommendations, quizTime) {
    const modal = document.getElementById('resultsModal');
    const resultsSummary = document.getElementById('resultsSummary');
    const recommendedEVs = document.getElementById('recommendedEVs');
    
    // Generate results summary
    const summaryHTML = `
        <h4>🎉 Your Perfect EV Matches</h4>
        <p>Based on your preferences, we've found ${recommendations.length} excellent electric vehicles for you!</p>
        <div class="user-preferences">
            <div class="preference-item">
                <strong>Primary Use:</strong> ${getAnswerText(1, userAnswers[1])}
            </div>
            <div class="preference-item">
                <strong>Vehicle Type:</strong> ${getAnswerText(2, userAnswers[2])}
            </div>
            <div class="preference-item">
                <strong>Budget Range:</strong> ${getAnswerText(3, userAnswers[3])}
            </div>
            <div class="preference-item">
                <strong>Daily Distance:</strong> ${getAnswerText(5, userAnswers[5])}
            </div>
            <div class="preference-item">
                <strong>Range Importance:</strong> ${userAnswers[4] || 5}/10
            </div>
            <div class="preference-item">
                <strong>Tech Importance:</strong> ${userAnswers[8] || 5}/10
            </div>
        </div>
        <div class="quiz-completion-time">
            <small>Quiz completed in ${Math.round(quizTime / 1000)} seconds</small>
        </div>
    `;
    
    resultsSummary.innerHTML = summaryHTML;
    
    // Generate recommended EVs
    let evsHTML = '';
    recommendations.forEach((ev, index) => {
        const matchPercentage = Math.min(ev.score, 100);
        evsHTML += `
            <div class="ev-card" style="animation-delay: ${index * 0.1}s">
                <div class="ev-header">
                    <div>
                        <div class="ev-title">${ev.name}</div>
                        <div class="ev-brand">${ev.brand}</div>
                    </div>
                    <div class="ev-match">${matchPercentage}% Match</div>
                </div>
                <div class="ev-specs">
                    <div class="spec-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${ev.price.toLocaleString()}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-battery-three-quarters"></i>
                        <span>${ev.range} miles range</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-bolt"></i>
                        <span>${ev.charging.replace('-', ' ')}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-leaf"></i>
                        <span>${ev.eco_score}% eco-score</span>
                    </div>
                </div>
                <div class="match-reasons">
                    <strong>Why this matches:</strong>
                    <ul>
                        ${ev.matchReasons.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                </div>
                <div class="ev-actions">
                    <button class="btn-primary" onclick="learnMore('${ev.id}')">
                        <i class="fas fa-info-circle"></i>
                        Learn More
                    </button>
                    <button class="btn-secondary" onclick="compareEV('${ev.id}')">
                        <i class="fas fa-balance-scale"></i>
                        Compare
                    </button>
                </div>
            </div>
        `;
    });
    
    recommendedEVs.innerHTML = evsHTML;
    
    // Show modal with animation
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

// Get answer text for display
function getAnswerText(questionId, answer) {
    const question = quizData.questions[questionId - 1];
    if (!question) return 'N/A';
    
    if (question.type === 'single') {
        const option = question.options.find(opt => opt.value === answer);
        return option ? option.text : 'N/A';
    } else if (question.type === 'multiple') {
        if (Array.isArray(answer)) {
            return answer.map(val => {
                const option = question.options.find(opt => opt.value === val);
                return option ? option.text : val;
            }).join(', ');
        }
        return 'N/A';
    } else if (question.type === 'range') {
        return `${answer}/10`;
    }
    
    return 'N/A';
}

// Close results modal
function closeResultsModal() {
    const modal = document.getElementById('resultsModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Save results (placeholder function)
function saveResults() {
    // In a real application, this would save to a database or localStorage
    const results = {
        answers: userAnswers,
        timestamp: new Date().toISOString(),
        completionTime: Date.now() - quizStartTime
    };
    
    // Show success message
    showNotification('Results saved successfully! 🎉', 'success');
    
    // Close modal
    closeResultsModal();
}

// Retake quiz
function retakeQuiz() {
    closeResultsModal();
    initializeQuiz();
}

// Learn more about an EV (placeholder function)
function learnMore(evId) {
    // In a real application, this would navigate to the EV detail page
    showNotification('Redirecting to EV details...', 'info');
}

// Compare EV (placeholder function)
function compareEV(evId) {
    // In a real application, this would add to comparison
    showNotification('Added to comparison list! 📊', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        previousQuestion();
    } else if (e.key === 'ArrowRight' && currentQuestion < quizData.questions.length - 1) {
        nextQuestion();
    } else if (e.key === 'Enter' && currentQuestion === quizData.questions.length - 1) {
        finishQuiz();
    }
});

// Add CSS for animations and notifications
const additionalStyles = `
    <style>
        .question {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .question.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .ev-card {
            animation: slideInUp 0.5s ease-out forwards;
            opacity: 0;
            transform: translateY(30px);
        }
        
        @keyframes slideInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--white);
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--radius-md);
            box-shadow: 0 4px 20px var(--shadow-medium);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left: 4px solid var(--leaf-green);
        }
        
        .notification.error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification.info {
            border-left: 4px solid var(--accent-green);
        }
        
        .notification i {
            color: var(--accent-green);
        }
        
        .notification.success i {
            color: var(--leaf-green);
        }
        
        .notification.error i {
            color: #e74c3c;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            background-color: rgba(255, 255, 255, 0.3);
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .match-reasons {
            margin-top: var(--spacing-md);
            padding: var(--spacing-md);
            background: var(--nature-bg);
            border-radius: var(--radius-sm);
        }
        
        .match-reasons ul {
            list-style: none;
            margin-top: var(--spacing-xs);
        }
        
        .match-reasons li {
            padding: var(--spacing-xs) 0;
            position: relative;
            padding-left: var(--spacing-md);
        }
        
        .match-reasons li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--leaf-green);
            font-weight: bold;
        }
        
        .ev-actions {
            display: flex;
            gap: var(--spacing-sm);
            margin-top: var(--spacing-md);
        }
        
        .quiz-completion-time {
            text-align: center;
            margin-top: var(--spacing-md);
            opacity: 0.7;
        }
        
        .question-detail {
            color: var(--text-light);
            font-size: 0.95rem;
            margin-bottom: var(--spacing-lg);
            font-style: italic;
        }
        
        .option-icon {
            font-size: 1.2rem;
            margin-right: var(--spacing-sm);
        }
    </style>
`;

// Add additional styles to head
document.head.insertAdjacentHTML('beforeend', additionalStyles);