function castShadow(ctx, origin, x, y, w, h)
{
    // Casts a shadow from a rectangular object from a point light source
    // located at origin
    var points = [
        {x: x, y: y},
        {x: x, y: y + h},
        {x: x + w, y: y + h},
        {x: x + w, y: y}
    ];
    // Check if edge is invisible from the perspective of origin
    var a = points[points.length - 1];
    for (var i = 0; i < points.length; ++i, a = b)
    {
        var b = points[i];
        var originToA = {
            x: a.x - origin.x,
            y: a.y - origin.y
        };
        var originToB = {
            x: b.x - origin.x,
            y: b.y - origin.y
        };
        var normalAtoB = {
            x: b.y - a.y,
            y: -(b.x - a.x)
        };

        var normalDotOriginToA = normalAtoB.x * originToA.x +
                                 normalAtoB.y * originToA.y;

        // If the edge is invisible from the perspective of origin it casts
        // a shadow
        if (normalDotOriginToA < 0)
        {
            // We draw the form of the shade so that it definitely exceeds the
            // canvas. This is probably cheaper than projecting the points onto
            // the edges of the canvas.
            ctx.beginPath()
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(a.x + 1.5 * g_canvas.width * originToA.x,
                       a.y + 1.5 * g_canvas.width * originToA.y);
            ctx.lineTo(b.x + 1.5 * g_canvas.width * originToB.x,
                       b.y + 1.5 * g_canvas.width * originToB.y);
            ctx.lineTo(b.x, b.y);
            ctx.closePath();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fill();
        }
    }


}