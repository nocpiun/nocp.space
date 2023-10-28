/**
 * Function Painting
 * 
 * @author NriotHrreion
 * Copyright (c) NriotHrreion 2021
 */

/** @type {HTMLInputElement} */
var input = document.getElementById("input");
/** @type {HTMLCanvasElement} */
var output = document.getElementById("output");
var position_output = document.getElementById("position");
/** @type {HTMLButtonElement} */
var btn_draw = document.getElementById("btn_draw");
/** @type {HTMLButtonElement} */
var btn_clear = document.getElementById("btn_clear");
/** @type {HTMLInputElement} */
var cb_savemode = document.getElementById("cb_savemode");

class Painting {
    constructor() {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = output.getContext("2d");
        this.isSaveMode = false;
        this.init();
    }

    init() {
        this.reset();

        if(window.location.search.indexOf("?fx=") != -1) {
            var fx = window.location.search.replace("?fx=", "");

            input.value = fx;
            this.draw();
        }

        btn_draw.addEventListener("click", () => this.draw());
        btn_clear.addEventListener("click", () => this.reset(false));
        cb_savemode.addEventListener("change", () => {
            this.isSaveMode = cb_savemode.checked;
        });
        output.addEventListener("mousemove", (e) => {
            position_output.innerText = "Position: "+ this.getPosition((e.pageX || e.clientX + document.body.scrollLeft) - parseInt(e.target.offsetLeft), (e.pageY || e.clientY + document.body.scrollTop) - parseInt(e.target.offsetTop));
        });
        output.addEventListener("mouseleave", () => {
            position_output.innerText = "";
        });
    }

    reset(s) {
        input.focus();
        if(!s) {
            output.width = output.width; // clear canvas
        }

        // grid
        this.ctx.strokeStyle = "#52555C";
        for(let i = 1; i <= 5; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * (output.height / 6));
            this.ctx.lineTo(output.width, i * (output.height / 6));
            this.ctx.stroke();
        }
        for(let i = 1; i <= 5; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * (output.width / 6), 0);
            this.ctx.lineTo(i * (output.width / 6), output.height);
            this.ctx.stroke();
        }

        // x y
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.moveTo(0, output.height / 2);
        this.ctx.lineTo(output.width, output.height / 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(output.width / 2, 0);
        this.ctx.lineTo(output.width / 2, output.height);
        this.ctx.stroke();

        // text
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "13pt Consolas";
        this.ctx.fillText("y", 226, 12);
        this.ctx.fillText("x", 427, 235);
    }

    draw() {
        var formula = window.$parser(input.value);
        this.reset(this.isSaveMode);

        if(!formula) {
            input.value = "";
            alert("Cannot parse this function! :(");
            return;
        }
        
        for(let x = -217; x <= 217; x += 0.01) {
            var y = eval(formula);
            this.paint(x, y);
        }
    }

    paint(x, y) {
        var posX = this.toCtxPosition(x, y)[0];
        var posY = this.toCtxPosition(x, y)[1];

        this.ctx.beginPath();
        this.ctx.moveTo(posX, posY);
        this.ctx.lineTo(posX + 1, posY + 1);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(posX + 1, posY);
        this.ctx.lineTo(posX, posY + 1);
        this.ctx.stroke();
    }

    getPosition(ctxX, ctxY) {
        var halfWidth = output.width / 2;
        var halfHeight = output.height / 2;

        return [ctxX - halfWidth, halfHeight - ctxY];
    }

    toCtxPosition(posX, posY) {
        var halfWidth = output.width / 2;
        var halfHeight = output.height / 2;

        return [posX + halfWidth, halfHeight - posY];
    }
}

var painting = new Painting();
