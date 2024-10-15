import barba from '@barba/core';
import {isProd} from '../../scripts/helpers';

function init(scriptsInit, scriptsDestroy) {
	barba.hooks.beforeLeave(({current}) => {
		// отключение обработчиков событий и удаленние их дынных
		scriptsDestroy.forEach((script) => script(current.container));
		// можно добавить анимацию перед уходом со страницы
	});

	barba.hooks.beforeEnter(({next}) => {
		// инициализация скриптов новой страницы
		scriptsInit.forEach((script) => script(next.container));
		// можно добавить анимацию появления страницы
	});

	barba.init({
		debug: !isProd,
		requestError: (trigger, action, url, response) => {
			// go to a custom 404 page if the user click on a link that return a 404 response status
			if (action === 'click' && response.status && response.status === 404) {
				barba.go('/404');
			}

			// prevent Barba from redirecting the user to the requested URL
			// this is equivalent to e.preventDefault() in this context
			return false;
		},
	});
}

export default {
	init,
};
