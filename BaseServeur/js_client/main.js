var config = {
    type : Phaser.AUTO,
    width : 800,
    height : 600,
    scene : {
        preload : preload,
        create : create,
        update : update
    },
    physics : {
        default :"arcade",
        arcade : {
            gravity : {y : 500}
        }
    }
}
var player = null
var clickBoutonHaut = false; 
var clickBoutonBas = false;
var cursor = null;
var Vkey ;
var BoutonBas;
var BoutonHaut;

const game =  new Phaser.Game(config);

function preload(){
    this.load.image("joueur","player_stand.png");
    this.load.image("joueur_cdp","player_kick.png");
    this.load.image("joueur_walk1","player_walk1.png");
    this.load.image("joueur_walk2","player_walk2.png");
    this.load.image("haut","green_sliderUp.png");
    this.load.image("bas","green_sliderDown.png");
    this.load.image("castle","backgroundColorFall.png");
    this.load.image("snail","snailWalk1.png");
    this.load.image("sol","sol.png");
    this.load.spritesheet("zombieSPS","ZombieSpriteSheet.png",{frameWidth : 80, frameHeight: 110});
    this.load.audio("ready","ready.ogg");
    this.load.audio("kick","kick.ogg");
}

function create(){
    this.sound.play("ready");
    var positionCameraCentreX = this.cameras.main.centerX;
    var positionCameraCentreY = this.cameras.main.centerY; 
    this.add.sprite(positionCameraCentreX,positionCameraCentreY,"castle");
    var snail = this.physics.add.sprite(500,positionCameraCentreY + 200,"snail");
    player = this.physics.add.sprite(positionCameraCentreX,positionCameraCentreY,"joueur");
    var sol1 = this.add.sprite(100,550,"sol");
    var sol2 = this. add.sprite(positionCameraCentreX,550,"sol");

    var platforms = this.physics.add.staticGroup();
    platforms.add(sol1);
    platforms.add(sol2);

    this.physics.add.collider(platforms,player);
    
    snail.flipX = true;
    var tween = this.tweens.add({
        targets : snail,
        x : 600,
        ease : "Linear",
        duration : 5000,
        yoyo : true,
        repeat : -1,
        OnStart : function (){},
        OnComplete : function (){},
        OnYoyo : function (){ snail.flipX = !snail.flipX},
        OnRepeat : function (){ snail.flipX = !snail.flipX}
    });

    var policeTitre = {
        fontSize : "43px",
        color : "#FF0000",
        fontFamily : "Mochi"
    }
    this.add.text(positionCameraCentreX,30, "BIGORNO !",policeTitre)

    player.setScale(1);
    player.setOrigin(0,0);
//    player.setFlip(false,true);
BoutonBas = this.add.sprite(50,50,"bas").setInteractive();
BoutonHaut = this.add.sprite(100,50,"haut").setInteractive();
grossirPlayer();
genererAnimations();
this.add.sprite(300,300).play("zombieWalk");
    cursor = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown_B",function(){
        console.log("piou");
    })
    
    Vkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);


}

var isLeftDown = false;
var isRightDown = false;
var isKickDown = false;
var isReadyToKick = false;

function update(time,delta){
    if(isKickDown && isReadyToKick){
        isReadyToKick = false;
        player.setTexture("joueur_cdp");
        game.sound.play("kick");
      } else if(isLeftDown){
        player.x = player.x - 5;
        player.anims.play("playerWalk",true);
        player.setFlip(true,false);
      } else if(isRightDown){
        player.x += 5;
        player.anims.play("playerWalk",true);
        player.setFlip(false,false);
      } else {
        player.setTexture("joueur");
      }
      if(cursor.left.isDown){
        isLeftDown = true;
      } 
      if(cursor.right.isDown){
        isRightDown = true;
      }
      if(Vkey.isDown){
        isKickDown = true;
      }
      if(Vkey.isUp){
        isKickDown = false;
        isReadyToKick = true;
      }
      if(cursor.left.isUp){
        isLeftDown = false;
      }
      if(cursor.right.isUp){
        isRightDown = false;
      }

      updategrossirPlayer();
}

function genererAnimations(){
    game.anims.create({
        key : "playerWalk",
        frames : [
            {key : "joueur_walk1"},
            {key : "joueur_walk2"},
        ],
        frameRate : 8,
        repeat : -1
    });

    game.anims.create({
        key : "zombieWalk",
        frames : game.anims.generateFrameNumbers("zombieSPS",{start:2,end:"3"}),
        frameRate : 8,
        repeat : -1
    })

    game.anims.create({
        key : "zombieStand",
        frames : [{key:"zombieSPS",frame:1}],
        frameRate : 8,
        repeat : -1
    })

    game.anims.create({
        key : "zombieIdle",
        frames : game.anims.generateFrameNumbers("zombieSPS",{start:0,end:"1"}),
        frameRate : 8,
        repeat : -1
    });

}
function deplacerPersonnage(){

}

function updategrossirPlayer(){
    if(clickBoutonHaut){
        player.setScale(player.scaleX + 0.1, player.scaleY + 0.1);
      }
      if(clickBoutonBas){
        player.setScale(player.scaleX - 0.1, player.scaleY - 0.1);
      }
}

function grossirPlayer(){
  
   BoutonBas.on("pointerdown",function(){
   clickBoutonBas = true;
 });
 BoutonBas.on("pointerup",function(){
   clickBoutonBas = false;
 })
 BoutonBas.on("pointerout",function(){
   clickBoutonBas = false;
 })

 BoutonHaut.on("pointerdown",function(){
   clickBoutonHaut = true;
 });
 BoutonHaut.on("pointerup",function(){
   clickBoutonHaut = false;
 })
 BoutonHaut.on("pointerout",function(){
   clickBoutonHaut = false;
 })
}