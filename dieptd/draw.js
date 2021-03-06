//draw diep.io barrel (x position, y position, width, height, angle, offset x, offset y, fill color, border color)
function diep_barrel(x, y, w, h, a, ox, oy, c1, c2) {

    //set values to their defaults if not provided
    if (a == undefined) {
        a = 0;
    }
    if (ox == undefined) {
        ox = 0;
        oy = 0;
    }
    if (c1 == undefined) {
        c1 = "#999999";
        c2 = "#727272";
    }

    //translate and rotate
    cc.save();
    cc.translate(x, y);
    cc.rotate(a);

    //set fill and stroke colors
    cc.fillStyle = c1;
    cc.strokeStyle = c2;

    //set line width and line join
    cc.lineWidth = 4;
    cc.lineJoin = "round";

    //actually draw the barrel
    cc.beginPath();
    cc.rect(oy, -w / 2 + ox, h, w);
    cc.fill();
    cc.stroke();

    //restore translation and rotation to normal
    cc.restore();
}

//draw diep.io barrel (x position, y position, width, height, angle, offset x, offset y, fill color, border color)
function diep_trapezoid_barrel(x, y, w1, w2, h, a, ox, oy, c1, c2) {

    //set values to their defaults if not provided
    if (a == undefined) {
        a = 0;
    }
    if (ox == undefined) {
        ox = 0;
        oy = 0;
    }
    if (c1 == undefined) {
        c1 = "#999999";
        c2 = "#727272";
    }

    //translate and rotate
    cc.save();
    cc.translate(x, y);
    cc.rotate(a);

    //set fill and stroke colors
    cc.fillStyle = c1;
    cc.strokeStyle = c2;

    //set line width and line join
    cc.lineWidth = 4;
    cc.lineJoin = "round";

    //actually draw the barrel
    cc.beginPath();
    cc.moveTo(oy, -w1 / 2 + ox);
    cc.lineTo(oy + h, -w2 / 2 + ox);
    cc.lineTo(oy + h, w2 / 2 + ox);
    cc.lineTo(oy, w1 / 2 + ox);
    cc.fill();
    cc.stroke();

    //restore translation and rotation to normal
    cc.restore();
}

//draws diep.io circle (x position, y position, radius, fill color, stroke color)
function diep_circle(x, y, r, c1, c2) {

    //set fill and stroke colors
    cc.fillStyle = c1;
    cc.strokeStyle = c2;

    //set line width
    cc.lineWidth = 4;

    //draw circle
    cc.beginPath();
    cc.arc(x, y, r, 0, tau);
    cc.fill();
    cc.stroke();
}

var enable_hp_bar = true;
function diep_healthbar(x, y, hp, max, l, c1) {

    if (enable_hp_bar) {

        //set line cap
        cc.lineCap = "round";

        //draw path of border
        cc.beginPath();
        cc.moveTo(x - l / 0.8, y + l + 15);
        cc.lineTo(x + l / 0.8, y + l + 15);

        //set border parameters
        cc.lineWidth = 8;
        cc.strokeStyle = "#555555";

        //draw border
        cc.stroke();

        //draw path of border
        cc.beginPath();
        cc.moveTo(x - l / 0.8, y + l + 15);
        cc.lineTo(x - l / 0.8 + l / 0.4 * (hp / max), y + l + 15);

        //set fill parameters
        cc.lineWidth = 4;
        if (c1 == undefined) {
            cc.strokeStyle = "#85E37D";
        } else {
            cc.strokeStyle = c1;
        }

        //draw fill
        cc.stroke();
    }
}

//draws a polygon (x position, y position, radius, sides)
function poly(x, y, r, s, angle_offset) {
    if (!angle_offset) {
        angle_offset = 0;
    }
    cc.beginPath();
    for (var i = 0; s > i; i++) {
        var a = tau / s * i + angle_offset;
        cc.lineTo(Math.cos(a) * r + x, Math.sin(a) * r + y);
    }
    cc.closePath();
}

//draws hexagonal bases for tanks
function tank_base(x, y, r) {
    cc.fillStyle = "#555555";
    poly(x, y, r, 6);
    cc.fill();
}

//draws field of view
function fov(a) {
    if (fov_toggle) {
        cc.beginPath();
        cc.arc(a.x, a.y, a.fov, 0, tau);
        cc.globalAlpha = clamp(3000 / Math.pow(dist(a.x, a.y, tmc.x, tmc.y), 2), 0.14, 0.4);
        switch (a.discrim_2) {
            case "relay":
                cc.strokeStyle = "#00e06c";
                break;
            case "miner":
                cc.strokeStyle = "#000000";
                break;
            default: 
                cc.strokeStyle = "#1db2df";
                break;
        }
        cc.stroke();
        cc.globalAlpha = 1;
        if (a.discrim_2 == "relay") {
            if (!place.placing) {
                cc.fillStyle = "#00e06c06";
            } else {
                cc.fillStyle = "#00e06c14";
            }
            cc.fill();
        }
    }
}

//diep.io text function.
function diep_text(txt, x, y, size) {
    cc.font = size + "px Ubuntu";
    cc.lineJoin = "round";
    cc.lineWidth = size / 5;
    cc.strokeStyle = "#3A3A3A";
    cc.fillStyle = "#E9E9E9";
    cc.beginPath();
    cc.strokeText(txt, x, y);
    cc.fillText(txt, x, y);
}

//diep.io icon function
function diep_icon(x, y, w, h, color) {
    var c1, c2;
    switch (color) {
        case 0:
            c1 = "#8EFFFB";
            c2 = "#72CDCA";
            break;
        case 1:
            c1 = "#B4FF8E";
            c2 = "#91CD72";
            break;
        case 2:
            c1 = "#FF8E8E";
            c2 = "#CD7272";
            break;
        case 3:
            c1 = "#FFEB8E";
            c2 = "#CDBD72";
            break;
        case 4:
            c1 = "#8EB2FF";
            c2 = "#728FCD";
            break;
        case 5:
            c1 = "#B58EFF";
            c2 = "#9272CD";
            break;
        case 6:
            c1 = "#FB8EFF";
            c2 = "#CA72CD";
            break;
        case 7:
            c1 = "#FDCDAC";
            c2 = "#CCA58A";
            break;
    }
    cc.fillStyle = c1;
    cc.fillRect(x, y, w, h * (58 / 101));
    cc.fillStyle = c2;
    cc.fillRect(x, y + h * (58 / 101), w, h * (43 / 101));
    cc.strokeStyle = "#5F5F5F";
    cc.lineWidth = 6;
    cc.lineJoin = "round";
    cc.strokeRect(x, y, w, h);
}

//draw upgrade menu (set of icons)
function icon_set(display) {
    cc.textAlign = "center";
    for (var i = 0; display.length > i; i++) {
        diep_icon(1920 + 110 * i - display.length * 110, 10, 100, 100, i);
        draw_obj(display[i].center, 1920 + 110 * i - display.length * 110 + 50, 60, l / 100, true, true);
        diep_text(display[i].top, 1920 + 110 * i - display.length * 110 + 50, 30, 12);
        diep_text(display[i].bottom, 1920 + 110 * i - display.length * 110 + 50, 100, 12);
    }
}

//draw upgrade menu from upgrade info
function upgrade_menu(upgrade) {
    var icon = [];
    var toprow = "QWERTYUIOP";
    original = tank_from_string(upgrade.source, 0, 0)();
    for (var i = 0; upgrade.upgrades.length > i; i++) {
        var tank = tank_from_string(upgrade.upgrades[i], 0, 0)();
        icon[i] = {
            top: tank.cost - original.cost + " Points",
            center: tank.tank_type,
            bottom: toprow[i] + " - " + format_tank_name(tank.tank_type)
        }
    }
    icon_set(icon);
}

//draw ingame object
function draw_obj(obj, x, y, angle, override_scale, override_fov) {
    ctx.save();
    ctx.translate(x, y);
    if (!override_scale) {
        ctx.scale(scale.factor, scale.factor);
    }
    var tank = tank_from_string(obj, 0, 0)();
    enable_hp_bar = false;
    tank.draw();
    enable_hp_bar = true;
    if (!override_fov) {
        fov(tank);
    }
    ctx.restore();
}