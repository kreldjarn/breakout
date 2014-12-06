// "Showoff Breakout"
//
/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("workspace");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =====
// LEVEL
// =====

var level = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1],
    [1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
    [0, 0, 0, 3, 3, 4, 4, 3, 3, 0, 0, 0],
    [1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
    [1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// ======
// PLAYER
// ======

var g_level = setUpLevel(level);
var TOGGLE_DEATH_KEY = 'N'.charCodeAt(0);
var g_death = true;


document.getElementById('start-level').onclick = function(e)
{
    level = document.getElementById('level-editor').value;
    level = '[' + level + ']';
    g_level = setUpLevel(JSON.parse(level));
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    if (g_keys.eatKey(TOGGLE_DEATH_KEY)) g_death = !g_death;

    if (g_level.hasWon()) 
    {
        g_ball.setIdle();
    }   

    g_ball.update(du);
    
    g_player.update(du);
    

    for (var i = 0; i < g_explosions.length;)
    {
        if (!g_explosions[i].isOver())
        {
            g_explosions[i++].update();
        }
        else
        {
            g_explosions.splice(i, 1);
        }
    }
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    g_player.render(ctx);
    g_level.render(ctx);
    g_ball.render(ctx);
    for (var i = 0; i < g_explosions.length; ++i)
    {
        g_explosions[i].render(ctx);
    }
}

// Kick it off
g_main.init();