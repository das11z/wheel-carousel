const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const $pre = $('.carousel .arrow-pre')
const $next = $('.carousel .arrow-next')
const $$indicators = $$('.carousel .indicators > li')
const $$panels = $$('.carousel .panels > a')

const getIndex = () => [...$$indicators].indexOf($('.carousel .indicators .active'))
const getPreIndex = () => (getIndex() - 1 + $$indicators.length) % $$indicators.length
const getNextIndex = () => (getIndex() + 1) % $$indicators.length

const setPage = index => {
	$$panels.forEach($panel => $panel.classList.remove('active'))
	$$panels[index].classList.add('active')
}

const setIndicator = index => {
	$$indicators.forEach($indicator => $indicator.classList.remove('active'))
	$$indicators[index].classList.add('active')
}

$pre.onclick = function() {
	let index = getPreIndex()
	setPage(index)
	setIndicator(index)
}

$next.onclick = function() {
	let index = getNextIndex()
	setPage(index)
	setIndicator(index)
}

$$indicators.forEach($indicator => $indicator.onclick = function(e) {
	let index = [...$$indicators].indexOf(e.target)
	setIndicator(index)
	setPage(index)
})
