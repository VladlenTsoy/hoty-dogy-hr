let scrollDiv;

export const getScrollbarWidth = (ignore = false) => {
	const width = window.innerWidth - document.documentElement.clientWidth;

	if ((width || document.documentElement.clientHeight >= document.documentElement.offsetHeight) && !ignore) {
		return width;
	}

	if (!scrollDiv) {
		scrollDiv = document.createElement('div');
		scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
		document.body.appendChild(scrollDiv);
	}

	return scrollDiv.offsetWidth - scrollDiv.clientWidth;
};
