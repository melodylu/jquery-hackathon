var globalAnswer = '';

$(document).ready(function() {
    var wideArrColors = [];
    var canvas = $('div.container');
    var theAnswer = '';
    var rainbowSize = 5;
    var score = 0;

    // run color game by calling my functions!
    makeAndHideDivs();
    buildNewRound();

    // game logic
    function buildNewRound() {

        // populate wideArrColors array
        _.times(rainbowSize, function(index) {
            wideArrColors.push(newColor());
        });

        // produce the answer
        theAnswer = wideArrColors[_.random(0, rainbowSize - 1)];

        // make buttons
        _.each(wideArrColors, function(element, index, list) {
            var myDiv = $('<div>' + +'</div>');
            myDiv.attr('id', element);
            myDiv.addClass('choiceBtn');
            myDiv.css('background-color', element)
            myDiv.appendTo(canvas);

        });

        // put some game logic on them buttons
        $('.choiceBtn').on('click', function(event) {
            if ($(this).attr('id') === theAnswer) {
                $(this).addClass('glow');
                $('#youWin').show(10, function() {
                    score++;
                    anywhereClickReset();
                });
            } else {
                $('#youLose').show(10, function() {
                	$('.secretWinner').addClass('sadGlow');
                    anywhereClickReset();
                });
            }
        });

        // add this class the old-school way with DOM selectors so that I can finally go to sleep without jQuery and Sizzle exploding about how rgba(blah, blah, blah) looks like an invalid script injection
		var temp = document.getElementById(theAnswer);
		$(temp).addClass('secretWinner');
        
        // end button generation

        // make a pretty awesome header with hinted colors
        var answerColors = theAnswer.split(', ');
        answerColors[0] = answerColors[0].slice(5);
        answerColors[3] = answerColors[0].slice(0, -1);

        var displayAnswer = $('<div>rgb(' + '<div class="colorBar"><span class="red">' + answerColors[0] + '</span></div>, ' + '<span class="green">' + answerColors[1] + '</span>, ' + '<span class="blue">' + answerColors[2] + '</span>' + ')</div>');
        // demo color: "rgba(202, 67, 118, 1)""

        displayAnswer.attr('id', 'theAnswer');
        displayAnswer.addClass('gameTalk');
        canvas.prepend(displayAnswer);

        // update score
        if (score) {
            $('#scoreDisplay').text(score);
        }

 $('span.red').css('padding-top', Math.floor(answerColors[0]*100/255));
 $('span.green').css('padding-top', Math.floor(answerColors[1]*100/255));
 $('span.blue').css('padding-top', Math.floor(answerColors[2]*100/255));

    } // end buildNewRound()




    // helper functions
    function newColor() {
        var color = 'rgba(' + _.random(0, 255) + ', ' + _.random(0, 255) + ', ' + _.random(0, 255) + ', ' + '1)';
        return color;
    }

    // only doing this once these are popups that stay hidden unless needed
    function makeAndHideDivs() {
        var displayWin = $('<div><p>You win!</p></div>');
        displayWin.attr('id', 'youWin');
        displayWin.addClass('gameTalk popup');
        canvas.prepend(displayWin);

        var displayLose = $('<div><p>Alas!</p></div>');
        displayLose.attr('id', 'youLose');
        displayLose.addClass('gameTalk popup');
        canvas.prepend(displayLose);

        var score = $('<div><p>Score:<span id="scoreDisplay">0</span></p></div>');
        score.attr('id', 'score');
        score.addClass('gameTalk');
        $('.footer').append(score);

        displayWin.hide();
        displayLose.hide();
    }

    function anywhereClickReset() {
        $('body').on('click', function() {
            $('#youWin').hide();
            $('#youLose').hide();
            $('#theAnswer').remove();
            $('.choiceBtn').remove();

            wideArrColors = [];
            theAnswer = '';
            buildNewRound();
            $('body').unbind();

        });
    }
globalAnswer = theAnswer;
});


// rgb historgram display, which you can turn on and off for "beginner" mode?
// answer hinted in very faint white at bottom?
