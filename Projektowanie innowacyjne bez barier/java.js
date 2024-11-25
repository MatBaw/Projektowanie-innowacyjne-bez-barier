document.addEventListener('DOMContentLoaded', function() {
    // Swiper
    new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });

    // Rozmiar fontu
    const defaultFontSize = 18;
    let currentFontSize = defaultFontSize;
    const adjustableElements = document.querySelectorAll('.font-adjustable');

    function adjustFontSize(increase) {
        currentFontSize += increase ? 2 : -2;
        if (currentFontSize < 10) currentFontSize = 10; // Minimum font size limit
        if (currentFontSize > 40) currentFontSize = 40; // Maximum font size limit
        adjustableElements.forEach(el => el.style.fontSize = `${currentFontSize}px`);
    }

    const increaseFontButton = document.getElementById('increaseFont');
    const decreaseFontButton = document.getElementById('decreaseFont');
    const increaseLineHeightButton = document.getElementById('increaseLineHeight');
    const increaseLetterSpacingButton = document.getElementById('increaseLetterSpacing');
    const resetSettingsButton = document.getElementById('resetSettings');

    increaseFontButton.addEventListener('click', () => adjustFontSize(true));
    decreaseFontButton.addEventListener('click', () => adjustFontSize(false));

    // Interlinia i światła między wyrazami
    const defaultLineHeight = 1.6, defaultLetterSpacing = 0;
    let currentLineHeight = defaultLineHeight, currentLetterSpacing = defaultLetterSpacing;

    function adjustStyle(prop, increase, unit) {
        if (prop === 'lineHeight') currentLineHeight += increase ? 0.2 : -0.2;
        else if (prop === 'letterSpacing') currentLetterSpacing += increase ? 0.5 : -0.5;
        adjustableElements.forEach(el => el.style[prop] = `${prop === 'lineHeight' ? currentLineHeight : currentLetterSpacing}${unit}`);
    }

    increaseLineHeightButton.addEventListener('click', () => adjustStyle('lineHeight', true, ''));
    increaseLetterSpacingButton.addEventListener('click', () => adjustStyle('letterSpacing', true, 'px'));

    // Kontrasty
    const body = document.body;
    const modes = {
        toggleContrast: { className: 'high-contrast', buttonColor: '#fff', barColor: '#333', backgroundColor: '#000' },
        yellowMode: { className: 'yellow-mode', buttonColor: '#000', barColor: '#e2e20c', backgroundColor: '#FFFF00' },
        greenMode: { className: 'green-mode', buttonColor: '#000', barColor: '#04d304', backgroundColor: '#00FF00' }
    };

    // Wybierz elementy
    const buttons = document.querySelectorAll('.color-change-button');
    const bar = document.querySelector('nav'); // Pasek kontrolny
    const container = document.querySelector('.container'); // Tło za paskiem
    const logo = document.getElementById('logo'); // Logo
    const toggleFontButton = document.getElementById('toggleFont');
    let dyslexiaFontEnabled = false;

    Object.keys(modes).forEach(id => {
        const mode = modes[id];
        document.getElementById(id).addEventListener('click', () => {
            // Resetuj klasy trybów
            Object.values(modes).forEach(m => body.classList.remove(m.className));

            // Ustaw klasę aktywnego trybu
            body.classList.add(mode.className);

            // Zmień style przycisków
            buttons.forEach(button => {
                button.style.backgroundColor = mode.buttonColor;
                button.style.color = mode.className === 'high-contrast' ? '#000' : '#fff';
            });

            // Zmień styl paska
            if (bar) bar.style.backgroundColor = mode.barColor;

            // Zmień tło za paskiem
            if (container) container.style.backgroundColor = modes.backgroundColor;

            // Zmień logo
            if (logo) {
                if (id === 'toggleContrast') logo.src = 'images/logoczarne.png';
                else if (id === 'yellowMode') logo.src = 'images/logozolte.png';
                else if (id === 'greenMode') logo.src = 'images/logo zielone.png';
                else logo.src = 'images/banericon1.png';
            }
        });
    });

    // Obsługa zmiany czcionki
    toggleFontButton.addEventListener('click', () => {
        dyslexiaFontEnabled = !dyslexiaFontEnabled;

        if (dyslexiaFontEnabled) {
            body.classList.add('dyslexia-font');
        } else {
            body.classList.remove('dyslexia-font');
        }
    });

    // Reset ustawień
    resetSettingsButton.addEventListener('click', () => {
        dyslexiaFontEnabled = false;
        body.classList.remove('dyslexia-font');

        currentFontSize = defaultFontSize;
        currentLineHeight = defaultLineHeight;
        currentLetterSpacing = defaultLetterSpacing;
        adjustableElements.forEach(el => {
            el.style.fontSize = `${defaultFontSize}px`;
            el.style.lineHeight = `${defaultLineHeight}`;
            el.style.letterSpacing = `${defaultLetterSpacing}px`;
        });
        Object.values(modes).forEach(mode => body.classList.remove(mode.className));

        // Przywróć domyślne style
        buttons.forEach(button => {
            button.style.backgroundColor = '';
            button.style.color = '';
        });
        if (bar) bar.style.backgroundColor = '';
        if (logo) logo.src = 'images/banericon1.png';
    });

    // Modal 
    function setupModal(modalId, triggerIds) {
        const modal = document.getElementById(modalId);
        const closeBtn = modal.querySelector('.close');

        const toggleModal = (display) => {
            modal.style.display = display;
            if (display === 'block') closeBtn.focus();
        };

        triggerIds.forEach(triggerId => {
            const trigger = document.getElementById(triggerId);
            if (trigger) {
                trigger.addEventListener('click', () => toggleModal('block'));
                trigger.addEventListener('keydown', e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleModal('block');
                    }
                });
            }
        });

        closeBtn.addEventListener('click', () => toggleModal('none'));
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') toggleModal('none');
        });
    }

    setupModal('signupModal', ['signupButton', 'signupButton2']);
});
