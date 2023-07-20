
var rows = 4;
var columns = 4;

var currTile;
var blankTile; //blank tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["4", "11", "8", "10", "1", "14", "7", "13", "3","5","2","15", "12","9","6","16"];

window.onload = function() {
  

    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            tile.addEventListener("mouseover", mouseOver);
            tile.addEventListener("mouseout", mouseOut);

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);
           
            

        }
    }
}



function mouseOver() {
    if (isAdjacentToBlankTile(this)) {
        this.style.borderColor = "red";
    }
}

function mouseOut() {
    this.style.borderColor = "black";
}

function dragStart() {
    currTile = this;
    if (isAdjacentToBlankTile(currTile)) {
        this.style.borderColor = "red";
    }
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    currTile.style.borderColor = "black";
}

function dragDrop() {
    blankTile = this;
}

function dragEnd() {
    currTile.style.borderColor = "black";
    if (!blankTile.src.includes("16.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = blankTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r === r2 && c2 === c - 1;
    let moveRight = r === r2 && c2 === c + 1;
    let moveUp = c === c2 && r2 === r - 1;
    let moveDown = c === c2 && r2 === r + 1;


    if (isAdjacentToBlankTile(currCoords)) {
        let currImg = currTile.src;
        let otherImg = blankTile.src;

        currTile.src = otherImg;
        blankTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}

function isAdjacentToBlankTile(tile) {
    let currCoords = tile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let blankCoords = blankTile.id.split("-");
    let r2 = parseInt(blankCoords[0]);
    let c2 = parseInt(blankCoords[1]);

    let moveLeft = r === r2 && c2 === c - 1;
    let moveRight = r === r2 && c2 === c + 1;
    let moveUp = c === c2 && r2 === r - 1;
    let moveDown = c === c2 && r2 === r + 1;


    return moveLeft || moveRight || moveUp || moveDown;
}
