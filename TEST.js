const MAX_ENEMY = 7;

const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div');

  const audio = document.createElement('embed');

  audio.src = "audio.mp3";
  audio.type = "audio/mp3";
  audio.style.cssText = `position: absolute; top: -1000px;`;
  audio.volume = 0.5;

  car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 6,
  traffic: 3
};

start.style.left = gameArea.offsetLeft;

function getQuantityElements(heightElement){
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() { 
  gameArea.innerHTML = '';
  car.style.left = '150px'; 
  car.style.top = 'auto';
  car.style.bottom ='10px';
  for ( let i = 0; i < getQuantityElements(100); i++){
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    gameArea.append(line);
    line.y = (i * 100);
  }
  start.classList.add('hide');
  setting.start = true;
  gameArea.append(car);
  document.documentElement.append(audio);
  requestAnimationFrame(playGame);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;

  setting.score = 0;
 
  
  for( let i = 0; i < getQuantityElements(100 * setting.traffic); i++){
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    let enemyNumber = Math.floor(Math.random() * MAX_ENEMY ) + 1;
    console.log(enemyNumber);
    enemy.y = - 100 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = `transparent url("./enemy${enemyNumber}.png") center / cover no-repeat `;
    gameArea.append(enemy);
  } 
  
  
}

function playGame() {
  if(setting.start){
    setting.score += setting.speed;
    score.textContent = 'SCORE: ' + setting.score;
    moveRoad();
    moveEnemy();
    if(keys.ArrowLeft && setting.x > 0){
      setting.x -= setting.speed;
    }

    if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
      setting.x += setting.speed;
    }

    if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
      setting.y += setting.speed;
    }
    if(keys.ArrowUp && setting.y > 0){
      setting.y -= setting.speed;
    }
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';
    requestAnimationFrame(playGame);
  }
}

function startRun(event) {
    
    if(keys.hasOwnProperty(event.key)){
      keys[event.key] = true;
      event.preventDefault();
    }
}

function stopRun(event) {
  if(keys.hasOwnProperty(event.key)){
    keys[event.key] = false;
    event.preventDefault();
  }
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function(line) {
    line.y += setting.speed;
    line.style.top = line.y + 'px';

    if (line.y >= document.documentElement.clientHeight){
      line.y = -100;
    }
  })
}
function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function(item){
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if(carRect.top <= enemyRect.bottom 
      && carRect.right >= enemyRect.left
      && carRect.left <= enemyRect.right
      && carRect.bottom >= enemyRect.top){
      setting.start = false;
      audio.remove();
      start.classList.remove('hide');
      score.style.top = start.offsetHeight;
    }
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';
    if (item.y >= document.documentElement.clientHeight){
      item.y = - 100 * setting.traffic;
      let enemyNumber = Math.floor(Math.random() * MAX_ENEMY ) + 1;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
      item.style.background = `transparent url("./enemy${enemyNumber}.png") center / cover no-repeat `;
    }
  }) 

}