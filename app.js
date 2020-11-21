window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas")
    const context = canvas.getContext('2d')
    const clearBtn = document.querySelector('.clear')
    const pens = document.querySelectorAll('.pen')
    const colors = document.querySelectorAll('.color')
    const toolsHeight = document.querySelector('.tools').clientHeight

    canvas.height = window.innerHeight - toolsHeight
    canvas.width = window.innerWidth 

    let painting = false
    let penSize = 5
    let penColor = 'black'

    const startDraw = (e) => {
        painting = true 
        draw(e)
    }
    const endDraw = () => {
        painting = false
        context.beginPath()
    }

    const draw = (e) => {
        if(!painting) return;
        context.lineWidth = penSize;
        context.lineCap = 'round'
        context.strokeStyle = penColor

        context.lineTo(e.clientX, e.clientY - toolsHeight)
        context.stroke()
        context.beginPath()
        context.moveTo(e.clientX, e.clientY - toolsHeight)
    }

    const clear = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }


    const handlePenChange = (e) => {
        switch(e.target.classList[1]){
            case 'small':
                penSize = 5
                break
            case 'medium':
                penSize = 10 
                break
            case 'large':
                penSize = 15
                break
        }
        document.querySelector('.activePen').classList.remove('activePen')
        e.target.classList.add('activePen')
    }

    const handleColorChange = (e) => {
        document.querySelector('.activeColor').classList.remove('activeColor')
        penColor = e.target.classList[1]
        e.target.classList.add('activeColor')
    }

    canvas.addEventListener("mousedown", startDraw)
    canvas.addEventListener("mouseup", endDraw)
    canvas.addEventListener("mousemove", draw)
    clearBtn.addEventListener('click', clear)

    pens.forEach(pen => {
        pen.addEventListener('click', handlePenChange)
    })
    colors.forEach(color => {
        color.addEventListener('click', handleColorChange)
    })
})