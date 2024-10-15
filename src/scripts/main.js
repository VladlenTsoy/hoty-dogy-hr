import $ from 'jquery';
import gsap from 'gsap';
import AOS from 'aos';
import debounce from 'lodash.debounce';
// import throttle from 'lodash.throttle';

import '@styles/vendor.scss';
import '@styles/main.scss';

import actualYear from '@scripts/modules/actual-year';
import uaParser from '@scripts/modules/ua-parser';
import vhFix from '@scripts/modules/vh-fix';
import i18n from '@scripts/modules/i18n';

import {isDevices} from '@scripts/helpers/index';
import lazyLoad from '@scripts/modules/lazy-load';
import scrollToAnchor from './modules/scrollToAnchor';
import lazyBlur from './modules/lazyBlur';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import './vendor/swiper-bundle.min.js';
import 'swiper/css';
import './vendor/imask.js';
import jqueryValidate from "jquery-validation";
import popup from '@components/popup/popup';
import home from '@pages/home/home';

let resizeWidth = null;

window.$ = $;
window.jQuery = $;
window._debounce = debounce;
window.gsap = gsap;
window.SimpleBar = SimpleBar;
window.jqueryValidate = jqueryValidate;
window.AOS = AOS;

// добавить скрипты для реасйза, чтобы не вешать дополнительные обработчики внутри компонентов
const scriptsResize = [
	uaParser.resize,
	home.resize,
];

const resize = () => {
	if (isDevices() && resizeWidth && resizeWidth === innerWidth) {
		// vhFix.resize();

		return;
	}

	document.body.classList.add('is-resizing');

	scriptsResize.forEach((script) => script());
	document.body.classList.remove('is-resizing');

	console.log('resize');

	resizeWidth = innerWidth;
};

const initResize = () => {
	resizeWidth = innerWidth;
	window.addEventListener('resize', resize);
};

const destroyResize = () => {
	resizeWidth = null;
	window.removeEventListener('resize', resize);
};

// eslint-disable-next-line max-len
// добавить скрипты для инициализации при переходах. Активируем нужные модули которые будут использоваться и которые должны обновлять при переходах между страницами
const scriptsInit = [
	lazyLoad.init,
	scrollToAnchor.init,
	lazyBlur.init,
	actualYear.init,
	home.init,
	initResize,
];

// добавить скрипты для удаленния данных при уходе
const scriptsDestroy = [
	destroyResize,
	home.destroy,
];

const init = () => {
	uaParser.init();
	vhFix.init();
	// закоментировать или удалить если SPA поведение не требуется
	// router.init(scriptsInit, scriptsDestroy);

	home.init();
	popup.init();
	i18n.init();

	setTimeout(function () {
		document.body.classList.add('is-loaded');

		AOS.init({
			once: true,
			duration: 1000,
		});
	}, 100)

	resizeWidth = innerWidth;
	window.addEventListener('resize', _debounce(resize, 500));
};

document.addEventListener('DOMContentLoaded', init);
