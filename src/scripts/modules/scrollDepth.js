export class ScrollDepth {
	constructor(scrollValues, onScrollReached) {
		this.scrollReached = [];
		this.scrollValues = scrollValues;
		this.onScrollReached = onScrollReached;
		this.handleScroll = this.handleScroll.bind(this);
	}

	// eslint-disable-next-line class-methods-use-this
	getScrollPercentage() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		const clientHeight = document.documentElement.clientHeight;
		const scrollableHeight = scrollHeight - clientHeight;

		if (scrollableHeight === 0) {
			return 0;
		}

		const scrollPercentage = scrollTop / scrollableHeight * 100;

		return Math.round(scrollPercentage);
	}

	handleScroll() {
		const scrollPercentage = this.getScrollPercentage();
		const roundedScrollPercentage = Math.round(scrollPercentage);

		for (let i = 0; i < this.scrollValues.length; i++) {
			const value = this.scrollValues[i];

			if (roundedScrollPercentage >= value && !this.scrollReached.includes(value)) {
				this.scrollReached.push(value);
				this.onScrollReached(value); // то что нужно сделать при достижении цели
			}
		}
	}

	init() {
		window.addEventListener('scroll', this.handleScroll);
	}

	destroy() {
		window.removeEventListener('scroll', this.handleScroll);
		this.scrollReached = [];
	}
}
