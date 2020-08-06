
const css = ($node, cssObj) => Object.assign($node.style, cssObj)

const Animation = {
	slide($from, $to, direction) {
		$from.style = ''
		$to.style = ''
		css($from, {
			transform: `translateX(0)`,
			zIndex: 2
		})
		css($to, {
			transform: `translateX(${direction === 'right'? '-' : ''}100%)`,
			zIndex: 2
		})

		setTimeout(() => {
			css($from,{
				transform: `translateX(${direction === 'left' ? '-' : ''}100%)`,
				transition: `all .4s`
			})
			css($to, {
				transform: `translateX(0)`,
				transition: `all .4s`
			})  
		})
	},

	fade($from, $to) {
		$from.style = ''
		$to.style = ''

		css($from, {
			opacity: 1,
			zIndex: 2
		})

		css($to, {
			opacity: 0,
			zIndex: 1
		})

		setTimeout(() => {
			css($from, {
				opacity: 0,
				zIndex: 2,
				transition: `all .4s`
			})
			css($to, {
				opacity: 1,
				zIndex: 1,
				transition: `all .4s`
			})
		})
		setTimeout(() => {
			css($from, {
				zIndex: 1
			})
			css($to, {
				zIndex: 2
			}), 400
		})
	},

	zoom($from, $to) {
		$from.style = ''
		$to.style = ''

		css($from, {
			transform: `scale(1)`,
			opacity: 1,
			zIndex: 2
		})

		css($to, {
			transform: `scale(10)`,
			opacity: 0,
			zIndex: 1
		})

		setTimeout(() => {
			css($from, {
				transform: `scale(10)`,
				opacity: 0,
				zIndex: 2,
				transition: `all .4s`
			})
			css($to, {
				opacity: 1,
				transform: `scale(1)`,
				zIndex: 1,
				transition: `all .4s`
			})
		})
		setTimeout(() => {
			css($from, {
				zIndex: 1
			})
			css($to, {
				zIndex: 2
			})  
		}, 400)
	}
}

class Carousel {
	constructor($root, animation) {
		this.$root = $root
		this.$pre = $root.querySelector('.prev')
		this.$next = $root.querySelector('.next')
		this.$$indicators = $root.querySelectorAll('.dots > span' )
		this.$$panels = $root.querySelectorAll('.panl > div')
		this.animation = animation

		this.bind()
	}

	bind() {
		this.$pre.onclick = () => {
			let fromIndex = this.getIndex()
			let toIndex = this.getPreIndex()
			this.setIndicator(toIndex)
			this.setPage(fromIndex, toIndex, 'right')
		}

		this.$next.onclick = () => {
			let fromIndex = this.getIndex()
			let toIndex = this.getNextIndex()
			this.setIndicator(toIndex)
			this.setPage(fromIndex, toIndex, 'left')
		}

		this.$$indicators.forEach($indicator => $indicator.onclick = (e) =>{
			let fromIndex = this.getIndex()
			let toIndex = Array.from(this.$$indicators).indexOf(e.target)
			let direction = fromIndex > toIndex ? 'right' : 'left' 
			this.setPage(fromIndex, toIndex, direction)
			this.setIndicator(toIndex)
		})
	}
	getIndex() {
		return [...this.$$indicators].indexOf(this.$root.querySelector('.dots .active'))
	}

	getPreIndex() {
		return (this.getIndex() - 1 + this.$$panels.length) % this.$$panels.length
	}

	getNextIndex() {
		return (this.getIndex() + 1) % this.$$panels.length
	}

	setPage(fromIndex, toIndex, direction) {
		this.animation(this.$$panels[fromIndex], this.$$panels[toIndex], direction)
	}
	setIndicator(index) {
		this.$$indicators.forEach($indicator => $indicator.classList.remove('active'))
		this.$$indicators[index].classList.add('active')
	}

	setAnimation(animation) {
		this.animation = animation
	}
}

let $carousel = document.querySelector('.carousel')
let carousel = new Carousel ($carousel, Animation.zoom)

document.querySelectorAll('.list > button').forEach(item => item.onclick = function () {
	carousel.setAnimation(Animation[this.innerText])
})
