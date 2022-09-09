let colors = {
  2: "#570A57",
  4: "#FF9232",
  8: "#395B64",
  16: "#29D0D0",
  32: "#AE2323",
  64: "#8126C0",
  128: "#81C57A",
  256: "#FF0000",
  512: "#814A19",
  1024: "#2A4BD7",
  2048: "#000000",
};

let tiles = document.querySelector(".tiles");

for (let index = 0; index < 16; index++) {
  let div = document.createElement("div");
  tiles.appendChild(div);
}

let divs = document.querySelectorAll(".tiles div");

let F = 0;
Array.from(divs).forEach((div, i) => {
  if (Math.round(Math.random() * 1) === 0 && F < 2 && !div.firstChild) {
    F += 1;
    let span = document.createElement("span");
    span.innerText = Math.round(Math.random() * 1) === 1 ? "2" : "4";
    span.style.backgroundColor = colors[Number(span.innerText)];
    span.style.transform = "scale(0)";
    setTimeout(() => (span.style.transform = "scale(1)"), 500);
    div.appendChild(span);
  }
});

function insert() {
  let F = 0;
  Array.from(divs).forEach((div, i) => {
    if (Math.round(Math.random() * 1) === 0 && F < 1 && !div.firstChild) {
      F += 1;
      let span = document.createElement("span");
      span.innerText = Math.round(Math.random() * 1) === 1 ? "2" : "4";
      span.style.backgroundColor = colors[Number(span.innerText)];
      span.style.transform = "scale(0)";
      setTimeout(() => (span.style.transform = "scale(1)"), 200);
      div.appendChild(span);
    }
  });
}

class Tiles {
  constructor(e, span, i, div) {
    this.e = e;
    this.span = span;
    this.i = i;
    this.div = div;
  }
  static N_ = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
  static M_ = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
  static moded = [];

  move() {
    if (this.e.key === "ArrowRight") {
      this.insertandremove1(this.i, 1);
    } else if (this.e.key === "ArrowLeft") {
      this.insertandremove1(this.i, -1);
    } else if (this.e.key === "ArrowUp") {
      this.insertandremove2(this.i, -1);
    } else if (this.e.key === "ArrowDown") {
      this.insertandremove2(this.i, 1);
    }
  }

  insertandremove1(i, n) {
    let add = false;
    let N = 0;
    if (n === 1) {
      let k = Tiles.N_[i];
      if (k !== 3) {
        let s = i;
        // console.log(Tiles.N_[i]);
        for (let index = Tiles.N_[i] + 1; index < 4; index++) {
          s++;
          if (divs[s].firstChild) {
            if (
              Number(divs[s].firstChild.innerText) ===
                Number(divs[i].firstChild.innerText) &&
              !Tiles.moded.includes(s)
            ) {
              add = true;
              N++;
              Tiles.moded.push(s);
            }
            break;
          }
          N++;
        }
      }
    } else if (n === -1) {
      let k = Tiles.N_[i];
      if (k !== 0) {
        let s = i;
        // console.log(Tiles.N_[i]);
        for (let index = Tiles.N_[i] - 1; index > -1; index--) {
          s--;
          if (divs[s].firstChild) {
            if (
              Number(divs[s].firstChild.innerText) ===
                Number(divs[i].firstChild.innerText) &&
              !Tiles.moded.includes(s)
            ) {
              add = true;
              N--;
              Tiles.moded.push(s);
            }
            break;
          }
          N--;
        }
      }
    }
    this.div.removeChild(this.span);
    let span = document.createElement("span");
    span.innerText = this.span.innerText;
    if (!add) {
      span.style.backgroundColor = colors[Number(span.innerText)];
      divs[i + N].appendChild(span);
    } else {
      setTimeout(
        () => (divs[i + N].firstChild.style.transform = "scale(1.2)"),
        200
      );
      setTimeout(
        () => (divs[i + N].firstChild.style.transform = "scale(1)"),
        500
      );
      divs[i + N].firstChild.style.backgroundColor =
        colors[Number(span.innerText) * 2];
      divs[i + N].firstChild.innerText = `${Number(span.innerText) * 2}`;
    }
  }
  insertandremove2(i, n) {
    let add = false;
    let N = 0;
    if (n === 1) {
      let k = Tiles.M_[i];
      if (k !== 3) {
        let s = i;
        // console.log(s);
        for (let index = Tiles.M_[i] + 1; index < 4; index++) {
          s += 4;
          if (divs[s].firstChild) {
            if (
              Number(divs[s].firstChild.innerText) ===
                Number(divs[i].firstChild.innerText) &&
              !Tiles.moded.includes(s)
            ) {
              add = true;
              N++;
              Tiles.moded.push(s);
            }
            break;
          }
          N++;
        }
      }
    } else if (n === -1) {
      let k = Tiles.M_[i];
      if (k !== 0) {
        let s = i;
        // console.log(s);
        for (let index = Tiles.M_[i] - 1; index > -1; index--) {
          s -= 4;
          if (divs[s].firstChild) {
            if (
              Number(divs[s].firstChild.innerText) ===
                Number(divs[i].firstChild.innerText) &&
              !Tiles.moded.includes(s)
            ) {
              add = true;
              N--;
              Tiles.moded.push(s);
            }
            break;
          }
          N--;
        }
      }
    }
    this.div.removeChild(this.span);
    let span = document.createElement("span");
    span.innerText = this.span.innerText;
    span.style.backgroundColor = colors[Number(span.innerText)];
    if (!add) {
      span.style.backgroundColor = colors[Number(span.innerText)];
      divs[i + 4 * N].appendChild(span);
    } else {
      setTimeout(
        () => (divs[i + 4 * N].firstChild.style.transform = "scale(1.2)"),
        200
      );
      setTimeout(
        () => (divs[i + 4 * N].firstChild.style.transform = "scale(1)"),
        500
      );
      divs[i + 4 * N].firstChild.style.backgroundColor =
        colors[Number(span.innerText) * 2];
      divs[i + 4 * N].firstChild.innerText = `${Number(span.innerText) * 2}`;
    }
  }
}

window.onkeydown = (e) => {
  Tiles.moded.length = 0;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    for (let index = divs.length - 1; index >= 0; index--) {
      const div = divs[index];
      setTimeout(() => {
        if (div.firstChild) {
          let tile = new Tiles(e, div.firstChild, index, div);
          tile.move();
        }
      }, 100);
    }
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    divs.forEach((div, i) => {
      setTimeout(() => {
        if (div.firstChild) {
          let tile = new Tiles(e, div.firstChild, i, div);
          tile.move();
        }
      }, 100);
    });
  }
  setTimeout(() => insert(), 200);
};
