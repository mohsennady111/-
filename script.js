// قائمة الأذكار
const azkarList = [
    "سبحان الله",
    "الحمدلله",
    "لا إله إلا الله",
    "الله أكبر",
    "رب اغفر لي",
    "أستغفر الله",
    "لا حول ولا قوة إلا بالله",
    "اللهم صل وسلم على سيدنا محمد",
    "سبحان الله وبحمده",
    "اللهم اغفر لي",
    "الله أكبر كبيرا",
    "سبحان الله عدد خلقه",
    "لا اله الا انت سبحانك إني كنت من الظالمين",
    "سبحان الله وبحمده عدد خلقه ورضا نفسه",
    "اللهم إنك عفو تحب العفو فاعف عني"
];

// دالة لإنشاء عناصر الأذكار
function renderAzkar() {
    const container = document.getElementById('countersList');
    container.innerHTML = '';
    
    azkarList.forEach((zikr, index) => {
        const savedValue = localStorage.getItem(`zikr_${index}`);
        const initialValue = savedValue ? parseInt(savedValue) : 0;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'counter-item';
        itemDiv.setAttribute('data-index', index);

        itemDiv.innerHTML = `
            <div class="counter-name">${zikr}</div>
            <div class="counter-value" id="zikrValue-${index}">${initialValue}</div>
            <button class="reset-button" onclick="resetSingleCounter(${index})" title="تصفير هذا العداد">↺</button>
        `;

        itemDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('reset-button')) return;
            
            const valueDiv = document.getElementById(`zikrValue-${index}`);
            let currentVal = parseInt(valueDiv.innerText);
            currentVal += 1;
            valueDiv.innerText = currentVal;
            localStorage.setItem(`zikr_${index}`, currentVal);
        });

        container.appendChild(itemDiv);
    });
}

// دالة لتصفير عداد فردي
window.resetSingleCounter = function(index) {
    const valueDiv = document.getElementById(`zikrValue-${index}`);
    valueDiv.innerText = '0';
    localStorage.setItem(`zikr_${index}`, 0);
}

// ✅ دالة تصفير الكل (بعد التعديل)
function resetAllCounters() {
    // تصفير العداد الرئيسي
    const mainDisplay = document.getElementById('mainDisplay');
    mainDisplay.innerText = '0';
    localStorage.setItem('mainCounter', 0);
    
    // ✅ مهم جداً: تحديث المتغير mainCount
    mainCount = 0;
    
    // تصفير جميع عدادات الأذكار
    azkarList.forEach((_, index) => {
        const valueDiv = document.getElementById(`zikrValue-${index}`);
        if (valueDiv) {
            valueDiv.innerText = '0';
            localStorage.setItem(`zikr_${index}`, 0);
        }
    });
}

// متغير عام للعداد الرئيسي
let mainCount = 0;

// وظائف العداد الرئيسي
function setupMainCounter() {
    const mainDisplay = document.getElementById('mainDisplay');
    const mainBtn = document.getElementById('mainIncrementBtn');

    mainCount = localStorage.getItem('mainCounter');
    mainCount = mainCount ? parseInt(mainCount) : 0;
    mainDisplay.innerText = mainCount;

    mainBtn.addEventListener('click', () => {
        mainCount += 1;
        mainDisplay.innerText = mainCount;
        localStorage.setItem('mainCounter', mainCount);
    });
}

// تشغيل كل الوظائف بعد تحميل الصفحة
window.onload = function() {
    renderAzkar();
    setupMainCounter();

    const resetAllBtn = document.getElementById('resetAllBtn');
    if (resetAllBtn) {
        resetAllBtn.addEventListener('click', resetAllCounters);
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            const mainDisplay = document.getElementById('mainDisplay');
            mainCount = parseInt(mainDisplay.innerText) + 1;
            mainDisplay.innerText = mainCount;
            localStorage.setItem('mainCounter', mainCount);
        }
    });
};