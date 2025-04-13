// ========== 1. TEXT TOGGLE ==========
function toggleText(element) {
    element.classList.toggle("active");
}

// ========== 2. CANVAS ELEMENTS ==========
const stitchCanvas = document.getElementById("stitchCanvas");
const stitchCtx = stitchCanvas.getContext("2d");

const cellCanvas = document.getElementById("cellCanvas");
const cellCtx = cellCanvas.getContext("2d");

// ========== 3. RESIZE CANVAS ==========
function resizeCanvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    stitchCanvas.width = width;
    stitchCanvas.height = height; // 높이를 화면 높이에 맞게 설정

    cellCanvas.width = width;
    cellCanvas.height = height; // 세포 캔버스 크기도 설정
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // 초기화 시 한번 실행

// ========== 4. MOUSE STITCH EFFECT ==========
let lastX = null;
let lastY = null;
let lastTime = 0;
const stitchInterval = 10; // 속도 문제 해결을 위한 간격 설정
const stitchSpacing = 20; // 스티치 간격
const stitches = [];
const fadeDuration = 5000;

function drawStitch(x, y) {
    if (lastX !== null && lastY !== null) {
        const angle = Math.atan2(y - lastY, x - lastX);
        const endX = lastX + Math.cos(angle) * stitchSpacing;
        const endY = lastY + Math.sin(angle) * stitchSpacing;
        stitches.push({ x: lastX, y: lastY, angle, createdAt: Date.now() });
        lastX = endX;
        lastY = endY;
    } else {
        lastX = x;
        lastY = y;
    }
}

function drawStitches() {
    stitchCtx.clearRect(0, 0, stitchCanvas.width, stitchCanvas.height);
    const currentTime = Date.now();

    for (let i = stitches.length - 1; i >= 0; i--) {
        const stitch = stitches[i];
        const age = currentTime - stitch.createdAt;
        const rawAlpha = 1 - age / fadeDuration;
        const alpha = Math.max(rawAlpha, 0.1);

        stitchCtx.save();
        stitchCtx.translate(stitch.x, stitch.y - window.scrollY);
        stitchCtx.rotate(stitch.angle);
        stitchCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        stitchCtx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
        stitchCtx.lineWidth = 1;
        stitchCtx.fillRect(0, -1.5, 10, 3);
        stitchCtx.strokeRect(0, -1.5, 10, 3);
        stitchCtx.restore();
    }
    requestAnimationFrame(drawStitches);
}
drawStitches();

document.addEventListener("mousemove", (e) => {
    const currentTime = Date.now();
    if (currentTime - lastTime > stitchInterval) {
        drawStitch(e.clientX, e.clientY + window.scrollY);
        lastTime = currentTime;
    }
});









// 키워드 애니메이션 및 스크롤에 반응하여 자라나는 효과
const keywords = document.querySelectorAll('.keyword');

// 키워드를 클릭했을 때 해당 섹션으로 이동
function scrollToSection(event) {
    const target = event.target;
    const keywordId = target.id;
    const section = document.getElementById(keywordId.replace('keyword', 'section'));

    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 키워드가 화면에 보일 때 애니메이션을 추가
function animateKeywordsOnScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;

    keywords.forEach((keyword) => {
        const keywordPosition = keyword.offsetTop + keyword.offsetHeight / 2;

        // 스크롤 시, 해당 키워드가 화면에 도달하면 애니메이션
        if (scrollPosition > keywordPosition) {
            keyword.classList.add('active');

            // 각 글자에 유기적 움직임을 부여하기 위해 "moving" 클래스 추가
            const spans = keyword.querySelectorAll('span');
            spans.forEach((span) => {
                span.classList.add('moving');  // 유기적 움직임 시작
            });
        }
    });
}

document.addEventListener('scroll', animateKeywordsOnScroll);

// 키워드에 클릭 이벤트 추가
keywords.forEach(keyword => {
    keyword.addEventListener('click', scrollToSection);
});

// 초기 애니메이션 실행
animateKeywordsOnScroll();








// 클릭 시 'active' 클래스를 추가하여 텍스트가 펼쳐지게 함
document.querySelectorAll('.quote-container1, .quote-container2, .EssayBodyHidden').forEach((item) => {
    item.addEventListener('click', function () {
        const hiddenText = this.querySelector('.hidden-text, .hidden-text2, .EssayBodyhidden-text');
        if (hiddenText) {
            hiddenText.classList.toggle('active'); // 클릭 시 'active' 클래스를 토글
        }
    });
});







// 'sticky' 요소들을 선택합니다.
const stickyElement1 = document.querySelector('.sticky-video-container01');
const stickyElement2 = document.querySelector('.sticky-video-container02');
const stickyElement3 = document.querySelector('.sticky-video-container03');
const stopPoint1 = document.querySelector('.invisiblespacing02'); // 첫 번째 stop point
const stopPoint2 = document.querySelector('.clicknote02'); // 두 번째 stop point (예시)
const stopPoint3 = document.querySelector('.invisiblespacing03');

// 스크롤 이벤트 리스너
window.addEventListener('scroll', function() {
    // 첫 번째 sticky 요소의 위치
    const stopPointBottom1 = stopPoint1.offsetTop + stopPoint1.offsetHeight;
    const stickyElement1Top = stickyElement1.getBoundingClientRect().top + window.scrollY;

    // 두 번째 sticky 요소의 위치
    const stopPointBottom2 = stopPoint2.offsetTop + stopPoint2.offsetHeight;
    const stickyElement2Top = stickyElement2.getBoundingClientRect().top + window.scrollY;

     // 세 번째 sticky 요소의 위치
     const stopPointBottom3 = stopPoint3.offsetTop + stopPoint3.offsetHeight;
     const stickyElement3Top = stickyElement3.getBoundingClientRect().top + window.scrollY;
    
    // 첫 번째 sticky 요소 처리
    if (window.scrollY + window.innerHeight > stopPointBottom1) {
        stickyElement1.style.position = 'absolute';
        stickyElement1.style.top = `${stopPointBottom1 - stickyElement1.offsetHeight}px`; 
        stickyElement1.style.opacity = '0';
        stickyElement1.style.transition = 'opacity 0.5s ease';
    } else {
        stickyElement1.style.position = 'sticky';
        stickyElement1.style.top = '20px';
        stickyElement1.style.opacity = '1';
        stickyElement1.style.transition = 'opacity 0.5s ease';
    }

    // 두 번째 sticky 요소 처리
    if (window.scrollY + window.innerHeight > stopPointBottom2) {
        stickyElement2.style.position = 'absolute';
        stickyElement2.style.top = `${stopPointBottom2 - stickyElement2.offsetHeight}px`; 
        stickyElement2.style.opacity = '0';
        stickyElement2.style.transition = 'opacity 0.5s ease';
    } else {
        stickyElement2.style.position = 'sticky';
        stickyElement2.style.top = '20px';
        stickyElement2.style.opacity = '1';
        stickyElement2.style.transition = 'opacity 0.5s ease';
    }

    // 세 번째 sticky 요소 처리
    if (window.scrollY + window.innerHeight > stopPointBottom3) {
        stickyElement3.style.position = 'absolute';
        stickyElement3.style.top = `${stopPointBottom3 - stickyElement3.offsetHeight}px`; 
        stickyElement3.style.opacity = '0';
        stickyElement3.style.transition = 'opacity 0.5s ease';
    } else {
        stickyElement3.style.position = 'sticky';
        stickyElement3.style.top = '20px';
        stickyElement3.style.opacity = '1';
        stickyElement3.style.transition = 'opacity 0.5s ease';
    }


});



// ========== 5. CELL OBJECT ==========
// ========== 5. CELL OBJECT ==========
class Cell {
    constructor(x, y, radiusX, radiusY) {
        this.x = x;
        this.y = y;
        this.radiusX = radiusX * 2; // 크기 2배 증가
        this.radiusY = radiusY * 2; // 크기 2배 증가
        this.color = 'rgb(80, 80, 80, 0.5)'; // 마우스 스티치와 동일한 색상 사용
        this.velocityX = Math.random() * 2 - 1; // X축 속도
        this.velocityY = Math.random() * 2 - 1; // Y축 속도
        this.phase = Math.random() * Math.PI * 2; // 파도처럼 움직이기 위한 랜덤 위상
    }

    // 세포 안을 점들로 채우기
    draw() {
        const numPoints = Math.floor(Math.random() * 15) + 5; // 세포 내부에 찍을 점의 수 (5~20개)
        
        for (let i = 0; i < numPoints; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * (this.radiusX - 2) + 1; // 점들의 위치가 타원 내에서 불규칙하게 배치되도록
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;
            
            cellCtx.beginPath();
            cellCtx.arc(this.x + offsetX, this.y + offsetY, 1, 0, Math.PI * 2); // 작은 점을 그리기
            cellCtx.fillStyle = this.color; // 테두리 색상 설정
            cellCtx.fill(); // 채우기
            cellCtx.closePath();
        }

        // 세포 테두리 (속이 빈 타원형)
        cellCtx.beginPath();
        cellCtx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        cellCtx.strokeStyle = this.color; // 테두리 색상 설정
        cellCtx.lineWidth = 0.5; // 테두리 두께 설정
        cellCtx.stroke(); // 채우지 않고 테두리만 그리기
        cellCtx.closePath();
    }

    // 세포 업데이트 (이동 및 소리 파도 효과)
    update() {
        const time = Date.now() * 0.002; // 시간에 비례하는 값으로 파도처럼 효과
        this.x += Math.sin(time + this.phase) * 0.5;
        this.y += Math.cos(time + this.phase) * 0.5;

        // 캔버스 경계를 넘지 않도록 처리 (우측 15% 공간 내에서만 이동)
        if (this.x - this.radiusX < stitchCanvas.width * 0.85 || this.x + this.radiusX > stitchCanvas.width) {
            this.velocityX = -this.velocityX;
        }
        if (this.y - this.radiusY < 0 || this.y + this.radiusY > stitchCanvas.height) {
            this.velocityY = -this.velocityY;
        }

        this.draw();
    }
}

// 세포 배열
let cells = [];

// 세포 생성 함수 (우측 15%만 사용)
function createCells(num) {
    for (let i = 0; i < num; i++) {
        let x = Math.random() * stitchCanvas.width * 0.15 + stitchCanvas.width * 0.85;
        let y = Math.random() * stitchCanvas.height;
        let radiusX = Math.random() * 2 + 1;
        let radiusY = Math.random() * 3 + 1;
        cells.push(new Cell(x, y, radiusX, radiusY));
    }
}

// 애니메이션 루프
function animateCells() {
    cellCtx.clearRect(0, 0, stitchCanvas.width, stitchCanvas.height); // 이전 프레임 지우기
    for (let i = 0; i < cells.length; i++) {
        cells[i].update(); // 세포 업데이트
    }
    requestAnimationFrame(animateCells); // 애니메이션 반복
}

// 세포 150개 생성
createCells(150);
animateCells();  // 세포 애니메이션 시작














// ========== 6. TEXT SCROLL EFFECT (스크롤에 따라 펼쳐지고 닫히는 효과) ==========
const hiddenTextElements = document.querySelectorAll('.hidden-text, .hidden-text2, .EssayBodyhidden-text');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const hiddenText = entry.target;
        if (entry.isIntersecting) {
            hiddenText.classList.add('active');
        } else {
            hiddenText.classList.remove('active');
        }
    });
}, options);

hiddenTextElements.forEach(element => {
    observer.observe(element);
});

