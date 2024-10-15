// import header from '@components/header/header';

function scrollTo(targetElement) {
	const element = document.querySelector(targetElement);
	// const headerOffset = 0;

	if (element) {
		const elementPosition = element.getBoundingClientRect().top;
		// const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

		history.pushState({}, '', targetElement);
		window.scrollTo({
			top: elementPosition,
			behavior: 'smooth',
		});
	}
}

const init = () => {
	document.querySelectorAll('.js-to-anchor').forEach((el) => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();

			const id = e.currentTarget.getAttribute('href');
			// console.log(id);
			// header.close()

			setTimeout(() => {
				scrollTo(id);
			}, 500);
		});
	});
};

export default {
	init,
};
