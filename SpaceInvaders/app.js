const app = new PIXI.Application(); //Framework gespeichert
const enemyList = [];

document.body.appendChild(app.view);

const cat = PIXI.Sprite.from('assets/cat.png');
cat.x = 350;
cat.y = 485;
cat.scale.x = 0.03;
cat.scale.y = 0.03;
app.stage.addChild(cat);




gameInterval(function() {

  const enemy = PIXI.Sprite.from('assets/enemy' + random(1, 6) + '.png');
  enemy.x = random(0, 650); //random = Funktion aus dem Framework
  enemy.y = - 25;
  enemy.scale.x = 0.05;
  enemy.scale.y = 0.05;
  app.stage.addChild(enemy);
  enemyList.push(enemy); //Zugriff auf Array
  flyDown(enemy, 1);

  waitForCollision(enemy, cat).then(function() {
    app.stage.removeChild(cat);
    stopGame();
  });

}, 1000); //Zweiter Parameter. Funktion wird alle 300ms ausgeführt.




//Funktionen aus dem Framework zum bewegen mit den Pfeiltasten und zum "schießen" mit der Spacebar
function leftKeyPressed() {

  cat.x = cat.x -5;
}

function rightKeyPressed() {

  cat.x = cat.x + 5;
}

function spaceKeyPressed() {

  const claw = PIXI.Sprite.from('assets/claw.png');
  claw.x = cat.x;
  claw.y = cat.y - 30;
  claw.scale.x = 0.06;
  claw.scale.y = 0.06;
  
  flyUp(claw);
  app.stage.addChild(claw);

  waitForCollision(claw, enemyList).then(function([claw, enemy]) {
    app.stage.removeChild(claw);
    app.stage.removeChild(enemy);
  
  });

 
}




