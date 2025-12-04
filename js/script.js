document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 기존 필터 기능 ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techItems = document.querySelectorAll('.tech-item');

    const filterItems = (category) => {
        techItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === itemCategory) {
                item.style.display = 'grid';
                setTimeout(() => item.classList.remove('hidden'), 10);
            } else {
                item.classList.add('hidden');
                setTimeout(() => item.style.display = 'none', 400); 
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const selectedCategory = button.getAttribute('data-category');
            filterItems(selectedCategory);
        });
    });

    // 메인 페이지(index.html)에만 필터 기능이 있으므로 에러 방지를 위한 체크
    if(filterButtons.length > 0) {
        filterItems('coffee');
    }
    // --- 1. 기존 필터 기능 끝 ---


    // --- 2. 스크롤 리모컨 & 스마트 기능 ---
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const btnScrollBottom = document.getElementById('btn-scroll-bottom');
    const btnHome = document.getElementById('btn-home');
    const btnDarkMode = document.getElementById('btn-dark-mode');
    const btnShare = document.getElementById('btn-share');

    // [기능 1] 홈으로
    if(btnHome) {
        btnHome.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // [기능 2] 다크 모드 전환
    if(btnDarkMode) {
        btnDarkMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // 다크모드 상태를 로컬 스토리지에 저장하면 페이지 이동해도 유지될 수 있습니다.
        });
    }

    // [기능 3] 주소 공유
    if(btnShare) {
        btnShare.addEventListener('click', () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('웹사이트 주소가 복사되었습니다!\n' + url);
            }).catch(err => {
                alert('주소 복사에 실패했습니다.');
            });
        });
    }

    // [기능 4] 맨 위로 / 맨 아래로
    if(btnScrollTop && btnScrollBottom) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        btnScrollBottom.addEventListener('click', () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    }

    // --- 2. 스크롤 리모컨 기능 끝 ---


    // ========  3. 팝업(모달) 기능  ========
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close');
    const learnMoreButtons = document.querySelectorAll('.btn-more');

    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description'); 

    // 모달 요소가 있는 페이지에서만 실행
    if(modalOverlay) {
        learnMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); 

                const itemText = e.target.closest('.item-text');
                const itemBox = e.target.closest('.tech-item');

                const titleHTML = itemText.querySelector('h2').innerHTML; 
                const titleWithSpace = titleHTML.replace(/<br\s*\/?>/gi, ' '); 
                const title = titleWithSpace.replace(/\s+/g, ' ').trim(); 
                
                const imageSrc = itemBox.querySelector('.item-image img').src;
                const detailHTML = itemText.querySelector('.modal-detail-content').innerHTML;

                modalTitle.textContent = title; 
                modalImage.src = imageSrc;
                modalDescription.innerHTML = detailHTML; 

                modalOverlay.classList.add('active');
            });
        });

        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
    // ========  수정 끝  ========

});
