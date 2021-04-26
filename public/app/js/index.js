// JavaScript for AWE.write 1.x

/*
 * localStorage-Variablen:
 * 
 * awe.save, boolean, ob Speicherstand vorhanden
 * awe.fontface, string, Schriftart
 * awe.fontsize, int, Schriftgröße
 * awe.splitter, int, Splitterposition
 * awe.themeid, string, ID des Themes
 * awe.text.left, string, linker Text
 * awe.text.right, string, rechter Text
 *
 */


// Menüleistenfunktionen

// DATA

function clearTexts () {
	document.getElementById('leftTextarea').value = ''
	document.getElementById('rightTextarea').value = ''

	saveTexts()
	updateWordCounter()
}

function switchTexts () {
	const leftText = document.getElementById('leftTextarea').value

	document.getElementById('leftTextarea').value = document.getElementById('rightTextarea').value
	document.getElementById('rightTextarea').value = leftText

	saveTexts()
	updateWordCounter()
}

function setSpellcheck (value) {
	const spellcheckInput = $('#spellcheck')
	const spellcheck = value !== undefined
		? value
		: spellcheckInput.prop('checked') ? 'true' : 'false'

	if (spellcheck === 'true' && !spellcheckInput.prop('checked')) {
		spellcheckInput.prop('checked', true)
	}

	$('textarea').attr('spellcheck', spellcheck)
	localStorage.setItem('awe.spellcheck', spellcheck)
}


// FONT

function changeFontface (font) {
	const fontFamilies = {
		'IBM Plex Sans': () => '"IBM Plex Sans", sans-serif',
		'IBM Plex Serif': () => '"IBM Plex Serif", serif',
		'IBM Plex Mono': () => '"IBM Plex Mono", sans-serif',
		'Kalam': () => '"Kalam", cursive',
	}

	const fontFamily = fontFamilies[font]()

	$('textarea').css('font-family', fontFamily)
	localStorage.setItem('awe.fontface', fontFamily)
}

function changeFontsize (size) {
	if (size >= 10 && size <= 24) {
		document.getElementById('toolbar_fontsize').innerHTML = size
		$('textarea').css('font-size', size + 'px')
	}
	
	localStorage.setItem('awe.fontsize', size)
}


// THEMES

function changeTheme (selectionId, isDarkTheme) {
	const $body = $('body')
	const $textarea = $('textarea')
	const $selectedElement = $('#' + selectionId)
	const theme_type = selectionId.substr(6, 5)
	let background, color

	$body.css('background-image', 'none')
	$body.css('background-color', 'transparent')

	switch (theme_type) {
		case 'color':
			background = $selectedElement.css('background-color')
			$body.css('background-color', background)
		
			color = $selectedElement.css('color')
			$textarea.css('color', color)
			break

		case 'image':
		case 'photo':
		case 'apprx':
			background = $selectedElement.css('background-image')
			$body.css('background-image', background.replace(/_thumb/, ''))
			
			color = $selectedElement.css('color')
			$textarea.css('color', color)
			break
	}

	$body.toggleClass('light-theme', !isDarkTheme)
	
	localStorage.setItem('awe.themeid', selectionId)
	localStorage.setItem('awe.darkTheme', isDarkTheme ? 'true' : 'false')
}

function moveSplitter (position) {
	if (position >= -3 && position <= 3) {
		let left

		switch (position) {
			case -3:
				left = 1
				break
			case -2:
				left = 20
				break
			case -1:
				left = 35
				break
			case  0:
				left = 50
				break
			case  1:
				left = 65
				break
			case  2:
				left = 80
				break
			case  3:
				left = 99
				break
		}
		
		right = 100 - left
		
		$(function () {
			$('#leftBox').show('fade', 500)
			$('#rightBox').show('fade', 500)

			if (right == 99) {
				$('#leftBox').hide('fade', 500)
			} else if (left == 99) {
				$('#rightBox').hide('fade', 500)
			}

			$('#leftBox').css('right', right + '%')
			$('#rightBox').css('left', left + '%')
		})
	
		localStorage.setItem('awe.splitter', position)
	}
}

function changeTextWidth (width) {
	let $textareas = $('textarea')

	switch (width) {
		case 'full':
			$textareas.css('max-width', 'initial')
			break
		case 'narrow':
			$textareas.css('max-width', '35em')
			break
		case 'wide':
			$textareas.css('max-width', '45em')
			break
	}

	localStorage.setItem('awe.textwidth', width)
}


// Initialisierung beim Start

function fontfaceNumber (font) {
	switch (font) {
    case '"IBM Plex Sans", sans-serif':
      return 0;
    case '"IBM Plex Serif", serif':
      return 1;
    case '"IBM Plex Mono", sans-serif':
      return 2;
    case '"Kalam", cursive':
      return 3;
    default:
      return -1;
  }
}

function textwidthNumber (textwidth) {
	switch (textwidth) {
		case 'narrow': return 0
		case 'wide': return 1
		case 'full': return 2
		default: return -1
	}
}

function checkLocalStorage () {
	let LSstatus = true

	if (!('localStorage' in window) || window.localStorage === null) {
		LSstatus = false
		alert(`
			Sorry, your browser doesn't support localStorage.
			I. e. your texts and settings cannot be saved.
			To save your data please use an up-to-date browser. Thanks!`)
	}
	

	// Wenn localStorage verfügbar aber noch leer, dann mit Standardwerten initialisieren.
	if (LSstatus && localStorage.getItem('awe.save') !== 'true') {
		localStorage.setItem('awe.save', true)
		localStorage.setItem('awe.fontface', '"IBM Plex Sans", sans-serif')
		localStorage.setItem('awe.fontsize', 16)
		localStorage.setItem('awe.splitter', 0)
		localStorage.setItem('awe.textwidth', 'narrow')
		localStorage.setItem('awe.themeid', 'theme_color_blue')
		localStorage.setItem('awe.darkTheme', 'true')
		localStorage.setItem('awe.spellcheck', 'true')
		localStorage.setItem('awe.text.left', '↑ Here are your settings.\n\nYou can use them to tweak the look and feel of AWE.write.')
		localStorage.setItem('awe.text.right', 'Welcome to AWE.write. Just enter or paste some text in any of the two panels.\n\nHappy texting :)')
	}
}

function loadSettings () {
	let buttonIndex

	// FONT FAMILY
	$('textarea').css('font-family', localStorage.getItem('awe.fontface'))
	buttonIndex = fontfaceNumber(localStorage.getItem('awe.fontface'))

	if (buttonIndex == -1) { buttonIndex = 0 }

	document.getElementsByName('fontface')[buttonIndex].click()

	// TEXT WIDTH
	changeTextWidth(localStorage.getItem('awe.textwidth'))
	buttonIndex = textwidthNumber(localStorage.getItem('awe.textwidth'))

	if (buttonIndex == -1) { buttonIndex = 0 }

	document.getElementsByName('textwidth')[buttonIndex].click()

	const darkThemeValue = localStorage.getItem('awe.darkTheme')
	const isDarkTheme = darkThemeValue !== 'false'

	changeFontsize(localStorage.getItem('awe.fontsize'))
	moveSplitter(parseInt(localStorage.getItem('awe.splitter')))
	changeTheme(localStorage.getItem('awe.themeid'), isDarkTheme)
	setSpellcheck(localStorage.getItem('awe.spellcheck'))
	document.getElementById('leftTextarea').value = localStorage.getItem('awe.text.left')
	document.getElementById('rightTextarea').value = localStorage.getItem('awe.text.right')
}

function onTextareaInput () {
	saveTexts()
	updateWordCounter()
}

function saveTexts () {
	localStorage.setItem('awe.text.left', document.getElementById('leftTextarea').value)
	localStorage.setItem('awe.text.right', document.getElementById('rightTextarea').value)
}

function updateWordCounter () {
	const counterElement = $('#word-counter')
	const leftCounter = getWordCount($('#leftTextarea').val())
	const rightCounter = getWordCount($('#rightTextarea').val())

	counterElement.text('Words: ' + leftCounter.toLocaleString() + ' / ' + rightCounter.toLocaleString())
}

function getWordCount (text) {
	return (text.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length
}

function supportTab (e) {
	if (e.keyCode === 9) {
		const start = this.selectionStart
		const end = this.selectionEnd
		const $this = $(this)
		$this.val($this.val().substring(0, start) + '\t' + $this.val().substring(end))
		this.selectionStart = this.selectionEnd = start + 1
		return false
	}
}

function refreshClock () {
	const now = new Date()
	const hours = now.getHours()
	const minutes = now.getMinutes()
	const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`

	document.getElementById('clock').innerHTML = time
}

function init () {
	checkLocalStorage()
	loadSettings()
	refreshClock()
	setInterval(refreshClock, 5000)
	updateWordCounter()
}


// Toolbar

function shrinkToolbar () {
	document.getElementById('toolbar').style.height = '40px'
	document.getElementById('sidebar').style.top = '40px'
	$('.toolbar_line_all').hide()
	closeSidebar()
}

function expandToolbar (toolbarSection) {
	const sectionId = `toolbar_line_${toolbarSection}`
	const $section = $(`#${sectionId}`)

	if ($section.is(':visible')) {
		shrinkToolbar()
	} else {
		document.getElementById('toolbar').style.height = '80px'
		document.getElementById('sidebar').style.top = '80px'
	
		$('.toolbar_line_all').hide()
		$section.show()
		closeSidebar()
	}
}


// Sidebar

function closeSidebar () {
	document.getElementById('sidebar').style.width = '0'
	document.getElementById('sidebar').style.borderRightWidth = '0px'
	
	$('.sidebar_content').hide('fade', 300)
}

function openSidebar (sidebarName) {
	const sidebarId = `sidebar_${sidebarName}`
	const $sidebar = $(`#${sidebarId}`)

	if ($sidebar.is(':hidden')) {
		document.getElementById('sidebar').style.width = '300px'
		document.getElementById('sidebar').style.borderRightWidth = '1px'

		$('.sidebar_content').hide()
		$sidebar.show('fade', 300)
	}
}


function globalKeys (e) {
	if (e.keyCode === 27) { shrinkToolbar() }
}

$('html').on({ keydown: globalKeys })
$('#leftTextarea, #rightTextarea').on({ keydown: supportTab })