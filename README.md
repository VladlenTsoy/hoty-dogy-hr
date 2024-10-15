# Информация о проекте

Тест: добавляется ссылка на тест

Прод: добавляется ссылка на боевой сайт

# Содержание

1. [Работа со сборкой](#работа-со-сборкой)
	1. [Запуск сервера для разработки](#запуск-сервера-для-разработки)
	2. [Создание билда](#создание-билда)
	3. [Создание билда для прода](#создание-билда-для-прода)
	4. [Линтинг кода](#линтинг-кода)
	6. [Автоматическое создание компонента](#автоматическое-создание-компонента)
	7. [Автоматическое создание страницы](#автоматическое-создание-страницы)
	8. [Конвертация шрифтов](#конвертация-шрифтов)
	9. [Конвертация картинок в формат ``webp`` или ``avif``](#конвертация-картинок-в-формат-webp-или-avif)
	10. [Сжатие картинок ``(png, jpg, gif, webp, avif)``](#сжатие-картинок-png-jpg-gif-webp-avif)
	11. [Архивирование папки ``build``](#архивирование-папки-build)

2. [Работа с проектом](#работа-с-проектом)
	1. [Добавление метатегов](#добавление-метатегов)
	2. [Работа с роутером](#работа-с-роутером)
	3. [Аналитика](#аналитика)
	4. [Компоненты](#компоненты)
		1. [header](#header)
		2. [footer](#footer)
		3. [sharing](#sharing)
		4. [scrollToAnchor](#scrolltoanchor)
		5. [lazyLoad](#lazyload)
		6. [lazyBlur](#lazyblur)
		7. [Swiper slider](#slider)
		8. [videoJs](#videojs)
		9. [dropdown](#dropdown)
		10. [tabs](#tabs)
		11. [popup](#popup)
		12. [form](#form)

3. [Основные моменты и их возможные исправления](#основные-моменты-и-их-возможные-исправления)
	1. [Ошибки линтера PUG](ошибки-линтера-pug)
	2. [Линтер Style](#линтер-style)
	3. [Настройка stylelint для VC Code](#настройка-stylelint-для-vc-code)
	4. [Отмена минификации файла HTML после сборки билда](#отмена-минификации-файла-html-после-сборки-билда)

# Работа со сборкой

за основу взята сборка: [ninelines-template](https://gitlab.linestest.com/ninelines/ninelines-template)

## Старт и Сборка

### Запуск сервера для разработки

```bash
npm run start
```

### Создание билда

```bash
npm run build
```

### Создание билда для прода

```bash
npm run build:prod
```

## Линтинг кода

#### Все сразу

```bash
npm run lint
```

#### Скрипты

```bash
npm run lint:scripts
```

#### Стили

```bash
npm run lint:styles
```

#### Разметка

```bash
npm run lint:pug
```

## Вспомогательные команды

### Автоматическое создание компонента

```bash
npm run create-files <НАЗВАНИЕ ПАПКИ>
```

```bash
npm run create-files <НАЗВАНИЕ ПАПКИ> mixin
```

Компонент - ``npm run create-files <НАЗВАНИЕ ПАПКИ>``. Например: ``npm run create-files header`` - создаст папку ``header`` внутри папки ``src/components``, содержащую следующий список файлов и подпапок: ``images (папка), data.js, header.js, header.pug, header.scss``. Так же автоматически создастся подключение стиля в ``main.scss``, а при указании ``mixin`` создасться подключение в файле ``mixins.pug``

### Автоматическое создание страницы

```bash
npm run create-files <НАЗВАНИЕ ПАПКИ> page
```

Страница - ``npm run create-files <НАЗВАНИЕ ПАПКИ> page``. Например: ``npm run create-files home page`` - создаст папку ``home`` внутри папки ``src/pages``, с аналогичной созданию компонента структурой

### Конвертация шрифтов

```bash
npm run fonts:convert
```

Конвертация шрифтов ``npm run fonts:convert`` - ``(ttf, otf, svg)`` в форматы ``woff`` и ``woff2``. Берет шрифты из папки ``src/assets/fonts`` и преобразует их в указанные выше форматы, с сохранением структуры и исходных форматов

## Конвертация картинок в формат ``webp`` или ``avif``

Конвертация картинок в формат ``webp`` или ``avif``. По умолчанию берет картинки из папок ``src/assets/images``, ``src/components`` и ``src/pages`` и преобразует их в формат ``webp`` с качеством ``90%``

### WebP

```bash
npm run images:convert
```

### AVIF

```bash
npm run images:convert avif
```

### С указанием качества (по умолчанию - ``90`` (в процентах))

```bash
npm run images:convert quality=70
```

### С указанием папки

```bash
npm run images:convert only=<НАЗВАНИЕ ПАПКИ>
```

С указанием папки - ``npm run images:convert only=assets`` (только картинки из папки ``src/assets/images``), ``npm run images:convert only=components`` (только картинки из папки ``src/components``), ``npm run images:convert only=pages`` (только картинки из папки ``src/pages``)

### С указанием необходимого пути

```bash
npm run images:convert path=<ПУТЬ К ПАПКЕ>
```

Например - ``npm run images:convert path=src/pages/home/images/background``

### Сочетание параметров (пример)

```bash
npm run images:convert only=pages avif quality=50
```

## Сжатие картинок ``(png, jpg, gif, webp, avif)``

### Сжатие картинок из папок ``src/assets/images``, ``src/components`` и ``src/pages``

```bash
npm run images:compress
```

### С указанием качества, по умолчанию - ``75`` (в процентах)

```bash
npm run images:compress quality=80
```

### С указанием папки

```bash
npm run images:compress only=<НАЗВАНИЕ ПАПКИ>
```

С указанием папки - ``npm run images:compress only=assets`` (только картинки из папки ``src/assets/images``), ``npm run images:compress only=components`` (только картинки из папки ``src/components``), ``npm run images:compress only=pages`` (только картинки из папки ``src/pages``)

### С указанием необходимого пути

```bash
npm run images:compress path=<ПУТЬ К ПАПКЕ>
```

Например - ``npm run images:compress path=src/components/header/burger``

### Сочетание параметров (пример)

```bash
npm run images:compress only=assets avif quality=65
```

## Архивирование папки ``build``

```bash
npm run zip
```

Создаст архив ``build.zip`` в корневой папке проекта

```bash
npm run zip v=<ВЕРСИЯ>
```

Например: ``npm run zip v=14`` - создаст архив ``build-v14.zip``

```bash
npm run zip name=<ИМЯ>
```

Например: ``npm run zip name=build_19022022`` - создаст архив с именем ``build_19022022.zip``

```bash
npm run clean
```
Удаление папки ``build``

---

Автоматическое удаление файлов из билда для продакшн версии. По умолчанию будет удаляться файл ``robots.txt`` из папки ``build``. Отменить удаление данного файла или добавить другие можно изменяя массив свойства ``build.remove`` внутри файла ``config.js``. Например хотим добавить удаление ``.htaccess`` - ``remove: ['robots.txt'. '.htaccess']``. Или ничего не будем удалять - ``remove: []``. Данное правило будет работать только при условии, что метод ``html.isProd`` будет возвращать ``true``, т.е. только когда собираем сборку командой ``npm run build:prod`` или если поменять его вручную

# Работа с проектом

## Добавление метатегов

Мета теги ``Title``, ``Description``, ``image`` и т.д.  указываются в ``src/data/data.js`` в объекте с ключом страницы (есть пример для 2х страниц).

```javascript
import general from 'general';

const data = {
	general,
	home: {
		meta: {
			title: 'page home',
			description: 'home description',
			image: `${general.baseDir}image/share/share.jpg`,
			keywords: []
		}
	},
	article: {
		meta: {
			title: 'page article',
			description: 'article description',
			image: `${general.baseDir}image/share/share.jpg`,
			keywords: []
		}
	}
};

export default data;
```

## Работа с роутером

Для перехода (без перезагрузки старницы) и анимации используется [Barba JS](https://barba.js.org/).
В ``main.js`` подключен ``router``, а страницы оборачиваются в миксин ``router``, если это не требуется нужно удалить router из кода.

## Аналитика

Компонент счетчиков аналитики (``src/components/analytics/analytics.pug``) подключаются в ``head`` в файле ``base.pug``. Сами счетчики предоставляются отделом аналитики и подключаются в файл ``analytics.pug``, а события настраиваются в файле ``analytics.js``

## Компоненты

### header

описание в процессе...

### footer

описание в процессе...

### sharing

описание в процессе...

### scrollToAnchor

описание в процессе...

### lazyLoad

описание в процессе...

### lazyBlur

описание в процессе...

### Swiper slider

будет позже

### videoJs

будет позже

### dropdown

будет позже

### tabs

будет позже

### popup

будет позже

### form

будет позже

# Основные моменты и их возможные исправления

Для работы настроек проекта из .editorconfig, может потребоваться расширение [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) (для других редакторов пока нет возможности проверить)

## Ошибки линтера PUG

```bash
Invalid line break
```
Если во время проверки линтера при коммите выходит ошибка ``Invalid line break``, а файл был сохранен в правильном формате (LF), то скорее всего git при проверки автоматически конвертирует файлы в СRLF. Чтобы исправить данное поведение воспользуйтесь командой

```bash
git config --global core.autocrlf false
```

## Линтер Style
В файле ``.stylelintrc`` есть правило ``"order/properties-order"``, который отвечает за правильную последовательность свойств в стилях. Старайтесь придерживаться этого правила с самого начала, частые коммиты помогут выявлять ошибки в малых количествах, нежели править сотни ошибок перед пушем в конце дня. Со временем выработается привычка писать сразу правильно

## Настройка stylelint для VC Code
1. Установите расширение [stylelint](https://stylelint.io/)
2. Переходим в ``extention settings`` и находим раздел ``Stylelint: Config``
3. В данном разделе переходим по кнопке ``Edit in settings.json`` и в строчке ``"stylelint.config"`` указываем ``null`` (``"stylelint.config": null,``)

Теперь все ошибки линтера будут отображаться во время работы, что сократит время на правки во время коммита. Правила линтера тянутся из файла `.stylelintrc` для проекта.

## Отмена минификации файла HTML после сборки билда
1. Устанавливаем плагин https://www.npmjs.com/package/beautify-html-webpack-plugin
2. В корне проекта находим файл ``config/common.js``
3. Подключаем плагин
	```javascript
	import BeautifyHtmlWebpackPlugin from 'beautify-html-webpack-plugin';
	```
4. И добавляем его в код после строки ``...plugins.HtmlPages()``. Вместо ``options`` добавляем правила стилизации
	```javascript
	plugins.Dashboard,
    ...plugins.HtmlPages(),
	new BeautifyHtmlWebpackPlugin(options),
    plugins.RemoveFiles,
	```
