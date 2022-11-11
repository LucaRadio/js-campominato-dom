const playBtn = document.querySelector(".btn");

const selectEl = document.querySelector("[name='rowCells']");

const gridContainerEl = document.querySelector(".grid-container");
const score = document.querySelector(".message")

let count = 0;

function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



playBtn.addEventListener("click", function () {
    gridContainerEl.innerHTML = ""
    gridContainerEl.classList.remove("disabled")
    let dimension;
    const option = parseInt(selectEl.value);
    if (option === 10) {
        dimension = 100
    } else if (option === 9) {
        dimension = 81
    } else if (option === 7) {
        dimension = 49
    }
    cellsGenerator(dimension);


})

function cellsGenerator(dimension) {
    let bombPosition = bombGenerator(dimension);
    console.log(bombPosition);
    for (let i = 0; i < dimension; i++) {
        const monoCell = document.createElement("div");
        monoCell.classList.add("cell");
        monoCell.style.width = `calc(100% / ${Math.sqrt(dimension)})`;

        monoCell.dataset.cellNumber = `${i + 1}`;

        let cellNumber = parseInt(monoCell.dataset.cellNumber);
        if (bombPosition.includes(cellNumber)) {
            monoCell.classList.add("bookmark")
        }

        monoCell.addEventListener("click", function () {
            this.classList.add("disabled");
            if (bombPosition.includes(cellNumber)) {
                gridContainerEl.classList.add("disabled")
                this.classList.add("bg-danger")
                for (let j = 0; j < dimension; j++) {
                    let cellsCheck = document.querySelector(`.grid-container :nth-child(${j + 1})`);
                    console.log(cellsCheck);
                    if (cellsCheck.classList.contains("bookmark")) {
                        cellsCheck.classList.replace("bookmark", "bg-danger")
                    }
                }
                alert("Hai Perso!")
            }
            else {
                this.classList.add("bg-primary")
                count++;
                if (count === dimension - 16) {
                    alert("Hai Vinto! Complimenti!")
                }
                score.innerHTML = `Il tuo punteggio e' ${count}`

            }
        });
        gridContainerEl.append(monoCell);
    }





}

function bombGenerator(dimension) {
    let bombList = [];

    while (bombList.length < 16) {
        const bombPosition = randomNumberGenerator(1, dimension);

        if (!bombList.includes(bombPosition)) {
            bombList.push(bombPosition)
        }
    }
    return bombList;
}

