//Initial references
let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

//Eventos objetos
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = ""; 

//Inicializa o desenhar e apagar como falso 
let draw = false;
let erase = false;

//Dtecta o dispositivo
const isTouchDevice = () => {
    try {
        //Criamos um touch evento que ira falhar em dispositivos que não são touch
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
    deviceType = "mouse";
    return false;
    }
};

isTouchDevice();

//Cria o grid
gridButton.addEventListener("click", () => {
  //Inicializa o apagar grid
    container.innerHTML = "";
  //Variavel para gerar ids unicos 
  let count = 0;
  //Loop para criar as linhas
  for (let i = 0; i < gridHeight.value; i++) {
    //incrementa count com 2
    count += 2;
    //Cria a linha div
    let div = document.createElement("div");
    div.classList.add("gridRow");
    //Crua as colunas
    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      /* Precisamos de ids unicos para cada coluna (principalmente para touchdevice*/
      col.setAttribute("id", `gridCol${count}`);

      col.addEventListener(events[deviceType].down, () => {
        //Usuario comeca a desenhar 
        draw = true;
        //se apagar for verdadeiro background fica transparente, else fica com a cor selecionada
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });
      // eventops para mouse e touch
      col.addEventListener(events[deviceType].move, (e) => {
        /* elementFromPoint returns the element at x,y position of mouse */
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;
        //verifica 
        checker(elementId);
      });
      //Para de desenhar
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });
      //Adiciona a coluna a linha
      div.appendChild(col);
    }
    //Adiciona grid ao container
    container.appendChild(div);
  }
});
function checker(elementId) {
  let gridColumns = document.querySelectorAll(".gridCol");
  //loop por todos os elementos
  gridColumns.forEach((element) => {
    //Se os ids forem iguais e draw for verdadeiro, desenha
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

//Apaga o grid
clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});
//Botao apagar
eraseBtn.addEventListener("click", () => {
  erase = true;
});

//Botao pintar
paintBtn.addEventListener("click", () => {
  erase = false;
});

//Display de altura e largura do gri
gridWidth.addEventListener("input", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
  gridWidth.value = 0;
  gridHeight.value = 0;
};
