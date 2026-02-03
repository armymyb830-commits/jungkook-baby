let timeLeft = 1200;
let timerId = null;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const inputMins = document.getElementById('inputMins');
const messageArea = document.getElementById('message');
const burnerCard = document.querySelector('.card.burner');

// --- タイマー機能 ---

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (timerId) return;
  
  startBtn.textContent = 'PAUSE';
  messageArea.classList.remove('show');
  burnerCard.classList.remove('complete');
  
  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) finishTimer();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  startBtn.textContent = 'RESUME';
}

function finishTimer() {
  clearInterval(timerId);
  timerId = null;
  startBtn.textContent = 'GOAL!✨';
  
  // アクション：アラート通知
  setTimeout(() => {
    alert("素晴らしいです！目標時間を達成しました。脂肪がしっかり燃焼されましたよ✨");
  }, 500);

  messageArea.textContent = "理想の体に一歩近づきました💕";
  messageArea.classList.add('show');
  burnerCard.classList.add('complete');
}

// セット・リセットボタン
resetBtn.addEventListener('click', () => {
  pauseTimer();
  const mins = parseInt(inputMins.value) || 20;
  timeLeft = mins * 60;
  updateDisplay();
  startBtn.textContent = 'START';
  messageArea.classList.remove('show');
  burnerCard.classList.remove('complete');
});

startBtn.addEventListener('click', () => {
  if (timerId) {
    pauseTimer();
  } else {
    startTimer();
  }
});

// --- 水分補給トラッカー ---

const waterGrid = document.getElementById('waterGrid');
const remainText = document.getElementById('remainWater');
const totalGlasses = 5;

for (let i = 0; i < totalGlasses; i++) {
  const span = document.createElement('span');
  span.classList.add('glass');
  span.textContent = '💧';
  span.addEventListener('click', function() {
    this.classList.toggle('active');
    const activeCount = document.querySelectorAll('.glass.active').length;
    remainText.textContent = totalGlasses - activeCount;
    
    // おまけ：水を飲むほど背景が少し爽やかになる演出
    const bluePower = activeCount * 20;
    document.body.style.background = `linear-gradient(135deg, #ffafbd, #ffc3a0, rgba(160, 231, 255, ${activeCount/10}))`;
  });
  waterGrid.appendChild(span);
}

// 初期表示
updateDisplay();
