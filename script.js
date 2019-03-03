
    let rogue1, rogue2, rogue3, 
        demon1,demon2,demon3,
        mage1,mage2,mage3,
        hunter1,hunter2,hunter3,player,enemies,enemy;
      // player script
    class Characters{
       constructor(classType,health,mana,strength,stamina,speed ){
           this.classType = classType;
           this.health = health;
           this.mana = mana;
           this.strength = strength;
           this.stamina = stamina;
           this.speed = speed;
       } 
    };
    rogue1 = new Characters('rogue1',100,50,100,300,350);
    rogue2 = new Characters('rogue2',100,50,100,300,350);
    rogue3 = new Characters('rogue3',100,50,100,300,350);
    mage1 = new Characters('mage1',100,200,100,90,350);
    mage2 = new Characters('mage2',100,200,100,90,350);
    mage3 = new Characters('mage3',100,200,100,90,350);
    hunter1 = new Characters('hunter1',300,80,200,120,150);
    hunter2 = new Characters('hunter2',300,80,200,120,150);
    hunter3 = new Characters('hunter3',300,80,200,120,150);
    demon1 = new Characters('demon1',500,50,200,50,100);
    demon2 = new Characters('demon2',500,50,200,70,110);
    demon3 = new Characters('demon3',500,50,200,60,130);
    enemies = [ rogue1, rogue2, rogue3, 
              mage1, mage2, mage3,
              hunter1, hunter2, hunter3,
              demon1,demon2,demon3];
    // player moves
    let playerMoves = {
        attack(){
            // calc who attacks first?
            let getPlayerSpeed = player.speed;
            let getEnemySpeed = enemy.speed;
            let getPlayerHealth = document.querySelector(".health-player");
            let getEnemyHealth = document.querySelector(".health-enemy");
            if (getPlayerSpeed >= getEnemySpeed) { // player attacks first
                let playerAttackValues = this.playerAttack();
                let totalDamage = playerAttackValues[0]*playerAttackValues[1];
                enemy.health = enemy.health - totalDamage;
                alert(`you hit ${playerAttackValues[0]} damage and hit ${playerAttackValues[1]} times`);
                if (enemy.health <= 0) {
                    alert("you win! refresh the browser to play again.");
                    getEnemyHealth.innerHTML = "health: 0";
                } else {
                    getEnemyHealth.innerHTML = `health: ${enemy.health}`;
                    // enemy attacks
                    let enemyAttackValues = this.enemyAttack();
                    let totalDamage = enemyAttackValues[0]*enemyAttackValues[1];
                    player.health = player.health - totalDamage;
                    alert(`enemy hit ${enemyAttackValues[0]} damage and hit ${enemyAttackValues[1]} times`);
                    if (player.health <= 0) {
                        alert("you lost! refresh the browser to play again.");
                        getPlayerHealth.innerHTML = "health: 0";
                    } else {
                         getPlayerHealth.innerHTML = `health: ${player.health}`;
                    }
                }
            } else { //enemy atacks first
                let enemyAttackValues = this.enemyAttack();
                let totalDamage = enemyAttackValues[0]*enemyAttackValues[1];
                player.health = player.health - totalDamage;
                alert(`enemy hit ${enemyAttackValues[0]} damage and hit ${enemyAttackValues[1]} times`);
                if (player.health <= 0) {
                    alert("you lost! refresh the browser to play again.");
                    getPlayerHealth.innerHTML = "health: 0";
                } else {
                    getPlayerHealth.innerHTML = `health: ${player.health}`;
                    // you attacks
                    let playerAttackValues = this.playerAttack();
                    let totalDamage = playerAttackValues[0]*playerAttackValues[1];
                    enemy.health = enemy.health - totalDamage;
                    alert(`player hit ${playerAttackValues[0]} damage and hit ${playerAttackValues[0]} times`);
                    if (enemy.health <= 0) {
                        alert("you won! refresh the browser to play again.");
                        getEnemyHealth.innerHTML = "health: 0";
                    } else {
                         getEnemyHealth.innerHTML = `health: ${enemy.health}`;
                    }
                }
            }
            
        },
        // player attacks
        playerAttack(){
            let calcBaseDamage;
            if (player.mana > 0) {
                calcBaseDamage = player.strength * player.mana/ 1000;
            } else {
                calcBaseDamage = player.strength * player.stamnia / 1000;
            }
            let offsetDamage = Math.floor(Math.random()*Math.floor(10));
            let calcOutputDamage = calcBaseDamage + offsetDamage;
            let numberOfHits = Math.floor(Math.random()* Math.floor(player.stamina/10)/2 + 1);
            let attackValues = [calcOutputDamage, numberOfHits];
            return attackValues;
        },
        enemyAttack(){
            let calcBaseDamage;
            if (enemy.mana > 0) {
                calcBaseDamage = enemy.strength * enemy.mana/ 1000;
            } else {
                calcBaseDamage = enemy.strength * enemy.stamnia / 1000;
            }
            let offsetDamage = Math.floor(Math.random()*Math.floor(10));
            let calcOutputDamage = calcBaseDamage + offsetDamage;
            let numberOfHits = Math.floor(Math.random()* Math.floor(enemy.stamina/10)/2 + 1);
            let attackValues = [calcOutputDamage, numberOfHits];
            return attackValues;
        }
    };      
    // game manager script
    
    let gameManager = {
        getCharacters(classType) {
            let details;
            document.querySelector('.char-header h2').innerHTML = "Pick a Character";
            switch(classType) {
                case 'rogue':
                    details = ['rogue1',"hello there",'Undead Warrior',
                               'rogue2',"hello there",'Fallen Angel',
                               'rogue3',"hello there",'Dark Emisa-rka'];
                    this.createCharacterPage(...details);
                break;
                case 'mage':
                    details = ['mage1',"hello there",'The Lady of Time and Space',
                               'mage2',"hello there",'EmmryMure',
                               'mage3',"hello there",'Reka-enigma'];
                    this.createCharacterPage(...details);
                break;
                case 'hunter':
                    details = ['hunter1',"hello there",'Geralt Of Rivia',
                               'hunter2',"hello there",'Ezio Auditorie',
                               'hunter3',"hello there",'Dante Spadar'];
                    this.createCharacterPage(...details);
                break;
                case 'demon':
                    details = ['demon1',"hello there",'Demon king - Urizen',
                               'demon2',"hello there",'Dracula',
                               'demon3',"hello there",'Hell\'s champion'];
                    this.createCharacterPage(...details);
                break;
            default: alert("choose a character");
            }
        },
        createCharacter(hero){
            switch(hero){
                case 'rogue1': player = rogue1;
                break;
                case 'rogue2': player = rogue2;
                break;
                case 'rogue3': player = rogue3;
                break;
                case 'mage1': player = mage1;
                break;
                case 'mage2': player = mage2;
                break;
                case 'mage3': player = mage3;
                break;
                case 'hunter1': player =hunter1;
                break;
                case 'hunter2': player = hunter2;
                break;
                case 'hunter3': player = hunter3;
                break;
                case 'demon1': player = demon1;
                break;
                case 'demon2': player = demon2;
                break;
                case 'demon3': player = demon3;
                break;
            };
            let getInterface = document.querySelector('.char-interface');
            getInterface.innerHTML = `<img src="image/${hero}.jpg">
                                      <div><h3>${player.classType.toUpperCase()}</h3>
                                      <p class="health-player">Health: ${player.health}</p>
                                      <p>Mana: ${player.mana}</p>
                                      <p>Strength: ${player.strength}</p>  
                                      <p>Stamina: ${player.stamina}</p>
                                      <p>Speed: ${player.speed}</p></div>`;
            this.setFight();
        },
        createEnemy(){
            enemies = enemies.filter((enemy) => {
                return enemy.classType !== player.classType; 
            });
            let getHeader = document.querySelector('.char-header');
            let getAction = document.querySelector('.char-action');
            let getEnemy = document.querySelector('.enemy');
            let chooseRandom = Math.floor((Math.random()*(11-0))+0);
            enemy = enemies[chooseRandom];
            getHeader.innerHTML = '<p>Task : Choose your move</p>';
            getAction.innerHTML = '<a href="#" class="btn-prefight" \n\
                                  onclick="playerMoves.attack()">Attack !</a>';
            getEnemy.innerHTML = `<img src="image/${enemy.classType}.jpg">
                                  <div><h3>${enemy.classType.toUpperCase()}</h3>
                                  <p class="health-enemy">Health: ${enemy.health}</p>
                                  <p>Mana: ${enemy.mana}</p>
                                  <p>Strength: ${enemy.strength}</p>  
                                  <p>Stamina: ${enemy.stamina}</p>
                                  <p>Speed: ${enemy.speed}</p></div>`;
        },
        setFight(){
            let getHeader = document.querySelector('.char-header');
            let getAction = document.querySelector('.char-action');
            let getArena = document.querySelector('.arena');
            getHeader.innerHTML = '<p>Task : Find an enemy</p>'
            getAction.innerHTML = '<a href="#" class="btn-prefight" \n\
                                  onclick="gameManager.createEnemy()">Search for enemy</a>'
            getArena.style.visibility = "visible";
        },
        createCharacterPage(charImg1,description1,charName1,
                          charImg2,description2,charName2,
                          charImg3,description3,charName3){
            let getInterface = document.querySelector('.char-interface');
            getInterface.innerHTML = `<a href="#" onclick="gameManager.createCharacter('${charImg1}')">
                                      <img src="image/${charImg1}.jpg" class="img-avatar">
                                      <div><h3>${charName1}</h3>
                                      <p>${description1}</p></div>
                                      </a>
                                      <a href="#" onclick="gameManager.createCharacter('${charImg2}')">
                                      <img src="image/${charImg2}.jpg" class="img-avatar">
                                      <div><h3>${charName2}</h3>
                                      <p>${description2}</p></div>
                                      </a>
                                      <a href="#" onclick="gameManager.createCharacter('${charImg3}')">
                                      <img src="image/${charImg3}.jpg" class="img-avatar">
                                      <div><h3>${charName3}</h3>
                                      <p>${description3}</p></div>
                                      </a>`;
        }
    };

    

