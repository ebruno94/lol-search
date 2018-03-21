import $ from 'jquery';

export let pong = {
  p1_position_y: 0,
  p2_position_y: 0,
  p1_position_x: 65,
  p2_position_x: 735,
  b_position_x: 400,
  b_position_y: 300,
  b_velocity_x: 2,
  b_velocity_y: 0,
  p1_score: 0,
  p2_score: 0,
  playing: false,
  canvas: undefined,
  ctx: undefined,
  // 800 x 600 canvas

  startGame: function(){
    pong.canvas = document.getElementById('pongCanvas');
    pong.ctx = this.canvas.getContext('2d');
    requestAnimationFrame(pong.frame);
  },
  frame: () => {
    pong.ctx.clearRect(0, 0, 800, 600);
    pong.drawPaddle1();
    pong.drawPaddle2();
    pong.drawBall();
    pong.setBallVelocity(pong.checkBallPaddleState());
    pong.moveBall();
    requestAnimationFrame(pong.frame);
  },
  checkPlaying: function(){},
  reset: function(){},

  drawPaddle1: function(){
    pong.ctx.beginPath();
    pong.ctx.fillRect(15, pong.p1_position_y, 50, 150);
    pong.ctx.closePath();
  },

  drawPaddle2: function(){
    pong.ctx.beginPath();
    pong.ctx.fillRect(735, pong.p2_position_y, 50, 150);
    pong.ctx.closePath();
  },

  movePaddle: function(event){
    // w = 87
    // s = 83
    // upArrow = 38
    // downArrow = 40
    switch(event){
      case 87:
        if (pong.p1_position_y >= 0) pong.p1_position_y-=20;
        break;
      case 83:
        if (pong.p1_position_y <= 450) pong.p1_position_y+=20;
        break;
      case 38:
        if (pong.p2_position_y >= 0) pong.p2_position_y-=20;
        break;
      case 40:
        if (pong.p2_position_y <= 450) pong.p2_position_y+=20;
      }
  },

  moveBall: function(){
    pong.b_position_x += pong.b_velocity_x;
    pong.b_position_y += pong.b_velocity_y;
  },

  setBallVelocity: function(){
    const state = pong.checkBallPaddleState();
    pong.setBallVelocityX(state);
    pong.setBallVelocityY(state);
  },

  setBallVelocityX: function(state){
    // state -1 = just hit p1Paddle
    // state 0 = has not hit p1Paddle
    // state +1 = just hit p2Paddle
    switch (state) {
      case -1:
        pong.b_velocity_x = 5;
        break;
      case 1:
        pong.b_velocity_x = -5;
        break;
      case 0:
        break;
    }
  },

  checkBallPaddleState: function(){
    if(pong.b_position_x <= pong.p1_position_x && (pong.b_position_y >= pong.p1_position_y && pong.b_position_y <= pong.p1_position_y + 150)) {
      return -1;
    }
    if(pong.b_position_x >= pong.p2_position_x && (pong.b_position_y >= pong.p2_position_y && pong.b_position_y <= pong.p2_position_y + 150)) {
      return 1;
    }
    return 0;
  },

  setBallVelocityY: function(state){
    // state -1 = just hit top wall
    // state 0 = has not hit wall
    // state 1 = just hit bottom wall
    if (pong.b_position_y <= 0 || pong.b_position_y >= 600) pong.b_velocity_y *= -1;
    if (state === 1 || state === -1) {
      let randomNumber = Math.floor(Math.random()*10);
      randomNumber = (Math.floor(Math.random()*2 === 1)) ? randomNumber*-1 : randomNumber;
      pong.b_velocity_y = randomNumber;
    }
  },

  drawBall: function(){
    pong.ctx.beginPath()
    pong.ctx.arc(pong.b_position_x, pong.b_position_y, 25, 0, Math.PI * 2, false);
    pong.ctx.fill();
    pong.ctx.closePath();
  },
}
