import popup from '@components/popup/popup';
import {isDevices} from "../../scripts/helpers";

let swiperList = [];

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


	const $slidersBonus = document.querySelectorAll('.js-slider-bonus');

	$slidersBonus.forEach(el => {
		let popupBonusSwiper = new Swiper(el, {
			slidesPerView: 3,
			spaceBetween: 20
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
			job: 'required',
			email: 'required',
			file: {
				required: true,
				extension: "pdf|doc|docx",
			},
		},
		messages: {
			name: '',
			phone: {
				required: '',
				minlength: '',
			},
			job: '',
			email: '',
			file: {
				required: 'Выберите файл',
				extension: 'Разрешены только PDF, DOC, DOCX, JPG или PNG файлы',
			},
		},
		invalidHandler: function(event, validator) {
			// console.log("Invalid form submission");
		},
		submitHandler: function(form) {
			let fileInput = $('input[name="file"]')[0];
			let file = fileInput.files[0];

			// Проверка размера файла (не более 15MB)
			if (file && file.size > 15 * 1024 * 1024) {
				alert("Размер файла не должен превышать 15MB");
				return false;
			}

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

	anchorLinks();
	initAccordion();
	initSimpleBar();
	initSlider();
	initTabIntro();
	initSelectMenu();
	initFileUpload();

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
