//фиксированный хедер
const header = document.querySelector('#header');
let headerHeight = header.clientHeight;

window.addEventListener('scroll', () => {
	if (window.pageYOffset > headerHeight)
		header.classList.add('fixed');
	else
		header.classList.remove('fixed');
});


//бургер меню
let burger = document.querySelector('.burger');
let headerNav = document.querySelector('.header__nav');
let closeBtn = document.querySelector('.close_btn');
burger.addEventListener('click', ()=>{
	headerNav.classList.toggle('active-menu');
});

closeBtn.addEventListener('click', () => {
	headerNav.classList.toggle('active-menu');
});
//<--бургер меню

//плавный скролл
(function () {

	const smoothScroll = function (targetEl, duration) {
		const headerElHeight = document.querySelector('#header').clientHeight; // класс хедера
		let target = document.querySelector(targetEl);		
		let headerNav = document.querySelector('.header__nav');
		let targetPosition = target.getBoundingClientRect().top - headerElHeight; //вычитаем размер хедера, если он фиксированный
		let startPosition = window.pageYOffset;
		let startTime = null;

		const ease = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		const animation = function (currentTime) {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = ease(timeElapsed, startPosition, targetPosition, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};
		requestAnimationFrame(animation);
	};

	const scrollTo = function () {
		//const links = document.querySelectorAll('.js-scroll'); //добавляем классы к линкам
		const links = document.querySelectorAll('.header__list li a'); //добавляем классы к линкам

		links.forEach(each => {
			each.addEventListener('click', function () {
				const currentTarget = this.getAttribute('href');
				smoothScroll(currentTarget, 1000);
				//выход из мобильного
				headerNav.classList.remove('active-menu');
			});
		});
	};

	scrollTo();
}());
//<--плавный скролл


//Оптимизация загрузки видео
function findVideos() {
	let videos = document.querySelectorAll('.video');

	for (let i = 0; i < videos.length; i++) {
		setupVideo(videos[i]);
	}
}

function setupVideo(video) {
	let link = video.querySelector('.video__link');
	let media = video.querySelector('.video__media');
	let button = video.querySelector('.video__button');
	let id = parseMediaURL(media);

	video.addEventListener('click', () => {
		let iframe = createIframe(id);

		link.remove();
		button.remove();
		video.appendChild(iframe);
	});

	link.removeAttribute('href');
	video.classList.add('video--enabled');
}

function parseMediaURL(media) {
	let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
	let url = media.src;
	let match = url.match(regexp);

	return match[1];
}

function createIframe(id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');
	iframe.setAttribute('src', generateURL(id));
	iframe.classList.add('video__media');

	return iframe;
}

function generateURL(id) {
	let query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
//<--Оптимизация загрузки видео