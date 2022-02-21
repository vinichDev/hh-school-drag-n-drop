const createSquare = document.querySelector('.create-square');
const dragNDrop = document.querySelector('.drag-n-drop');
const freeField = document.querySelector('.free-field');
const gridField = document.querySelector('.grid-field');

let gridCounter = 0;

createSquare.addEventListener('pointerdown', (event) => {

    const square = document.createElement('div')
    square.classList.add('square');
    square.style.backgroundColor = getRandomColor();
    dragNDrop.append(square);
    let shiftX = event.clientX - square.getBoundingClientRect().left;
    let shiftY = event.clientY - square.getBoundingClientRect().top;

    function moveSquareAtCursorPosition(pageX, pageY) {
        square.style.left = pageX - shiftX + 'px';
        square.style.top = pageY - shiftY + 'px';
    }

    const pointerMoveHandler = (event) => {
        moveSquareAtCursorPosition(event.pageX, event.pageY);
    };
    document.addEventListener('pointermove', pointerMoveHandler);

    const checkAddingSquareToField = (field) => {

        const fieldTop = field.getBoundingClientRect().top;
        const fieldBottom = field.getBoundingClientRect().bottom;
        const fieldLeft = field.getBoundingClientRect().left;
        const fieldRight = field.getBoundingClientRect().right;

        const squareTop = square.getBoundingClientRect().top;
        const squareBottom = square.getBoundingClientRect().bottom;
        const squareLeft = square.getBoundingClientRect().left;
        const squareRight = square.getBoundingClientRect().right;

        return squareTop >= fieldTop
            && squareLeft >= fieldLeft
            && squareBottom <= fieldBottom
            && squareRight <= fieldRight;
    };

    const pointerUpHandler = () => {

        if (checkAddingSquareToField(freeField)) {
            dragNDrop.removeChild(square);
            freeField.append(square);

        } else if (checkAddingSquareToField(gridField) && gridCounter++ < 9) {
            dragNDrop.removeChild(square);
            square.style.position = 'relative';
            square.style.left = null;
            square.style.top = null;
            gridField.append(square);

        } else {
            dragNDrop.removeChild(square);
        }

        document.removeEventListener('pointermove', pointerMoveHandler);
        document.removeEventListener('pointerup', pointerUpHandler);
    };
    document.addEventListener('pointerup', pointerUpHandler);

})

const getRandomColor = () => {
    return '#' + (Math.random().toString(16) + '000000')
        .substring(2, 8)
        .toUpperCase();
}