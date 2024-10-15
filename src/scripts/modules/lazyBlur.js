/* eslint-disable no-underscore-dangle */
/*!
 * lazy-blur.js 0.1.7 - Progressive image loader with SVG blur effect
 * Copyright (c) 2016 Rplus - https://github.com/Rplus/lazy-blur.js
 * License: MIT
 */

// eslint-disable-next-line func-names
let _extends = Object.assign || function (target) {
	for (let i = 1; i < arguments.length; i++) {
		// eslint-disable-next-line prefer-rest-params
		let source = arguments[i];
		for (let key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}

	return target;
};

// eslint-disable-next-line no-underscore-dangle
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

// eslint-disable-next-line no-redeclare
/* global Image */

let LazyBlur =
/**
	 // * @param  {String}       imgSQuery
	 *         small imgs' className or imgs' DOM array
	 *         default: `.lazy-blur__imgS`
	 *
	 // * @param  {Function}     getImgLSrc
	 *         function for getting imgL source url
	 *         default: `function (imgS) { return imgS.getAttribute('data-src'); }`
	 *
	 // * @param  {String}       eventType
	 *         event of trigger load images
	 *         'click', 'mouseenter', 'scroll' (default)
	 *
	 // * @param  {Number}       scrollThreshold
	 *         distance of scroll threshold (buffer), unit: px
	 *         default: 50
	 *
	 // * @param  {String}       imgLClass
	 *         className of imgL
	 *         default: 'lazy-blur__imgL'
	 *
	 // * @param  {String}       filterSelector
	 *         css selector for SVG filter
	 *         default: `html.svg *:not(.done) > ${opt.imgSQuery}`
	 *
	 // * @param  {Number}       blurSize
	 *         value of svg gaussian blur filter
	 *         default: 20
	 *
	 // * @param  {Function}     onLoad
	 *         after imgL loaded
	 *         default: `addClass('done')` for imgS' parent
	 */

	function LazyBlur() {
	// eslint-disable-next-line prefer-rest-params
		let opt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, LazyBlur);

		opt.imgSQuery = opt.imgSQuery || '.lazy-blur__imgS';
		opt = _extends({
			imgLClass: 'lazy-blur__imgL',
			filterSelector: `html.svg *:not(.done) > ${opt.imgSQuery}`,
			getImgLSrc: function getImgLSrc(imgS) {
				return imgS.getAttribute('data-src');
			},
			onLoad: function onLoad(imgS) {
				imgS.parentElement.className += ' done ';
			},
			blurSize: 20,
			scrollThreshold: 50,
			eventType: 'scroll',
		}, opt);

		opt.imgs = [].slice.call(document.querySelectorAll(opt.imgSQuery));

		// skip if no matched img
		if (!opt.imgs.length) {
			return;
		}

		if (typeof opt.onLoad !== 'function') {
			opt.onLoad = false;
		}

		// append svg filter
		let inlineSvg = `\n    <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;">\n      <def>\n        <filter id="lazy-blur-filter">\n          <feGaussianBlur stdDeviation="${opt.blurSize}"></feGaussianBlur>\n        </filter>\n      </def>\n    </svg>\n    <style>\n      ${opt.filterSelector} {\n        -webkit-filter: url("#lazy-blur-filter");\n                filter: url("#lazy-blur-filter");\n      }\n    </style>`;

		// eslint-disable-next-line func-names
		document.body.appendChild((function () {
			let newEl = document.createElement('div');
			newEl.innerHTML = inlineSvg;

			return newEl;
		})());

		let bindManualEvent = function bindManualEvent(e) {
			// eslint-disable-next-line no-use-before-define
			appendSrcImg(e.target);
		};

		let appendSrcImg = function appendSrcImg(imgS) {
			let imgL = new Image();
			if (opt.onLoad) {
				// eslint-disable-next-line func-names
				imgL.onload = function () {
					opt.onLoad(imgS);
				};
			}
			imgL.className = opt.imgLClass;
			imgL.src = opt.getImgLSrc(imgS);
			imgS.parentNode.insertBefore(imgL, imgS.nextSibling);

			if (opt.eventType !== 'scroll') {
				imgS.removeEventListener(opt.eventType, bindManualEvent);
			}
		};

		let bindScrollEvent = function bindScrollEvent() {
			let getImgPos = function getImgPos() {
				// return if all lazy-blur images loaded
				if (opt.imgsWithPos && !opt.imgsWithPos.length) {
					return;
				}

				opt.imgsWithPos = opt.imgs.map((img) => {
					// eslint-disable-next-line no-underscore-dangle
					let _rect = img.getBoundingClientRect();
					// eslint-disable-next-line no-underscore-dangle
					let _offsetY = window.pageYOffset;

					return {
						imgEl: img,
						top: _rect.top + _offsetY,
						bottom: _rect.bottom + _offsetY,
					};
				});
			};

			let detectImgsAreInViewport = function detectImgsAreInViewport() {
				// return if all imgs loaded
				if (!opt.imgsWithPos.length) {
					return;
				}

				// eslint-disable-next-line no-underscore-dangle
				let _offsetY = window.pageYOffset;
				// eslint-disable-next-line no-underscore-dangle
				let _vpTop = _offsetY - opt.scrollThreshold;
				// eslint-disable-next-line no-underscore-dangle
				let _vpBottom = _offsetY + window.innerHeight + opt.scrollThreshold;

				// eslint-disable-next-line no-unused-vars
				opt.imgsWithPos = opt.imgsWithPos.filter((imgData) => {
					// eslint-disable-next-line max-len
					let isInVp = imgData.bottom < _vpBottom && imgData.bottom > _vpTop || imgData.top > _vpTop && imgData.top < _vpBottom;

					if (isInVp) {
						appendSrcImg(imgData.imgEl);
					}

					return !isInVp;
				});
			};

			getImgPos();
			detectImgsAreInViewport();

			window.addEventListener('scroll', () => {
				detectImgsAreInViewport();
			});

			window.addEventListener('resize', () => {
				getImgPos();
				detectImgsAreInViewport();
			});
		};

		// events for loading img
		// eslint-disable-next-line default-case
		switch (opt.eventType) {
			case 'click':
			case 'mouseenter':
				// eslint-disable-next-line array-callback-return
				opt.imgs.map((img) => {
					img.addEventListener(opt.eventType, bindManualEvent);
				});
				break;

			case 'scroll':
				bindScrollEvent();
				break;
		}
	};

const init = () => {
	setTimeout(() => {
		// eslint-disable-next-line no-new
		new LazyBlur({
			filterSelector: '.lazy-blur__imgS',
		});
	}, 100);
};

export default {
	init,
};
