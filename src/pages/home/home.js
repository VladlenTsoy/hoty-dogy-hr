import popup from '@components/popup/popup';
import {isDevices} from "../../scripts/helpers";

let swiperList = [];

function initScrollRoll() {
	const $scrollRoll = document.querySelectorAll('.scrollRoll');

	$scrollRoll.forEach(el => {
		const scrollContent = el.querySelector('.scrollRoll__content');

		const duration = el.dataset.duration;

		scrollContent.innerHTML += scrollContent.innerHTML;

		// Добавляем задержку, чтобы дождаться полной отрисовки
		setTimeout(() => {
			const totalWidth = scrollContent.scrollWidth / 2;

			gsap.to(scrollContent, {
				x: -totalWidth,
				duration,
				ease: "none",
				repeat: -1,
			});
		}, 100);
	})
}

function copyText() {
	const btn = document.querySelector('.js-copy-code');
	const copyText = document.querySelector('.js-copy-value').innerText;

	btn.addEventListener('click', function () {
		navigator.clipboard.writeText(copyText);
	});
}

const initSimpleBar = () => {
	const $content = document.querySelectorAll('.js-custom-scrollbar');

	$content.forEach(el => {
		let localSimpleBar = new SimpleBar(el);
	})
}

const initSlider = () => {
	const $sliders = document.querySelectorAll('.js-slider');

	$sliders.forEach(el => {
		let popupImagesSwiper = new Swiper(el, {
			slidesPerView: 1,
			loop: true,
			effect: "fade",
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});

		swiperList.push(popupImagesSwiper);
	});


	if (isDevices()) {
		const $slidersMobile = document.querySelectorAll('.js-slider-products');

		// console.log('$slidersMobile', $slidersMobile);

		$slidersMobile.forEach(el => {
			let popupProductsSwiper = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 16
			});

			swiperList.push(popupProductsSwiper);
		});
	}
}

function maskPhone () {
	const $inputPhoneMask = document.querySelector('.js-phone-mask');
	const $inputValidation = document.querySelector('.js-phone-mask-fake');

	if ($inputPhoneMask) {
		let maskOptions = {
			mask: '+{998} ( 00 ) 000 - 00 - 00',
			lazy: false
		};

		const mask = IMask($inputPhoneMask, maskOptions);

		mask.on('accept', () => {
			$inputValidation.value = mask.unmaskedValue;

			if (mask.unmaskedValue === '') {
				$inputPhoneMask.classList.remove('valid');
			} else {
				$inputPhoneMask.classList.add('valid');
			}
		});

		mask.on('complete', () => {
			// console.log('complete');
			$($inputValidation).addClass('valid');
			$inputValidation.value = mask.value;
		})
	}
}

const formValidation = () => {
	const validator = $("form[name='mailForm']").validate({
		errorElement: 'div',
		rules: {
			name: 'required',
			phone: {
				required: true,
				minlength: {
					param: 12,
				},
			},
		},
		messages: {
			name: '',
			phone: {
				required: '',
				minlength: '',
			},
		},
		invalidHandler: function(event, validator) {
			// console.log("Invalid form submission");
		},
		submitHandler: function(form) {
			console.log("Form submitted");

			setTimeout(function () {
				// form.submit();

				sendPublication();
			}, 1000)
		}
	});
}

const sendPublication = () => {
	const API = 'https://befit-promo-api.vercel.app/send-application';

	const name = $("input[name='name']").val();
	const phone = $("input[name='phone']").val().replace(/\s+/g, '');

	const data = {
		name: name,
		phone: phone
	};

	$.ajax({
		type: 'POST',
		url: API,
		data: JSON.stringify(data),
		contentType: 'application/json',
		cache: false,
		success: function(data){
			if(data.status!==undefined && data.status!==null && data.status==='success'){
				console.log('Успешный ответ:', data);

				popup.open('form-success');
			} else {
				console.log('Ошибка:', data);
			}
		},
		error: function(error) {
			console.log('Ошибка при отправке данных:', error.status, error.statusText);
		},
	});
}

function initTabs() {
	const listPopups = document.querySelectorAll('.popup');

	listPopups.forEach(parent => {
		const tabLinks = parent.querySelectorAll('.tab-link');

		const tabContents = parent.querySelectorAll('.tab-content');

		if (tabLinks.length) {
			tabLinks.forEach(link => {
				link.addEventListener('click', function() {
					const tabId = this.getAttribute('data-tab');

					tabLinks.forEach(link => link.classList.remove('active'));

					tabContents.forEach(content => content.classList.remove('active'));

					this.classList.add('active');

						parent.querySelector(`#${tabId}`).classList.add('active');
				});
			});
		}
	});
}

function anchorLinks() {
	const scrollLinks = document.querySelectorAll('.js-scroll-link');

	scrollLinks.forEach(link => {
		link.addEventListener('click', function(event) {
			event.preventDefault();

			const targetId = this.getAttribute('data-target');
			const targetElement = document.getElementById(targetId);

			targetElement.scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
}

function init(container) {
	// console.log('home init');

	initScrollRoll();
	copyText();
	anchorLinks();
	initTabs();
	initSimpleBar();
	initSlider();
	maskPhone();
	formValidation();
}

function destroy() {
	// console.log('home destroy');
}

function reset() {
	if (swiperList) {
		swiperList.forEach(el => {
			el.destroy(true, true);
		})


		swiperList = [];
	}
}

function resize() {
	// console.log('home resize');

	reset();

	initSlider();
}

export default {
	init,
	resize,
	destroy,
};
