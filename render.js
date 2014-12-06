// GENERIC RENDERING

var g_doClear = true;
var g_doBox = false;
var g_undoBox = false;
var g_doFlipFlop = false;
var g_doRender = true;

var g_blindMode = false;

var g_frameCounter = 1;

var TOGGLE_CLEAR = 'C'.charCodeAt(0);
var TOGGLE_BOX = 'B'.charCodeAt(0);
var TOGGLE_UNDO_BOX = 'U'.charCodeAt(0);
var TOGGLE_FLIPFLOP = 'F'.charCodeAt(0);
var TOGGLE_RENDER = 'R'.charCodeAt(0);

var TOGGLE_BLIND_MODE = 'I'.charCodeAt(0);
var TOGGLE_MARK_COLLISION_CHECK = 'M'.charCodeAt(0);

function renderVictoryMessage(ctx)
{
    ctx.save();
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.font = '40px Arial';
    ctx.fillText("Huzzah!", g_canvas.width/2, g_canvas.height/2);
    ctx.restore();
}


function render(ctx) {
    
    // Process various option toggles
    //
    if (g_keys.eatKey(TOGGLE_CLEAR)) g_doClear = !g_doClear;
    if (g_keys.eatKey(TOGGLE_BOX)) g_doBox = !g_doBox;
    if (g_keys.eatKey(TOGGLE_UNDO_BOX)) g_undoBox = !g_undoBox;
    if (g_keys.eatKey(TOGGLE_FLIPFLOP)) g_doFlipFlop = !g_doFlipFlop;
    if (g_keys.eatKey(TOGGLE_RENDER)) g_doRender = !g_doRender;

    if (g_keys.eatKey(TOGGLE_BLIND_MODE)) g_blindMode = !g_blindMode;
    if (g_keys.eatKey(TOGGLE_MARK_COLLISION_CHECK))
        g_markCollisionCheck = !g_markCollisionCheck;
    
    // I've pulled the clear out of `renderSimulation()` and into
    // here, so that it becomes part of our "diagnostic" wrappers
    //
    if (g_doClear)
        fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height,
                'rgb(' + bg.r + ',' + bg.g + ',' + bg.b + ')');
    
    
    if (g_level.hasWon())
    {
        renderVictoryMessage(ctx);
    }
    
    // The main purpose of the box is to demonstrate that it is
    // always deleted by the subsequent "undo" before you get to
    // see it...
    //
    // i.e. double-buffering prevents flicker!
    //
    if (g_doBox) fillBox(ctx, 200, 200, 50, 50, "red");
    
    
    // The core rendering of the actual game / simulation
    //
    if (g_doRender) renderSimulation(ctx);
    
    
    // This flip-flip mechanism illustrates the pattern of alternation
    // between frames, which provides a crude illustration of whether
    // we are running "in sync" with the display refresh rate.
    //
    // e.g. in pathological cases, we might only see the "even" frames.
    //
    if (g_doFlipFlop) {
        var boxX = 250,
            boxY = g_isUpdateOdd ? 100 : 200;
        
        // Draw flip-flop box
        fillBox(ctx, boxX, boxY, 50, 50, "green");
        
        // Display the current frame-counter in the box...
        ctx.fillText(g_frameCounter % 1000, boxX + 10, boxY + 20);
        // ..and its odd/even status too
        var text = g_frameCounter % 2 ? "odd" : "even";
        ctx.fillText(text, boxX + 10, boxY + 40);
    }
    
    // Optional erasure of diagnostic "box",
    // to illustrate flicker-proof double-buffering
    //
    if (g_undoBox) ctx.clearRect(200, 200, 50, 50);
    
    ++g_frameCounter;
}