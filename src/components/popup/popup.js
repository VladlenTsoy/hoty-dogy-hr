import {isDevices} from '@scripts/helpers';
import {lockScroll} from '@scripts/helpers/lock-scroll';
// import scrollbar from '@components/scrollbar/scrollbar';

let $popup = null;
let $close = null;
let $content = null;

let $jsPopupOpen = null;
let $jsPopupClose = null;

let isTutorial = true;

const getStatusTutorial = () => {
	return isTutorial;
}

const updateStatusTutorial = (status) => {
	isTutorial = status;
}

const setVars = (container) => {
    $popup = document.querySelectorAll('.popup');
    $close = document.querySelectorAll('.popup__close');
    $content = document.querySelectorAll('.popup__content');

    $jsPopupOpen = document.querySelectorAll('.js-popup-open');
	$jsPopupClose = document.querySelectorAll('.js-popup-close');
};

const getById = (id) => Array.from($popup).find(($popupCurrent) => $popupCurrent.dataset.id === id);

const isActive = () =>
    !!Array.from($popup).filter(($popupCurrent) => $popupCurrent.classList.contains('is-active')).length;

// const scrollbarScrollTopOnOpen = ($popupCurrent) => {
//     const $scrollbar = $popupCurrent.querySelector('.scrollbar');
//
//     if ($scrollbar) {
//         scrollbar.scrollTo($scrollbar, 0, 0);
//     }
// };

const scrollbarUpdate = () => {
    if (!isDevices()) {
        return;
    }

    // $content.forEach(($contentCurrent) => {
    //     scrollbar.update($contentCurrent);
    // });
};

const scrollbarDestroy = () => {
    if (isDevices()) {
        return;
    }

    // $content.forEach(($contentCurrent) => {
    //     scrollbar.destroy($contentCurrent);
    // });
};

// const scrollbarCreate = () => {
//     if (!isDevices()) {
//         return;
//     }
//
//     $content.forEach(($contentCurrent) => {
//         scrollbar.create($contentCurrent, 'article');
//     });
// };

const addEvent = (id, name, callback) => {
    const eventName = `on${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    $popup.forEach(($popupCurrent) => {
        if (typeof id === 'undefined' || (typeof id !== 'undefined' && $popupCurrent.dataset.id === id)) {
            if (!$popupCurrent[eventName]) {
                $popupCurrent[eventName] = [];
            }

            $popupCurrent[eventName].push(callback);
        }
    });
};

const toggle = async (id, state) => {
    const $popupCurrent = getById(id);

    if (!$popupCurrent) {
        return;
    }

    $popupCurrent.classList.toggle('is-active', state);

    if (state) {
		// scroller.isLocoScrollLocked();
		lockScroll(true);
        $popupCurrent.onOpen && $popupCurrent.onOpen.forEach((cb) => cb(id));

        // scrollbarScrollTopOnOpen($popupCurrent);
    } else {
		lockScroll(false);

		// scroller.isLocoScrollUnlocked();

        $popupCurrent.onClose && $popupCurrent.onClose.forEach((cb) => cb(id));
    }
};

const open = (id) => toggle(id, true);

const close = (id) => toggle(id, false);

const openOnClickJsPopupOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();

	if (e.currentTarget.classList.contains('is-open')) {
		if (e.currentTarget.classList.contains('home-nav')) {
			e.currentTarget.classList.remove('is-open');
		}

		close(e.currentTarget.dataset.id);
	} else {
		if (e.currentTarget.classList.contains('home-nav')) {
			e.currentTarget.classList.add('is-open');
		}

		// console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id);

		open(e.currentTarget.dataset.id);
	}
};

const closeOnKeydown = (e) => {
    if (isActive() && e.keyCode === 27) {
        $popup.forEach(($popupCurrent) => {
            if ($popupCurrent.classList.contains('is-active')) {
                close($popupCurrent.dataset.id);
            }
        });
    }
};

const closeOnClickOutOfContainer = (e) => {
    if (!e.target.classList.contains('popup__container') && !e.target.closest('.popup__container')) {

        close(e.currentTarget.dataset.id);
    }
};

const closeOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log('close');

    close(e.currentTarget.closest('.popup').dataset.id);
};

const resize = async () => {
    if (!$popup.length) {
        return;
    }
};

const init = (container) => {
    setVars(container);

    if (!$popup.length) {
        return;
    }

    document.addEventListener('keydown', closeOnKeydown);

    $popup.forEach(($popupCurrent) => {
        $popupCurrent.addEventListener('click', closeOnClickOutOfContainer);
    });

    $close.forEach(($closeCurrent) => {
        $closeCurrent.addEventListener('click', closeOnClick);
    });

    $jsPopupOpen.forEach(($jsPopupOpenCurrent) => {
        $jsPopupOpenCurrent.addEventListener('click', openOnClickJsPopupOpen);
    });

	$jsPopupClose.forEach(($jsPopupCloseCurrent) => {
		$jsPopupCloseCurrent.addEventListener('click', closeOnClick);
	});
};

export default {
    init,
    resize,
    open,
    addEvent,
	getStatusTutorial,
	updateStatusTutorial
};
