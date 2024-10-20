import popup from '@components/popup/popup';
import {isDevices} from "../../scripts/helpers";
import {lockScroll} from '@scripts/helpers/lock-scroll';

let swiperList = [];

const fileExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
const fileMaxSize = 15 * 1024 * 1024; // Максимальный размер файла 15MB

const initSimpleBar = () => {
	const $content = document.querySelectorAll('.js-custom-scrollbar');

	$content.forEach(el => {
		let localSimpleBar = new SimpleBar(el);
	})
}

const initAccordion = () => {
	const togglers = document.querySelectorAll('[data-toggle]');

	// Открыть первый таб по умолчанию
	if (togglers.length > 0) {
		const firstToggler = togglers[0]; // Первый элемент
		const firstSelector = firstToggler.dataset.toggle;
		const firstBlock = document.querySelector(`${firstSelector}`);

		firstToggler.classList.add('active');
		firstBlock.style.maxHeight = firstBlock.scrollHeight + 'px';
	}

	togglers.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const selector = e.currentTarget.dataset.toggle;
			const block = document.querySelector(`${selector}`);

			// Закрыть все открытые аккордеоны, кроме текущего
			togglers.forEach((otherBtn) => {
				const otherSelector = otherBtn.dataset.toggle;
				const otherBlock = document.querySelector(`${otherSelector}`);

				if (otherBtn !== btn) {
					otherBtn.classList.remove('active');
					otherBlock.style.maxHeight = '';
				}
			});

			// Открыть или закрыть текущий аккордеон
			if (e.currentTarget.classList.contains('active')) {
				block.style.maxHeight = '';
			} else {
				block.style.maxHeight = block.scrollHeight + 'px';
			}

			e.currentTarget.classList.toggle('active');
		});
	});
}

const initTabIntro = () => {
	const tab = document.querySelector('.js-tab-intro');

	tab.addEventListener('click', function () {
		tab.classList.toggle('is-open-tab');
	})
}

const initSelectMenu = () => {
	const optionMenu = document.querySelector(".select-menu"),
		selectBtn = optionMenu.querySelector(".select-btn"),
		options = optionMenu.querySelectorAll(".option"),
		sBtn_text = optionMenu.querySelector(".sBtn-text");

	selectBtn.addEventListener("click", () =>
		optionMenu.classList.toggle("active")
	);

	options.forEach((option) => {
		option.addEventListener("click", () => {
			let selectedOption = option.querySelector(".option-text").innerText;
			sBtn_text.value = selectedOption;

			optionMenu.classList.remove("active");
			$('.sBtn-text').removeClass('error');
		});
	});
}

const initFileUpload = () => {
	$(".js-file-upload input[type=file]").change(function(){
		var filename = $(this).val().replace(/.*\\/, "");

		if (filename) {
			$('.js-file-name').addClass('is-has-file')
			$("#filename").text(filename);
		} else {
			$('.js-file-name').removeClass('is-has-file')
		}
	});
}

const initMenu = () => {
	const burger = document.querySelector('.hamburger-container');
	const menu = document.querySelector('.menu');

	burger.addEventListener('click', function () {
		if (burger.classList.contains('is-active')) {
			burger.classList.remove('is-active');
			menu.classList.remove('is-active');
			lockScroll(false);
		} else {
			burger.classList.add('is-active');
			menu.classList.add('is-active');
			lockScroll(true);
		}
	});
}

const initSlider = () => {
	const $slidersBonus = document.querySelectorAll('.js-slider-bonus');

	$slidersBonus.forEach(el => {
		let popupBonusSwiper = new Swiper(el, {
			slidesPerView: 3,
			spaceBetween: 20,
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 18
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20
				}
			}
		});

		swiperList.push(popupBonusSwiper);
	});
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
			tg: 'required',
			job: 'required',
			email: {
				required: true,
				email: true
			},
			fileCheck: 'required'
		},
		messages: {
			name: '',
			phone: {
				required: '',
				minlength: '',
			},
			tg: '',
			job: '',
			email: {
				required: '',
				email: ''
			},
			fileCheck: ''
		},
		invalidHandler: function(event, validator) {
			if (validator.errorList.length > 0) {
				// Проверяем, есть ли ошибка в поле fileCheck
				let fileCheckError = validator.errorList.some(function(error) {
					return error.element.name === 'fileCheck';
				});

				if (fileCheckError) {
					uploadFile();
				}
			}
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
	const API = '';

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

const setEvents = () => {
	const $inputFile = document.querySelector('#file');
	$inputFile.addEventListener("change", uploadFile);
}

const loadingValidation = (hasError, type) => {
	if (hasError) {
		$('.js-file-upload').addClass('has-error');

		if (type === 'format') {
			console.log("i18n.t('form.file.error.format')", i18n.t('form.file.error.format'));
			$('.js-file-upload p.error').text(i18n.t('form.file.error.format'));
		} else if (type === 'size') {
			$('.js-file-upload p.error').text(i18n.t('form.file.error.size'));
		} else if (type === 'file') {
			$('.js-file-upload p.error').text(i18n.t('form.file.error.file'));
		}
	} else {
		$('.js-file-upload').removeClass('has-error');
	}
}

const uploadFile = (e) => {
	const inputTarget = document.getElementById('file');
	const file = inputTarget.files[0];

	if (!file) {
		console.log('Загрузите файл CV');
		loadingValidation(true, 'file');

		return;
	}

	// Получаем расширение файла
	const fileExtension = file.name.split('.').pop().toLowerCase();

	// Проверяем, допустимо ли расширение файла
	if (fileExtensions.indexOf(fileExtension) < 0) {
		console.log('Проверяем, допустимо ли расширение файла');
		loadingValidation(true, 'format');
	}
	// Проверяем, не превышает ли размер файла допустимый максимум
	else if (file.size > fileMaxSize) {
		console.log('Проверяем, не превышает ли размер файла допустимый максимум');
		loadingValidation(true, 'size');
	} else {
		loadingValidation(false);
	}
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

	anchorLinks();
	initAccordion();
	initSimpleBar();
	initSlider();
	initTabIntro();
	initSelectMenu();
	initFileUpload();
	setEvents();
	initMenu();

	initTabs();
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
