export const questionBank = {
  javascript: [
    { id: '1', type: 'multiple-choice', question: 'What is the output of typeof null?', options: ['null', 'undefined', 'object', 'boolean'], correctAnswer: 2, explanation: 'typeof null returns "object" due to a historical bug.', difficulty: 'medium', points: 10 },
    { id: '2', type: 'multiple-choice', question: 'Which method adds elements to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctAnswer: 0, explanation: 'push() adds elements to the end of an array.', difficulty: 'easy', points: 5 },
    { id: '3', type: 'true-false', question: 'JavaScript is case-sensitive', correctAnswer: true, explanation: 'JavaScript is case-sensitive, myVar and MyVar are different.', difficulty: 'easy', points: 5 },
    { id: '4', type: 'multiple-choice', question: 'What does === operator do?', options: ['Assignment', 'Equality without type conversion', 'Equality with type conversion', 'Not equal'], correctAnswer: 1, explanation: '=== checks for strict equality without type conversion.', difficulty: 'medium', points: 10 },
    { id: '5', type: 'multiple-choice', question: 'Which is NOT a JavaScript data type?', options: ['undefined', 'boolean', 'float', 'string'], correctAnswer: 2, explanation: 'JavaScript uses "number" type, not "float".', difficulty: 'medium', points: 10 }
  ],
  marketing: [
    { id: '1', type: 'multiple-choice', question: 'What does CTR stand for?', options: ['Cost To Revenue', 'Click Through Rate', 'Customer Target Reach', 'Content Traffic Ratio'], correctAnswer: 1, explanation: 'CTR measures the percentage of clicks on a link.', difficulty: 'easy', points: 10 },
    { id: '2', type: 'multiple-choice', question: 'What is SEO?', options: ['Social Engine Optimization', 'Search Engine Optimization', 'Site Enhancement Operations', 'System Error Operations'], correctAnswer: 1, explanation: 'SEO improves website visibility in search engines.', difficulty: 'easy', points: 5 },
    { id: '3', type: 'true-false', question: 'Email marketing has the highest ROI among digital channels', correctAnswer: true, explanation: 'Email marketing typically delivers $42 for every $1 spent.', difficulty: 'medium', points: 10 },
    { id: '4', type: 'multiple-choice', question: 'What does CPC stand for?', options: ['Cost Per Click', 'Customer Per Campaign', 'Content Per Channel', 'Conversion Per Customer'], correctAnswer: 0, explanation: 'CPC is the amount paid for each click in advertising.', difficulty: 'easy', points: 5 },
    { id: '5', type: 'multiple-choice', question: 'Which platform is best for B2B marketing?', options: ['Instagram', 'TikTok', 'LinkedIn', 'Snapchat'], correctAnswer: 2, explanation: 'LinkedIn is the primary professional networking platform.', difficulty: 'medium', points: 10 }
  ],
  design: [
    { id: '1', type: 'multiple-choice', question: 'What does UX stand for?', options: ['User Experience', 'User Extension', 'Universal Experience', 'Unified Extension'], correctAnswer: 0, explanation: 'UX focuses on user experience and interaction design.', difficulty: 'easy', points: 5 },
    { id: '2', type: 'multiple-choice', question: 'Which color model is used for print?', options: ['RGB', 'CMYK', 'HSB', 'LAB'], correctAnswer: 1, explanation: 'CMYK is the standard for print design.', difficulty: 'easy', points: 5 },
    { id: '3', type: 'true-false', question: 'White space improves readability', correctAnswer: true, explanation: 'White space helps organize content and improves user focus.', difficulty: 'easy', points: 5 },
    { id: '4', type: 'multiple-choice', question: 'What is the golden ratio?', options: ['1.414', '1.618', '1.732', '2.000'], correctAnswer: 1, explanation: 'The golden ratio (φ) is approximately 1.618.', difficulty: 'medium', points: 10 },
    { id: '5', type: 'multiple-choice', question: 'Which font is best for body text?', options: ['Comic Sans', 'Times New Roman', 'Impact', 'Brush Script'], correctAnswer: 1, explanation: 'Serif fonts like Times New Roman are readable for body text.', difficulty: 'easy', points: 5 }
  ],
  finance: [
    { id: '1', type: 'multiple-choice', question: 'What does ROI stand for?', options: ['Return on Investment', 'Rate of Interest', 'Revenue over Income', 'Risk of Investment'], correctAnswer: 0, explanation: 'ROI measures investment efficiency.', difficulty: 'easy', points: 5 },
    { id: '2', type: 'multiple-choice', question: 'What is compound interest?', options: ['Simple interest', 'Interest on interest', 'Fixed interest', 'Variable interest'], correctAnswer: 1, explanation: 'Compound interest earns interest on both principal and accumulated interest.', difficulty: 'medium', points: 10 },
    { id: '3', type: 'true-false', question: 'Assets = Liabilities + Equity', correctAnswer: true, explanation: 'This is the fundamental accounting equation.', difficulty: 'medium', points: 10 },
    { id: '4', type: 'multiple-choice', question: 'What is EBITDA?', options: ['Earnings Before Interest, Taxes, Depreciation, Amortization', 'Economic Business Income Tax Deduction Analysis', 'Estimated Business Investment Tax Deduction Amount', 'Enterprise Business Income Total Debt Analysis'], correctAnswer: 0, explanation: 'EBITDA measures company profitability.', difficulty: 'hard', points: 15 },
    { id: '5', type: 'multiple-choice', question: 'What is a bull market?', options: ['Declining prices', 'Rising prices', 'Stable prices', 'Volatile prices'], correctAnswer: 1, explanation: 'Bull market refers to rising stock prices.', difficulty: 'easy', points: 5 }
  ],
  healthcare: [
    { id: '1', type: 'multiple-choice', question: 'What does CPR stand for?', options: ['Cardiopulmonary Resuscitation', 'Cardiac Pressure Relief', 'Circulatory Pulse Recovery', 'Chest Pressure Restoration'], correctAnswer: 0, explanation: 'CPR is a life-saving technique for cardiac emergencies.', difficulty: 'easy', points: 10 },
    { id: '2', type: 'multiple-choice', question: 'Normal human body temperature is?', options: ['96.8°F', '98.6°F', '100.4°F', '102.2°F'], correctAnswer: 1, explanation: 'Normal body temperature is 98.6°F or 37°C.', difficulty: 'easy', points: 5 },
    { id: '3', type: 'true-false', question: 'Antibiotics are effective against viral infections', correctAnswer: false, explanation: 'Antibiotics only work against bacterial infections, not viruses.', difficulty: 'medium', points: 10 },
    { id: '4', type: 'multiple-choice', question: 'Which organ produces insulin?', options: ['Liver', 'Kidney', 'Pancreas', 'Spleen'], correctAnswer: 2, explanation: 'The pancreas produces insulin to regulate blood sugar.', difficulty: 'medium', points: 10 },
    { id: '5', type: 'multiple-choice', question: 'What is the largest organ in the human body?', options: ['Brain', 'Liver', 'Lungs', 'Skin'], correctAnswer: 3, explanation: 'The skin is the largest organ by surface area and weight.', difficulty: 'easy', points: 5 }
  ],
  education: [
    { id: '1', type: 'multiple-choice', question: 'What does IEP stand for in education?', options: ['Individual Education Plan', 'Integrated Educational Program', 'Interactive Education Process', 'Inclusive Educational Practice'], correctAnswer: 0, explanation: 'IEP is a plan for students with special educational needs.', difficulty: 'medium', points: 10 },
    { id: '2', type: 'true-false', question: 'Bloom\'s Taxonomy has 6 levels of learning', correctAnswer: true, explanation: 'Bloom\'s Taxonomy includes Remember, Understand, Apply, Analyze, Evaluate, Create.', difficulty: 'medium', points: 10 },
    { id: '3', type: 'multiple-choice', question: 'Which learning theory emphasizes reinforcement?', options: ['Constructivism', 'Behaviorism', 'Cognitivism', 'Humanism'], correctAnswer: 1, explanation: 'Behaviorism focuses on reinforcement and conditioning.', difficulty: 'medium', points: 10 },
    { id: '4', type: 'multiple-choice', question: 'What does ESL stand for?', options: ['English as Second Language', 'Educational Support Learning', 'Extended Study Learning', 'Elementary School Learning'], correctAnswer: 0, explanation: 'ESL refers to English as a Second Language instruction.', difficulty: 'easy', points: 5 },
    { id: '5', type: 'true-false', question: 'Formative assessment occurs during the learning process', correctAnswer: true, explanation: 'Formative assessment provides ongoing feedback during learning.', difficulty: 'easy', points: 5 }
  ],
  law: [
    { id: '1', type: 'multiple-choice', question: 'What does "pro bono" mean?', options: ['For the public good', 'Professional bonus', 'Prior to business', 'Proven beneficial'], correctAnswer: 0, explanation: 'Pro bono means providing services for free for the public good.', difficulty: 'medium', points: 10 },
    { id: '2', type: 'multiple-choice', question: 'Which amendment protects freedom of speech?', options: ['First Amendment', 'Second Amendment', 'Fourth Amendment', 'Fifth Amendment'], correctAnswer: 0, explanation: 'The First Amendment protects freedom of speech, religion, and press.', difficulty: 'easy', points: 5 },
    { id: '3', type: 'true-false', question: 'A contract requires consideration to be valid', correctAnswer: true, explanation: 'Consideration (exchange of value) is essential for contract validity.', difficulty: 'medium', points: 10 },
    { id: '4', type: 'multiple-choice', question: 'What is a tort?', options: ['A type of cake', 'A civil wrong', 'A criminal offense', 'A legal document'], correctAnswer: 1, explanation: 'A tort is a civil wrong that causes harm to another person.', difficulty: 'medium', points: 10 },
    { id: '5', type: 'multiple-choice', question: 'What does "habeas corpus" mean?', options: ['Have the body', 'Hold the court', 'Honor the case', 'Hear the complaint'], correctAnswer: 0, explanation: 'Habeas corpus means "have the body" - protection against unlawful detention.', difficulty: 'hard', points: 15 }
  ],
  science: [
    { id: '1', type: 'multiple-choice', question: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correctAnswer: 2, explanation: 'Au comes from the Latin word "aurum" meaning gold.', difficulty: 'easy', points: 5 },
    { id: '2', type: 'multiple-choice', question: 'How many bones are in an adult human body?', options: ['206', '208', '210', '212'], correctAnswer: 0, explanation: 'An adult human has 206 bones.', difficulty: 'medium', points: 10 },
    { id: '3', type: 'true-false', question: 'Light travels faster than sound', correctAnswer: true, explanation: 'Light travels at 299,792,458 m/s, much faster than sound at 343 m/s.', difficulty: 'easy', points: 5 },
    { id: '4', type: 'multiple-choice', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'], correctAnswer: 1, explanation: 'Mitochondria produce ATP, the cell\'s energy currency.', difficulty: 'easy', points: 5 },
    { id: '5', type: 'multiple-choice', question: 'What is the pH of pure water?', options: ['6', '7', '8', '9'], correctAnswer: 1, explanation: 'Pure water has a neutral pH of 7.', difficulty: 'medium', points: 10 }
  ],
  engineering: [
    { id: '1', type: 'multiple-choice', question: 'What does CAD stand for?', options: ['Computer Aided Design', 'Computer Automated Drawing', 'Creative Art Design', 'Calculated Architectural Drafting'], correctAnswer: 0, explanation: 'CAD is Computer Aided Design software for technical drawings.', difficulty: 'easy', points: 5 },
    { id: '2', type: 'multiple-choice', question: 'Which material has the highest tensile strength?', options: ['Steel', 'Aluminum', 'Carbon fiber', 'Titanium'], correctAnswer: 2, explanation: 'Carbon fiber has exceptional tensile strength-to-weight ratio.', difficulty: 'medium', points: 10 },
    { id: '3', type: 'true-false', question: 'Ohm\'s Law states V = I × R', correctAnswer: true, explanation: 'Voltage equals Current times Resistance.', difficulty: 'easy', points: 5 },
    { id: '4', type: 'multiple-choice', question: 'What is the SI unit of force?', options: ['Joule', 'Newton', 'Pascal', 'Watt'], correctAnswer: 1, explanation: 'Newton is the SI unit of force (kg⋅m/s²).', difficulty: 'medium', points: 10 },
    { id: '5', type: 'multiple-choice', question: 'Which engineering principle describes fluid flow?', options: ['Hooke\'s Law', 'Bernoulli\'s Principle', 'Archimedes\' Principle', 'Pascal\'s Law'], correctAnswer: 1, explanation: 'Bernoulli\'s Principle relates fluid speed and pressure.', difficulty: 'medium', points: 10 }
  ]
}

export function generateQuestions(category, count = 500) {
  const baseQuestions = questionBank[category] || questionBank.javascript
  const questions = []
  
  for (let i = 0; i < count; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length]
    questions.push({
      ...baseQuestion,
      id: `${category}_${i + 1}`
    })
  }
  
  return questions
}

export function getRandomQuestions(category, count = 20) {
  const allQuestions = generateQuestions(category, 500)
  const shuffled = allQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}