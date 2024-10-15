import {I18n} from 'i18n-js';
import translations from '@data/translations.json';
import general from '../../data/general';

export const i18n = new I18n(translations);

window.i18n = i18n;

const changeTranslate = () => {
	general.share.default.title = i18n.t('share.title.default');
	general.share.default.description = i18n.t('share.description.default');

	general.share.custom.title = i18n.t('share.title.custom');
	general.share.custom.description = i18n.t('share.description.custom');

	document.title = i18n.t('share.title.default');
	document.description = i18n.t('share.description.default');

	$('[data-i18n]').each(function () {
		let tKey = $(this).data('i18n');

		$('body').attr('data-lang', i18n.locale);

		$(this).html(i18n.t(tKey))
		$(this).closest('.js-text-option').attr('data-text', i18n.t(tKey));
		$('.js-input').attr('placeholder', i18n.t('form.input'));

		// document.title = i18n.t('share.title.default');
		// document.querySelector('[property="og:title"]').setAttribute('content', i18n.t('share.title.default'));
		// document.querySelector('[property="og:description"]').setAttribute('content', i18n.t('share.description.default'));
	});
}

function selectLang (picker, lang) {
	$('.header__lang').removeClass('is-hidden');
	picker.addClass('is-hidden');

	localStorage.setItem('language', lang);
	general.lang = lang;
}

const init = (container) => {
	i18n.defaultLocale = 'ru';
	i18n.locale = localStorage.getItem('language') || 'ru';

	$('[data-lang="'+i18n.locale+'"]').addClass('is-hidden').siblings().removeClass('is-hidden');

	changeTranslate();

	$('.js-lang-ru').on('click', function () {
		i18n.locale = 'ru';
		selectLang($(this), 'ru');
	});

	$('.js-lang-uzb').on('click', function () {
		i18n.locale = 'uzb';
		selectLang($(this), 'uzb');
	});

	i18n.onChange(function () {
		changeTranslate();
	});
}

export default {
	init
};
