export class Hover3D {
  id: string
  xOffset: number
  yOffset: number
  attack: number
  release: number
  perspective: number
  constructor(id: string) {
    this.id = id
    this.xOffset = 1
    this.yOffset = 1
    this.attack = 0.1
    this.release = 0.5
    this.perspective = 300
    this.create()
  }

  create() {
    document.querySelectorAll<HTMLElement>(this.id).forEach((element: HTMLElement) => {
      const rectTransform = element.getBoundingClientRect()
      const perspective = 'perspective(' + this.perspective + 'px) '
      element.style.setProperty('transform-style', 'preserve-3d')

      element.addEventListener('mouseenter', () => {
        element.style.setProperty('transition', 'transform ' + this.attack + 's')
      })

      element.addEventListener('mousemove', (e) => {
        const dy = e.clientY - rectTransform.top
        const dx = e.clientX - rectTransform.left
        const xRot = this.map(dx, 0, rectTransform.width, -this.xOffset, this.xOffset)
        const yRot = this.map(dy, 0, rectTransform.height, this.yOffset, -this.yOffset)
        const propXRot = 'rotateX(' + yRot + 'deg) '
        const propYRot = 'rotateY(' + xRot + 'deg)'

        element.style.setProperty('transform', perspective + propXRot + propYRot)
      })

      element.addEventListener('mouseleave', () => {
        element.style.setProperty('transition', 'transform ' + this.release + 's')
        element.style.setProperty('transform', perspective + 'rotateX(0deg) rotateY(0deg)')
      })
    })
  }
  // Processing map() function
  map(value: number, istart: number, istop: number, ostart: number, ostop: number) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
  }
}
