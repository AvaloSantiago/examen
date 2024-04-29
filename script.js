document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll('.container button');
    var sequence = [];
    var level = 1;

    document.querySelector('.myButton').addEventListener('click', empezarJuego);

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            var color = button.style.backgroundColor;
            opacidad(button);
            setTimeout(function() {
                button.style.opacity = '1';
            }, 500);
            checkColor(color);
        });
    });

    function empezarJuego() {
        sequence = [];
        level = 1;
        siguienteNivel();
    }

    function siguienteNivel() {
        var colors = ["red", "blue", "yellow", "green"];
        sequence.push(colors[Math.floor(Math.random() * 4)]);
        playSequence();
    }

    function playSequence() {
        disableButtons();
        var i = 0;
        var interval = setInterval(function() {
            if (i < sequence.length) {
                var button = getButtonByColor(sequence[i]);
                opacidad(button);
                setTimeout(function() {
                    button.style.opacity = '1';
                }, 500);
                i++;
            } else {
                clearInterval(interval);
                enableButtons();
            }
        }, 1000);
    }
    
    function opacidad(button) {
        button.style.opacity = '0.5';
        setTimeout(function() {
            button.style.opacity = '1';
        }, 500);
    }

    function getButtonByColor(color) {
        return document.querySelector('.container button[style="background-color: ' + color + ';"');
    }

    function checkColor(color) {
        if (color === sequence[level - 1]) {
            level++;
            if (level > sequence.length) {
                setTimeout(siguienteNivel, 1000);
            }
        } else {
            alert('¡Perdiste! Nivel alcanzado: ' + (level - 1));
            empezarJuego();
        }
    }
    
    function disableButtons() {
        buttons.forEach(function(button) {
            button.disabled = true;
        });
    }

    function enableButtons() {
        buttons.forEach(function(button) {
            button.disabled = false;
        });
    }

});
