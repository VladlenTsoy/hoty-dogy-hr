/* globals GLOBAL_DOMAIN, GLOBAL_PATH */

const domain = GLOBAL_DOMAIN;
const baseDir = GLOBAL_PATH;

export default {
	domain,
	baseDir,
	title: 'BEFIT NUTRITION',
	description: 'Мы создали линейку продуктов, чтобы поддерживать вас на пути к новым достижениям. Каждый продукт BEFIT NUTRITION разработан для вашего максимального результата — будь то энергия, здоровье или восстановление.',
	share: {
		default: {
			title: '',
			description: '',
		},
		custom: {
			title: '',
			description: ''
		}
	},
	keywords: '',
	image: '',
	link: {
		appleTouchIcon180x180: `${baseDir}favicon/apple-touch-icon.png`,
		icon32x32: `${baseDir}favicon/favicon-32x32.png`,
		icon192x192: `${baseDir}favicon/android-chrome-192x192.png`,
		icon16x16: `${baseDir}favicon/favicon-16x16.png`,
		icon: `${baseDir}favicon/favicon.ico`,
	},
	meta: {
		msapplicationTileColor: '#2d89ef',
		// msapplicationTileImage: `${baseDir}favicon/mstile-144x144.png`,
		// msapplicationConfig: `${baseDir}browserconfig.xml`,
		themeColor: '#ffffff',
		ogImageType: 'image/jpeg',
		// ogImageHeight: 600, // Размеры изображения шеринга
		// ogImageWidth: 1200, // Размеры изображения шеринга
	},
};
