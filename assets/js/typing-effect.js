const typingContainers = [
    { element: document.getElementById('typing-container1'), htmlCode: '<h2 class="greeting">Nice to meet you!</h2>', text: 'Nice to meet you!' },
    { element: document.getElementById('typing-container2'), htmlCode: '<h2 class="name">I\'m Eric Duncan</h2>', text: 'I\'m Eric Duncan' }
];

function typeCode(container, index = 0) {
    if (index < container.htmlCode.length) {
        container.element.innerHTML += container.htmlCode.charAt(index);
        setTimeout(() => typeCode(container, index + 1), 50);
    } else {
        setTimeout(() => transformToText(container), 500);
    }
}

function transformToText(container) {
    container.element.innerHTML = container.htmlCode;
    container.element.classList.add('typed');
}

function startTypingEffect() {
    typingContainers.forEach((container, index) => {
        setTimeout(() => typeCode(container), index * 3000);
    });
}

window.addEventListener('load', startTypingEffect);