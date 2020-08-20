window.onload = function () {
    let app = new PIXI.Application({
        width: 1900,
        height: 1200,
        backgroundColor: 0xFFFFFF
    })
    let wall = new PIXI.Graphics();
    document.body.appendChild(app.view);
    let width = 50;
    let height = 50;
    let x = 400;
    let y = 550;
    let circleradius=15;
    let count=0;
    wallarray = [];
    let ticker = PIXI.Ticker.shared;
    for (i = 0; i <14; i++) {

        wall = new PIXI.Graphics();
        wall.lineStyle(2, 0x000000)
        wall.drawRect(0, 0, width, height);
        wall.x=x;
        wall.y=y;
        wall.endFill();
        app.stage.addChild(wall);
        wallarray.push(wall);
        x += 50;
    }



    let redball = new PIXI.Graphics();
    let blueball = new PIXI.Graphics();

    redball.beginFill(0xFF0000);
    redball.drawCircle(0, 0, circleradius);
    redball.endFill();

    blueball.beginFill(0x1E90FF);
    blueball.drawCircle(0, 0, circleradius);
    blueball.endFill();

    redball.x = wallarray[0].x+width/2;
    redball.y = wallarray[0].y+height/2;

    blueball.x = redball.x-50;
    blueball.y = wallarray[0].y+height/2

    let action = 1;

    let redballdegree = 180;
    let redballspeed = 5;
    let blueballdegree = 180;
    let blueballspeed = 5;

    

    app.ticker.autostart = false;

    app.stage.addChild(redball, blueball, wall)
    app.stage.interactive = true;
    app.stage.hitArea = new PIXI.Rectangle(0, 0, 1900, 1200);
    app.stage.on('mousedown', onButtonClick);
    document.addEventListener('keypress',onButtonClick);
    function updateblueballdegree(x, y) {
        blueballdegree += blueballspeed;
        if (blueballdegree > 360) {
            blueballdegree = blueballdegree - 360
        }

        return blueballdegree;
    }

    function blueballrotatesaroundblue() {
        let angle = updateblueballdegree();
        radius = 50;
        let rad = angle * Math.PI / 180;
        blueball.x = redball.x + radius * Math.cos(rad);
        blueball.y = redball.y + radius * Math.sin(rad);

    }

    function updateredballdegree(x, y) {
        redballdegree += redballspeed;
        if (redballdegree > 360) {
            redballdegree = redballdegree - 360;
        }
        return redballdegree;
    }

    function redballrotatesaroundredball() {
        let angle = updateredballdegree();
        radius = 50;
        let rad = angle * Math.PI / 180;
        redball.x = blueball.x + radius * Math.cos(rad);
        redball.y = blueball.y + radius * Math.sin(rad);

    }

    function onButtonClick() {

        if (action == 1) {
            action = 2;
            ticker.add(blueballrotatesaroundblue);
            ticker.remove(redballrotatesaroundredball);
            blueballdegree = 180;
            
        } else if(action==2) {
            
            ticker.remove(blueballrotatesaroundblue);
            ticker.add(redballrotatesaroundredball);
            action = 1;
            redballdegree = 180;
        }
        if(blueball.y>wallarray[0].y+width-circleradius|| redball.y>wallarray[0].y+width-circleradius || blueball.y<wallarray[0].y+circleradius || redball.y<wallarray[0].y+circleradius){
            ticker.stop()
            app.stage.off("click");
           
            }
    }
    

    }




