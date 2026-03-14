/**
 * Wine Quality Prediction - Main JavaScript
 * Handles navigation, dataset loading, CSV upload, and ML predictions
 */

// ===================================
// Navigation & Smooth Scrolling
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initDatasetHandlers();
    initPredictionForm();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                navMenu.classList.remove('active');

                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// Sample Wine Dataset
// ===================================

const sampleWineData = [
    {
        fixedAcidity: 7.4,
        volatileAcidity: 0.70,
        citricAcid: 0.00,
        residualSugar: 1.9,
        chlorides: 0.076,
        freeSulfurDioxide: 11,
        totalSulfurDioxide: 34,
        density: 0.9978,
        pH: 3.51,
        sulphates: 0.56,
        alcohol: 9.4,
        quality: 5
    },
    {
        fixedAcidity: 7.8,
        volatileAcidity: 0.88,
        citricAcid: 0.00,
        residualSugar: 2.6,
        chlorides: 0.098,
        freeSulfurDioxide: 25,
        totalSulfurDioxide: 67,
        density: 0.9968,
        pH: 3.20,
        sulphates: 0.68,
        alcohol: 9.8,
        quality: 5
    },
    {
        fixedAcidity: 7.8,
        volatileAcidity: 0.76,
        citricAcid: 0.04,
        residualSugar: 2.3,
        chlorides: 0.092,
        freeSulfurDioxide: 15,
        totalSulfurDioxide: 54,
        density: 0.9970,
        pH: 3.26,
        sulphates: 0.65,
        alcohol: 9.8,
        quality: 5
    },
    {
        fixedAcidity: 11.2,
        volatileAcidity: 0.28,
        citricAcid: 0.56,
        residualSugar: 1.9,
        chlorides: 0.075,
        freeSulfurDioxide: 17,
        totalSulfurDioxide: 60,
        density: 0.9980,
        pH: 3.16,
        sulphates: 0.58,
        alcohol: 9.8,
        quality: 6
    },
    {
        fixedAcidity: 7.4,
        volatileAcidity: 0.70,
        citricAcid: 0.00,
        residualSugar: 1.9,
        chlorides: 0.076,
        freeSulfurDioxide: 11,
        totalSulfurDioxide: 34,
        density: 0.9978,
        pH: 3.51,
        sulphates: 0.56,
        alcohol: 9.4,
        quality: 5
    },
    {
        fixedAcidity: 7.4,
        volatileAcidity: 0.66,
        citricAcid: 0.00,
        residualSugar: 1.8,
        chlorides: 0.075,
        freeSulfurDioxide: 13,
        totalSulfurDioxide: 40,
        density: 0.9978,
        pH: 3.51,
        sulphates: 0.56,
        alcohol: 9.4,
        quality: 5
    },
    {
        fixedAcidity: 7.9,
        volatileAcidity: 0.60,
        citricAcid: 0.06,
        residualSugar: 1.6,
        chlorides: 0.069,
        freeSulfurDioxide: 15,
        totalSulfurDioxide: 59,
        density: 0.9964,
        pH: 3.30,
        sulphates: 0.46,
        alcohol: 9.4,
        quality: 5
    },
    {
        fixedAcidity: 7.3,
        volatileAcidity: 0.65,
        citricAcid: 0.00,
        residualSugar: 1.2,
        chlorides: 0.065,
        freeSulfurDioxide: 15,
        totalSulfurDioxide: 21,
        density: 0.9946,
        pH: 3.39,
        sulphates: 0.47,
        alcohol: 10.0,
        quality: 7
    },
    {
        fixedAcidity: 7.8,
        volatileAcidity: 0.58,
        citricAcid: 0.02,
        residualSugar: 2.0,
        chlorides: 0.073,
        freeSulfurDioxide: 9,
        totalSulfurDioxide: 18,
        density: 0.9968,
        pH: 3.36,
        sulphates: 0.57,
        alcohol: 9.5,
        quality: 7
    },
    {
        fixedAcidity: 7.5,
        volatileAcidity: 0.50,
        citricAcid: 0.36,
        residualSugar: 6.1,
        chlorides: 0.071,
        freeSulfurDioxide: 17,
        totalSulfurDioxide: 102,
        density: 0.9978,
        pH: 3.35,
        sulphates: 0.80,
        alcohol: 10.5,
        quality: 5
    },
    {
        fixedAcidity: 6.7,
        volatileAcidity: 0.58,
        citricAcid: 0.08,
        residualSugar: 1.8,
        chlorides: 0.097,
        freeSulfurDioxide: 15,
        totalSulfurDioxide: 65,
        density: 0.9959,
        pH: 3.28,
        sulphates: 0.54,
        alcohol: 9.2,
        quality: 5
    },
    {
        fixedAcidity: 7.5,
        volatileAcidity: 0.50,
        citricAcid: 0.36,
        residualSugar: 6.1,
        chlorides: 0.071,
        freeSulfurDioxide: 17,
        totalSulfurDioxide: 102,
        density: 0.9978,
        pH: 3.35,
        sulphates: 0.80,
        alcohol: 10.5,
        quality: 5
    },
    {
        fixedAcidity: 5.6,
        volatileAcidity: 0.615,
        citricAcid: 0.00,
        residualSugar: 1.6,
        chlorides: 0.089,
        freeSulfurDioxide: 16,
        totalSulfurDioxide: 59,
        density: 0.9943,
        pH: 3.58,
        sulphates: 0.52,
        alcohol: 9.9,
        quality: 5
    },
    {
        fixedAcidity: 7.8,
        volatileAcidity: 0.610,
        citricAcid: 0.29,
        residualSugar: 1.6,
        chlorides: 0.114,
        freeSulfurDioxide: 9,
        totalSulfurDioxide: 29,
        density: 0.9974,
        pH: 3.26,
        sulphates: 1.56,
        alcohol: 9.1,
        quality: 5
    },
    {
        fixedAcidity: 8.9,
        volatileAcidity: 0.620,
        citricAcid: 0.18,
        residualSugar: 3.8,
        chlorides: 0.176,
        freeSulfurDioxide: 52,
        totalSulfurDioxide: 145,
        density: 0.9988,
        pH: 3.16,
        sulphates: 0.88,
        alcohol: 9.2,
        quality: 5
    }
];

// ===================================
// Dataset Handlers
// ===================================

let currentDataset = [];

/**
 * Initialize dataset section handlers
 */
function initDatasetHandlers() {
    const uploadArea = document.getElementById('uploadArea');
    const csvUpload = document.getElementById('csvUpload');
    const loadSampleBtn = document.getElementById('loadSampleBtn');

    // Upload area click handler
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            csvUpload.click();
        });

        // Drag and drop handlers
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--wine-primary)';
            uploadArea.style.background = 'var(--cream)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--medium-gray)';
            uploadArea.style.background = 'transparent';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--medium-gray)';
            uploadArea.style.background = 'transparent';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    }

    // File input change handler
    if (csvUpload) {
        csvUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }

    // Load sample data button
    if (loadSampleBtn) {
        loadSampleBtn.addEventListener('click', () => {
            loadSampleData();
        });
    }
}

/**
 * Handle CSV file upload
 */
function handleFileUpload(file) {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        alert('Please upload a valid CSV file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const csvData = e.target.result;
        parseCSV(csvData);
    };
    reader.readAsText(file);
}

/**
 * Parse CSV data
 */
function parseCSV(csvData) {
    const lines = csvData.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    const dataset = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                // Convert to camelCase
                const key = header.replace(/\s+/g, '');
                row[key] = isNaN(values[index]) ? values[index].trim() : parseFloat(values[index]);
            });
            dataset.push(row);
        }
    }

    currentDataset = dataset;
    displayDataset(dataset);
}

/**
 * Load sample wine data
 */
function loadSampleData() {
    currentDataset = sampleWineData;
    displayDataset(sampleWineData);
}

/**
 * Display dataset in table
 */
function displayDataset(dataset) {
    const tableBody = document.getElementById('datasetBody');
    const totalRowsEl = document.getElementById('totalRows');
    const goodQualityEl = document.getElementById('goodQuality');
    const badQualityEl = document.getElementById('badQuality');

    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    // Display first 20 rows
    const displayRows = dataset.slice(0, 20);
    displayRows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.fixedAcidity || row['fixed acidity'] || '-'}</td>
            <td>${row.volatileAcidity || row['volatile acidity'] || '-'}</td>
            <td>${row.citricAcid || row['citric acid'] || '-'}</td>
            <td>${row.residualSugar || row['residual sugar'] || '-'}</td>
            <td>${row.chlorides || '-'}</td>
            <td>${row.freeSulfurDioxide || row['free sulfur dioxide'] || '-'}</td>
            <td>${row.totalSulfurDioxide || row['total sulfur dioxide'] || '-'}</td>
            <td>${row.density || '-'}</td>
            <td>${row.pH || '-'}</td>
            <td>${row.sulphates || '-'}</td>
            <td>${row.alcohol || '-'}</td>
            <td><strong>${row.quality || '-'}</strong></td>
        `;
        tableBody.appendChild(tr);
    });

    // Update statistics
    const totalRows = dataset.length;
    const goodQuality = dataset.filter(row => row.quality >= 6).length;
    const badQuality = dataset.filter(row => row.quality < 6).length;

    if (totalRowsEl) totalRowsEl.textContent = totalRows;
    if (goodQualityEl) goodQualityEl.textContent = goodQuality;
    if (badQualityEl) badQualityEl.textContent = badQuality;
}

// ===================================
// ML Prediction Logic
// ===================================

/**
 * Initialize prediction form
 */
function initPredictionForm() {
    const form = document.getElementById('predictionForm');
    const resetBtn = document.getElementById('resetBtn');

    if (form) {
        form.addEventListener('submit', handlePrediction);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            displayPredictionPlaceholder();
        });
    }
}

/**
 * Handle prediction form submission
 */
function handlePrediction(e) {
    e.preventDefault();

    // Get form values
    const formData = {
        fixedAcidity: parseFloat(document.getElementById('fixedAcidity').value),
        volatileAcidity: parseFloat(document.getElementById('volatileAcidity').value),
        citricAcid: parseFloat(document.getElementById('citricAcid').value),
        residualSugar: parseFloat(document.getElementById('residualSugar').value),
        chlorides: parseFloat(document.getElementById('chlorides').value),
        freeSulfurDioxide: parseFloat(document.getElementById('freeSulfurDioxide').value),
        totalSulfurDioxide: parseFloat(document.getElementById('totalSulfurDioxide').value),
        density: parseFloat(document.getElementById('density').value),
        pH: parseFloat(document.getElementById('pH').value),
        sulphates: parseFloat(document.getElementById('sulphates').value),
        alcohol: parseFloat(document.getElementById('alcohol').value)
    };

    // Validate inputs
    if (!validateInputs(formData)) {
        alert('Please ensure all values are within valid ranges.');
        return;
    }

    // Make prediction
    const prediction = predictWineQuality(formData);
    displayPredictionResult(prediction, formData);
}

/**
 * Validate input values
 */
function validateInputs(data) {
    // Check for NaN values
    for (let key in data) {
        if (isNaN(data[key])) {
            return false;
        }
    }
    return true;
}

/**
 * ML Prediction Algorithm
 * Quality >= 7 = Good Quality
 * Quality < 7 = Bad Quality
 */
function predictWineQuality(data) {
    // Calculate quality score based on multiple features
    let qualityScore = 5; // Base score
    let factors = [];

    // Alcohol content (weight: 2.5) - Higher is generally better
    if (data.alcohol >= 11.5) {
        qualityScore += 2.5;
        factors.push({ 
            feature: 'Excellent Alcohol Content', 
            impact: 'positive',
            description: `${data.alcohol}% - Strong body and preservation`
        });
    } else if (data.alcohol >= 10) {
        qualityScore += 1.5;
        factors.push({ 
            feature: 'Good Alcohol Content', 
            impact: 'positive',
            description: `${data.alcohol}% - Balanced strength`
        });
    } else if (data.alcohol >= 9) {
        qualityScore += 0.5;
    } else {
        qualityScore -= 1;
        factors.push({ 
            feature: 'Low Alcohol Content', 
            impact: 'negative',
            description: `${data.alcohol}% - May affect structure`
        });
    }

    // Volatile acidity (weight: -2) - Lower is better
    if (data.volatileAcidity <= 0.3) {
        qualityScore += 2;
        factors.push({ 
            feature: 'Low Volatile Acidity', 
            impact: 'positive',
            description: `${data.volatileAcidity} g/dm³ - Excellent freshness`
        });
    } else if (data.volatileAcidity <= 0.5) {
        qualityScore += 1;
        factors.push({ 
            feature: 'Moderate Volatile Acidity', 
            impact: 'positive',
            description: `${data.volatileAcidity} g/dm³ - Good balance`
        });
    } else if (data.volatileAcidity >= 0.8) {
        qualityScore -= 2;
        factors.push({ 
            feature: 'High Volatile Acidity', 
            impact: 'negative',
            description: `${data.volatileAcidity} g/dm³ - Vinegar taste risk`
        });
    } else {
        qualityScore -= 0.5;
        factors.push({ 
            feature: 'Elevated Volatile Acidity', 
            impact: 'neutral',
            description: `${data.volatileAcidity} g/dm³ - Borderline acceptable`
        });
    }

    // Citric acid (weight: 1.5) - Moderate levels are good
    if (data.citricAcid >= 0.3 && data.citricAcid <= 0.6) {
        qualityScore += 1.5;
        factors.push({ 
            feature: 'Optimal Citric Acid', 
            impact: 'positive',
            description: `${data.citricAcid} g/dm³ - Adds freshness`
        });
    } else if (data.citricAcid >= 0.15) {
        qualityScore += 0.5;
    } else if (data.citricAcid === 0) {
        qualityScore -= 0.5;
        factors.push({ 
            feature: 'No Citric Acid', 
            impact: 'neutral',
            description: 'May lack freshness and complexity'
        });
    }

    // Sulphates (weight: 1.5) - Higher is generally better
    if (data.sulphates >= 0.75) {
        qualityScore += 1.5;
        factors.push({ 
            feature: 'High Sulphates', 
            impact: 'positive',
            description: `${data.sulphates} g/dm³ - Good preservation`
        });
    } else if (data.sulphates >= 0.6) {
        qualityScore += 1;
    } else if (data.sulphates < 0.5) {
        qualityScore -= 0.5;
        factors.push({ 
            feature: 'Low Sulphates', 
            impact: 'negative',
            description: `${data.sulphates} g/dm³ - Limited antioxidant protection`
        });
    }

    // pH (weight: 1) - Lower is better (more acidic)
    if (data.pH <= 3.2) {
        qualityScore += 1;
        factors.push({ 
            feature: 'Optimal pH Level', 
            impact: 'positive',
            description: `pH ${data.pH} - Crisp and fresh`
        });
    } else if (data.pH <= 3.4) {
        qualityScore += 0.5;
    } else if (data.pH >= 3.6) {
        qualityScore -= 0.5;
        factors.push({ 
            feature: 'High pH Level', 
            impact: 'negative',
            description: `pH ${data.pH} - May lack acidity`
        });
    }

    // Fixed acidity (weight: 0.5) - Balance is key
    if (data.fixedAcidity >= 7 && data.fixedAcidity <= 9.5) {
        qualityScore += 0.5;
        factors.push({ 
            feature: 'Balanced Fixed Acidity', 
            impact: 'positive',
            description: `${data.fixedAcidity} g/dm³ - Good structure`
        });
    } else if (data.fixedAcidity > 11) {
        qualityScore -= 0.5;
        factors.push({ 
            feature: 'High Fixed Acidity', 
            impact: 'neutral',
            description: `${data.fixedAcidity} g/dm³ - May be too tart`
        });
    }

    // Residual sugar (weight: 0.5) - Moderate levels
    if (data.residualSugar >= 2 && data.residualSugar <= 3.5) {
        qualityScore += 0.5;
        factors.push({ 
            feature: 'Balanced Residual Sugar', 
            impact: 'positive',
            description: `${data.residualSugar} g/dm³ - Pleasant sweetness`
        });
    } else if (data.residualSugar > 8) {
        qualityScore -= 0.5;
        factors.push({ 
            feature: 'High Residual Sugar', 
            impact: 'neutral',
            description: `${data.residualSugar} g/dm³ - Quite sweet`
        });
    }

    // Chlorides (weight: -0.5) - Lower is better
    if (data.chlorides <= 0.07) {
        qualityScore += 0.5;
    } else if (data.chlorides >= 0.1) {
        qualityScore -= 0.5;
        factors.push({ 
            feature: 'Elevated Chlorides', 
            impact: 'negative',
            description: `${data.chlorides} g/dm³ - Salty perception`
        });
    }

    // Density correlation with quality
    if (data.density <= 0.9965) {
        qualityScore += 0.3;
    } else if (data.density >= 0.998) {
        qualityScore -= 0.3;
    }

    // Round and constrain quality score to 0-10 range
    qualityScore = Math.max(0, Math.min(10, Math.round(qualityScore * 10) / 10));

    // Determine quality: >= 7 is GOOD, < 7 is BAD
    const isGoodQuality = qualityScore >= 7;
    const qualityLabel = isGoodQuality ? 'Good Quality Wine' : 'Bad Quality Wine';
    
    // Calculate confidence based on how far from threshold
    const distanceFromThreshold = Math.abs(qualityScore - 7);
    const confidence = Math.min(98, 70 + (distanceFromThreshold * 10));

    return {
        quality: qualityLabel,
        isGood: isGoodQuality,
        confidence: confidence,
        predictedScore: qualityScore,
        factors: factors,
        threshold: 7
    };
}

/**
 * Display enhanced prediction result in modal
 */
function displayPredictionResult(prediction, inputData) {
    const resultContainer = document.getElementById('predictionResult');
    const modal = document.getElementById('resultModal');
    const modalContent = document.getElementById('modalResultContent');
    
    // Update sidebar result card (simplified version)
    const sidebarHTML = `
        <div class="result-content ${prediction.isGood ? 'result-good' : 'result-bad'}">
            <div class="result-icon ${prediction.isGood ? 'result-good' : 'result-bad'}">
                ${prediction.isGood ? '✓' : '✗'}
            </div>
            <h3 class="result-title">${prediction.quality}</h3>
            <p class="result-description">
                Quality Score: <strong>${prediction.predictedScore}/10</strong>
            </p>
            <p class="result-description">
                Confidence: <strong>${prediction.confidence.toFixed(1)}%</strong>
            </p>
            <button class="btn btn-primary" onclick="showDetailedResults()">
                View Detailed Analysis
            </button>
        </div>
    `;
    
    resultContainer.innerHTML = sidebarHTML;
    
    // Create detailed modal content
    const detailedHTML = `
        <div class="enhanced-result">
            <div class="result-header">
                <div class="result-badge ${prediction.isGood ? 'good' : 'bad'}">
                    ${prediction.isGood ? '✓ Good Quality' : '✗ Bad Quality'}
                </div>
                <div class="result-icon-large ${prediction.isGood ? 'good' : 'bad'}">
                    ${prediction.isGood ? '🍷' : '⚠️'}
                </div>
                <h2 class="result-main-title ${prediction.isGood ? 'good' : 'bad'}">
                    ${prediction.quality}
                </h2>
                <p class="result-subtitle">
                    ${prediction.isGood 
                        ? 'This wine demonstrates excellent quality characteristics!' 
                        : 'This wine shows quality concerns that may affect taste and aging.'}
                </p>
            </div>
            
            <div class="result-score-display">
                <div class="score-item">
                    <span class="score-value ${prediction.isGood ? 'good' : 'bad'}">${prediction.predictedScore}</span>
                    <span class="score-label">Quality Score</span>
                </div>
                <div class="score-item">
                    <span class="score-value ${prediction.isGood ? 'good' : 'bad'}">${prediction.confidence.toFixed(0)}%</span>
                    <span class="score-label">Confidence</span>
                </div>
            </div>
            
            <div class="quality-meter">
                <div class="meter-label">
                    <span>Quality Scale</span>
                    <span>${prediction.predictedScore}/10</span>
                </div>
                <div class="meter-bar">
                    <div class="meter-fill ${prediction.isGood ? 'good' : 'bad'}" 
                         style="width: ${(prediction.predictedScore / 10) * 100}%">
                    </div>
                </div>
            </div>
            
            ${prediction.factors.length > 0 ? `
                <div class="result-analysis">
                    <div class="analysis-section">
                        <h3 class="analysis-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9 11l3 3L22 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Key Quality Factors
                        </h3>
                        <div class="factor-list">
                            ${prediction.factors.map(factor => `
                                <div class="factor-item">
                                    <div class="factor-icon ${factor.impact}">
                                        ${factor.impact === 'positive' ? '↑' : factor.impact === 'negative' ? '↓' : '→'}
                                    </div>
                                    <div class="factor-text">
                                        <span class="factor-name">${factor.feature}</span>
                                        <span class="factor-description">${factor.description}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-section">
                        <h3 class="analysis-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                                <path d="M9 3v18M3 9h18M3 15h18M15 3v18" stroke-width="2"/>
                            </svg>
                            Input Summary
                        </h3>
                        <div class="input-summary">
                            <div class="summary-item">
                                <span class="summary-label">Alcohol</span>
                                <span class="summary-value">${inputData.alcohol}%</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">pH Level</span>
                                <span class="summary-value">${inputData.pH}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Volatile Acidity</span>
                                <span class="summary-value">${inputData.volatileAcidity}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Citric Acid</span>
                                <span class="summary-value">${inputData.citricAcid}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Sulphates</span>
                                <span class="summary-value">${inputData.sulphates}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Density</span>
                                <span class="summary-value">${inputData.density}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="result-actions">
                <button class="btn btn-primary" onclick="closeDetailedResults()">Close</button>
                <button class="btn btn-secondary" onclick="resetAndClose()">New Prediction</button>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = detailedHTML;
    
    // Show modal automatically
    setTimeout(() => {
        modal.classList.add('active');
    }, 300);
    
    // Store prediction for later use
    window.currentPrediction = prediction;
    window.currentInputData = inputData;
}

/**
 * Show detailed results modal
 */
function showDetailedResults() {
    const modal = document.getElementById('resultModal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Close detailed results modal
 */
function closeDetailedResults() {
    const modal = document.getElementById('resultModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Reset form and close modal
 */
function resetAndClose() {
    const form = document.getElementById('predictionForm');
    if (form) {
        form.reset();
    }
    closeDetailedResults();
    displayPredictionPlaceholder();
}

// Close modal when clicking outside or on close button
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('resultModal');
    const closeBtn = document.getElementById('closeModal');
    const overlay = modal?.querySelector('.result-modal-overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDetailedResults);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeDetailedResults);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeDetailedResults();
        }
    });
});

/**
 * Display prediction placeholder
 */
function displayPredictionPlaceholder() {
    const resultContainer = document.getElementById('predictionResult');
    resultContainer.innerHTML = `
        <div class="result-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>Enter wine properties and click "Predict Quality" to see results</p>
        </div>
    `;
}

// ===================================
// Utility Functions
// ===================================

/**
 * Format number to fixed decimal places
 */
function formatNumber(num, decimals = 2) {
    return typeof num === 'number' ? num.toFixed(decimals) : num;
}

/**
 * Scroll to top function (if needed)
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Console message
console.log('%c Wine Quality Prediction System ', 'background: #8B1538; color: white; font-size: 16px; padding: 10px;');
console.log('System initialized successfully ✓');
