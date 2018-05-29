import { Injectable, OnInit } from '@angular/core';
import * as Phaser from 'phaser-ce';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { $ } from 'protractor';



@Injectable()
export class PhaserService implements Phaser {
  private bullets: Phaser.Group;
  public game: Phaser.Game;
  public fullyLoaded = new BehaviorSubject(false);
  private hexagonArray = [];

  private cats;
  private walls;
  private player;
  private mice;
  private mouse;
  private bullet;
  private spaceKey;

  private hexagonWidth = 70;
  private hexagonHeight = 80;
  private gridSizeX = 36;
  private gridSizeY = 12;
  private columns = [Math.ceil(this.gridSizeX / 2), Math.floor(this.gridSizeX / 2)];
  private moveIndex;
  private sectorWidth = this.hexagonWidth;
  private sectorHeight = this.hexagonHeight / 4 * 3;
  private gradient = (this.hexagonHeight / 4) / (this.hexagonWidth / 2);
  private marker;
  private hexagonGroup;

  private hexMove = [];

  constructor() {
    this.game = new Phaser.Game(
      '100%',
      '100%',
      Phaser.AUTO,
      'app-root',
      { preload: this.preload, create: this.create, update: this.update }
    );
  }

  preload() {
    this.game.load.image('cat', 'assets/images/cat.png');
    this.game.load.image('wall', 'assets/images/wall.png');
    this.game.load.image('mouse', 'assets/images/mouse.jpg');
    this.game.load.image('tank', 'assets/images/tank.png');
    this.game.load.image('bullet', 'assets/images/bullet.png');
    this.game.load.image('turret', 'assets/images/turret.png');
    this.game.load.image('flame', 'assets/images/flame.png');
    this.game.load.image('hexagon', 'assets/images/hexagon.png');
    this.game.load.image('marker', 'assets/images/marker.png');
  }

  create() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#e6e6e6';

    /*walls = this.game.add.group();
    walls.enableBody = true;

    let wall = walls.create(0, 0, 'wall');
    wall.scale.setTo(this.game.world.width,0.10);
    wall.body.immovable = true;

    wall = walls.create(0, this.game.world.height - 64, 'wall');
    wall.scale.setTo(this.game.world.width,0.10);
    wall.body.immovable = true;

    wall = walls.create(0, 0, 'wall');
    wall.scale.setTo(0.10,this.game.world.height);
    wall.body.immovable = true;

    wall = walls.create(this.game.world.width - 64, 0, 'wall');
    wall.scale.setTo(0.10,this.game.world.height);
    wall.body.immovable = true;

    let obstacle = walls.create(256, 256, 'wall');
    obstacle.scale.setTo(0.10,0.10);
    obstacle.body.immovable = true;


    player = this.game.add.sprite(64, 64, 'cat');
    player.scale.setTo(0.10,0.10);
    player.anchor.setOt(0.5);
    this.game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;


    mice = this.game.add.group();

    mice.enableBody = true;


    for (var i = 10; i < 120; i+=20)
    {
        mouse = mice.create(i * 7, 128 , 'mouse');
        mouse.scale.setTo(0.10,0.10);
    }*/


    /*this.game.add.sprite(
      this.game.world.centerX - (this.game.cache.getImage('cat').width / 2),
      this.game.world.centerY - (this.game.cache.getImage('cat').height / 2),
      'cat'
    );*/

    this.hexagonGroup = this.game.add.group();
    this.game.stage.backgroundColor = '#ffffff';
    for (let i = 0; i < this.gridSizeY / 2; i++) {
      this.hexagonArray[i] = [];
      for (let j = 0; j < this.gridSizeX; j++) {
        if (this.gridSizeY % 2 === 0 || i + 1 < this.gridSizeY / 2 || j % 2 === 0) {
          const hexagonX = this.hexagonWidth * j / 2;
          const hexagonY = this.hexagonHeight * i * 1.5 + (this.hexagonHeight / 4 * 3) * (j % 2);
          const hexagon = this.game.add.sprite(hexagonX, hexagonY, 'hexagon');
          this.hexagonGroup.add(hexagon);
          this.hexagonArray[i][j] = hexagon;
        }
      }
    }
    this.hexagonGroup.x = (this.game.width - this.hexagonWidth * Math.ceil(this.gridSizeX / 2)) / 2;
    if (this.gridSizeX % 2 === 0) {
      this.hexagonGroup.x -= this.hexagonWidth / 4;
    }
    this.hexagonGroup.y = (this.game.height - Math.ceil(this.gridSizeY / 2) *
      this.hexagonHeight - Math.floor(this.gridSizeY / 2) *
      this.hexagonHeight / 2) / 2;
    if (this.gridSizeY % 2 === 0) {
      this.hexagonGroup.y -= this.hexagonHeight / 8;
    }

    this.player = this.game.add.sprite(64, 64, 'cat');
    this.player.scale.setTo(0.10, 0.10);
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.visible = false;
    /*marker = this.game.add.sprite(0,0,"marker");
    marker.anchor.setTo(0.5);
    marker.visible=false;*/
    this.hexagonGroup.add(this.player);
    // moveIndex = this.game.input.addMoveCallback(checkHex, this);

    this.moveIndex = this.game.input.onDown.add(this.checkHex, this);

    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    // bullet = this.game.input.onDown.add(fire, this);
    this.bullet = this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  }

  checkHex() {
    let candidateX = Math.floor((this.game.input.worldX - this.hexagonGroup.x) / this.sectorWidth);
    let candidateY = Math.floor((this.game.input.worldY - this.hexagonGroup.y) / this.sectorHeight);
    const deltaX = (this.game.input.worldX - this.hexagonGroup.x) % this.sectorWidth;
    const deltaY = (this.game.input.worldY - this.hexagonGroup.y) % this.sectorHeight;
    if (candidateY % 2 === 0) {
      if (deltaY < ((this.hexagonHeight / 4) - deltaX * this.gradient)) {
        candidateX--;
        candidateY--;
      }
      if (deltaY < ((-this.hexagonHeight / 4) + deltaX * this.gradient)) {
        candidateY--;
      }
    } else {
      if (deltaX >= this.hexagonWidth / 2) {
        if (deltaY < (this.hexagonHeight / 2 - deltaX * this.gradient)) {
          candidateY--;
        }
      } else {
        if (deltaY < deltaX * this.gradient) {
          candidateY--;
        } else {
          candidateX--;
        }
      }
    }
    this.placeMarker(candidateX, candidateY);
  }

  placeMarker(posX, posY) {
    for (let i = 0; i < this.gridSizeY / 2; i++) {
      for (let j = 0; j < this.gridSizeX; j++) {
        if (this.gridSizeY % 2 === 0 || i + 1 < this.gridSizeY / 2 || j % 2 === 0) {
          this.hexagonArray[i][j].tint = 0xffffff;
        }
      }
    }
    if (posX < 0 || posY < 0 || posY >= this.gridSizeY || posX > this.columns[posY % 2] - 1) {
      this.player.visible = false;
    } else {
      this.player.visible = true;
      this.player.x = this.hexagonWidth * posX;
      this.player.y = this.hexagonHeight / 4 * 3 * posY + this.hexagonHeight / 2;
      if (posY % 2 === 0) {
        this.player.x += this.hexagonWidth / 2;
      } else {
        this.player.x += this.hexagonWidth;
      }
      const playerX = posX * 2 + posY % 2;
      const playerY = Math.floor(posY / 2);


      // TEST VARIABLES

      const speed = 2;

      this.hexagonArray[playerY][playerX].tint = 0xff8800;


      /* var newPlayerX = playerX-2;
      var newPlayerY = playerY;
      this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000 ;
      newPlayerX=playerX;
      newPlayerY=playerY-1;
      this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
      newPlayerX=playerX+1;
      newPlayerY=playerY;
      this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
      newPlayerX=playerX;
      newPlayerY=playerY+1;
      this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;

      if(playerX%2==0){
          newPlayerX=playerX-1;
          newPlayerY=playerY-1;
          this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
          newPlayerX=playerX+1;
          this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
      }else{
          newPlayerX=playerX-1;
          newPlayerY=playerY+1;
          this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
          newPlayerX=playerX+1;
          this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
      }  */

      // this.hexagonArray = getNeighbors(playerX, playerY);

      this.hexMove = [];
      console.log(this.hexMove);
      this.hexMove = this.setNeighbors(playerX, playerY);
      console.log(this.hexMove);
      this.hexagonArray = this.getNeighbors(this.hexMove[0], this.hexMove[1]);

    }
  }

  setNeighbors(playerX, playerY) {
    const neighbors = [];
    if (playerX - 2 >= 0) {
      neighbors.push(playerY);
      neighbors.push(playerX - 2);
    }
    if (playerX + 2 < this.gridSizeX) {
      neighbors.push(playerY);
      neighbors.push(playerX + 2);
    }
    if (playerY - 1 + playerX % 2 >= 0) {
      if (playerX - 1 >= 0) {
        neighbors.push(playerY - 1 + playerX % 2);
        neighbors.push(playerX - 1);
      }
      if (playerX + 1 < this.gridSizeX) {
        neighbors.push(playerY - 1 + playerX % 2);
        neighbors.push(playerX + 1);
      }
    }
    if (playerY + playerX % 2 < this.gridSizeY / 2 && (this.gridSizeY % 2 === 0 || playerY < Math.floor(this.gridSizeY / 2))) {
      if (playerX - 1 >= 0) {
        neighbors.push(playerY + playerX % 2);
        neighbors.push(playerX - 1);
      }
      if (playerX + 1 < this.gridSizeX) {
        neighbors.push(playerY + playerX % 2);
        neighbors.push(playerX + 1);
      }
    }

    console.log('Array ' + neighbors);
    return neighbors;
  }

  getNeighbors(playerX, playerY) {
    if (playerX - 2 >= 0) {
      this.hexagonArray[playerY][playerX - 2].tint = 0xff0000;
    }
    if (playerX + 2 < this.gridSizeX) {
      this.hexagonArray[playerY][playerX + 2].tint = 0xff0000;
    }
    if (playerY - 1 + playerX % 2 >= 0) {
      if (playerX - 1 >= 0) {
        this.hexagonArray[playerY - 1 + playerX % 2][playerX - 1].tint = 0xff0000;
      }
      if (playerX + 1 < this.gridSizeX) {
        this.hexagonArray[playerY - 1 + playerX % 2][playerX + 1].tint = 0xff0000;
      }
    }
    if (playerY + playerX % 2 < this.gridSizeY / 2 && (this.gridSizeY % 2 === 0 || playerY < Math.floor(this.gridSizeY / 2))) {
      if (playerX - 1 >= 0) {
        this.hexagonArray[playerY + playerX % 2][playerX - 1].tint = 0xff0000;
      }
      if (playerX + 1 < this.gridSizeX) {
        this.hexagonArray[playerY + playerX % 2][playerX + 1].tint = 0xff0000;
      }
    }
    return this.hexagonArray;
  }

  killMouse(player, mouse) {
    mouse.kill();
  }

  killMouseWithFire(bullet, mouse) {
    bullet.kill();
    mouse.kill();
  }

  fire() {
    if (this.bullets && this.bullets.length > 1) {
      return;
    }
    this.bullet = this.bullets.create(this.player.x, this.player.y, 'flame');
  }

  update() {
    // let hitPlatform = this.game.physics.arcade.collide(player, walls);
    const cursors = this.game.input.keyboard.createCursorKeys();

    /*player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
    }
    else if (cursors.down.isDown) {
      player.body.velocity.y = 150;
    }
    else if (cursors.up.isDown) {
      player.body.velocity.y = -150;
    }*/

    // this.game.physics.arcade.overlap(player, mice, killMouse, null, this);

    this.bullets.forEach((item) => {
      // if (item.x > player.x + 500 || item.x < player.x - 500 || item.y > player.y + 500 || item.y < player.y - 500) {
      //  item.destroy();
      // }

      if (this.spaceKey.isDown) {
        item.x += 5;
      }
    }, this);

    // this.game.physics.arcade.overlap(bullets, mice, killMouseWithFire, null, this);

    this.fullyLoaded.next(true);
  }
}
