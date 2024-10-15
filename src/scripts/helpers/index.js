/* global GLOBAL_PATH IS_PROD */

import {getScrollbarWidth} from './get-scrollbar-width';

export const baseDir = GLOBAL_PATH;
export const isProd = IS_PROD;
export const isDevices = () => innerWidth <= 1024;
export const html = document.querySelector('html');
export const clearText = (text) => text.trim().replace(/\s+/g, ' ');

export function isAnimating(state) {
	if (typeof state !== 'undefined') {
		document.documentElement.classList.toggle('is-animating', state);
	}

	return document.documentElement.classList.contains('is-animating');
}

export function dataPage(name) {
	if (typeof name !== 'undefined') {
		document.documentElement.setAttribute('data-page', name);
	}

	return document.documentElement.getAttribute('data-page');
}

export function throttle(cb, delay = 1000) {
	let shouldWait = false;
	let waitingArgs;
	const timeoutFunc = () => {
		if (waitingArgs == null) {
			shouldWait = false;
		} else {
			cb(...waitingArgs);
			waitingArgs = null;
			setTimeout(timeoutFunc, delay);
		}
	};

	return (...args) => {
		if (shouldWait) {
			waitingArgs = args;

			return;
		}

		cb(...args);
		shouldWait = true;

		setTimeout(timeoutFunc, delay);
	};
}

export function debounce(cb, delay = 1000) {
	let timeout;

	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			cb(...args);
		}, delay);
	};
}

export function scrollSet(state) {
	if (state) {
		html.classList.add('is-lock-scroll');
	} else {
		html.classList.remove('is-lock-scroll');
	}
}

/**
* Узнать есть доступен ли ховер
* @returns {boolean}
*/
export function hasHoverSupport() {
	let hoverSupport;

	if (getScrollbarWidth()) {
		// On touch devices scrollbar width is usually 0
		hoverSupport = true;
	} else if (isDevices()) {
		hoverSupport = false;
	} else if (window.matchMedia('(any-hover: hover)').matches || window.matchMedia('(hover: hover)').matches) {
		hoverSupport = true;
	} else if (window.matchMedia('(hover: none)').matches) {
		hoverSupport = false;
	} else {
		hoverSupport = typeof html.ontouchstart === 'undefined';
	}

	return hoverSupport;
}

// @demo
// if (!hasHoverSupport()) {
// 	html.removeClass('has-hover').addClass('no-hover');
// } else {
// 	html.removeClass('no-hover').addClass('has-hover');
// }
