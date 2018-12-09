var step = 1;
var stepChar = "x";

function main() {
    $("td").each(function() {
        if ($(this).hasClass("x") || $(this).hasClass("o"))
            nextStep();
    });

    

    $('.night-toggle').change(function() {
        if (this.checked)
            $("body").addClass("night");
        else
            $("body").removeClass("night");
    });


    $(".confirm-btn").click(function() {
        if ($(this).hasClass("again")) {
            initGameMap();
            $(this)
                .removeClass("again")
                .removeClass("active");
        } else if ($(this).hasClass("active")) {
            nextStep();
            $(this).removeClass("active");
        }
    });
    $("td").click(function() {
        if (!$(this).hasClass("x") && !$(this).hasClass("o") && !$(this).hasClass("disabled")) {
            if ($(this).hasClass("clicked")) {
                $("td").each(function() {
                    $(this).removeClass("clicked");
                });
                $(".confirm-btn").removeClass("active");
            } else {
                $("td").each(function() {
                    $(this).removeClass("clicked");
                });
                $(this).addClass("clicked");
                $(".confirm-btn").addClass("active");
            }
        }
    });
}

function initGameMap() {
    $("td").each(function() {
        $(this).removeClass().addClass("empty");
        step = 1;
        stepChar = "x";
    });
    $("h1").html("");
    enableGameMap();
}

function stepChange() {
    step++;
    if (stepChar == "x")
        stepChar = "o";
    else
        stepChar = "x";
}

function nextStep() {
    var win = false;
    $("td.clicked")
        .addClass(stepChar)
        .removeClass("clicked empty")
        .removeClass("active");

    if (step > 4 && checkWin(stepChar, gameMapToArray()))
        win = true;
    else if (step == 9) {
        $(".confirm-btn").addClass("again");
        $("h1").html("Ничья!");
        disableGameMap();
    }

    if (win) {
        $(".confirm-btn").addClass("again");
        $("h1").html("Победил игрок " + stepChar.toUpperCase() + "!");
        disableGameMap();
    } else
        stepChange();

}


function disableGameMap() {
    $("td").addClass("disabled");
}

function enableGameMap() {
    $("td").removeClass("disabled");
}

function gameMapToArray() {
    var gameMap = [],
        tmp = [],
        k = 0;

    $("td").each(function(i) {
        tmp[i] = !$(this).hasClass("empty") ? ($(this).hasClass("x") ? "x" : "o") : "";

    });

    for (i = 0; i < 3; i++) {
        gameMap[i] = [];
        for (j = 0; j < 3; j++) {
            gameMap[i][j] = tmp[k];
            k++;
        }
    }
    return gameMap;
}

function checkWin(A, AA) {
    var flag;
    var D = checkD(A, AA);
    var R = checkRows(A, AA);
    var C = checkColumns(A, AA);

    if (D == true || R == true || C == true)
        flag = true;
    else
        flag = false;


    return flag;

}

function checkD(A, AA) {
    var flag = true;
    for (i = 0; i < AA.length; i++) {
        if (AA[i][i] != A) {
            $("td").removeClass("win");
            flag = false;
            break;
        } else {
            $("tr:eq(" + i + ")").children("td:eq(" + i + ")").addClass("win");
        }
    }
    if (flag == false) {
        flag = true;
        for (i = 0; i < AA.length; i++) {
            if (AA[i][AA.length - 1 - i] != A) {
                $("td").removeClass("win");
                flag = false;
                break;
            } else {
                $("tr:eq(" + i + ")").children("td:eq(" + (AA.length - 1 - i) + ")").addClass("win");
            }
        }
    }
    return flag;
}

function checkRows(A, AA) {
    var flag = false;
    for (i = 0; i < AA.length; i++) {
        if (AA[i][0] == A && AA[i][1] == A && AA[i][2] == A) {
            $("tr:eq(" + i + ")").children("td").addClass("win");
            flag = true;
            break;
        }
    }

    return flag;
}

function checkColumns(A, AA) {
    var flag = false;
    for (i = 0; i < AA.length; i++) {
        if (AA[0][i] == A && AA[1][i] == A && AA[2][i] == A) {
            $("tr:eq(" + 0 + ")").children("td:eq(" + i + ")").addClass("win");
            $("tr:eq(" + 1 + ")").children("td:eq(" + i + ")").addClass("win");
            $("tr:eq(" + 2 + ")").children("td:eq(" + i + ")").addClass("win");
            flag = true;
            break;
        }
    }

    return flag;
}


$(document).ready(main);