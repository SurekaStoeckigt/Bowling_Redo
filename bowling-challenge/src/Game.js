function Game(){
   this.frames = [];
   this.frameScores = [];
   this.frameNumber = 1;
   this.score = 0;
   this.bonuses = [];

Game.prototype.start = function() {
  for (var i=0; i < 10; i ++){
    this.frames[i] = new Frame();
  };
};

Game.prototype.build = function(frames_array){

  this.frames = frames_array
};

Game.prototype.bowl = function(pins_hit){
  this.framesExpectingBonus().forEach((frame) => frame.bonusBowl(pins_hit));
  this.activeFrame() && this.activeFrame().bowl(pins_hit)
};

Game.prototype.framesExpectingBonus = function(){
  return this.frames.filter((frame) => frame.needsBonus());
};

Game.prototype.activeFrame = function(){
  return this.frames.find((frame) => !frame.isComplete());
}

// Game.prototype.pushTotalForFrame = function(){
// //sum elements of this.frames
// for (var i=0; i < 10; i ++){
//   this.frameScores.push(this.frames[i].score.sum())
//   this.frameNumber = this.frameScores.indexOf(this.frames[i].score.sum())+ 1;
// };
// };

Game.prototype.getTotalScore = function(){
  return this.frames.map((frame) => frame.getScore()).reduce((i,j) => i+ j, 0);
};

Game.prototype.getFrameScores = function(){
  return this.frames.map((frame) => frame.getScore())
};

Game.prototype.getAllFrames = function(){
  return this.frames.map((frame) => frame)
};
// Array.prototype.sum = function(){
//   for (var i =0, L = this.length, sum = 0; i < L; sum +=this[i++]);
//   return sum;
// };
// Game.prototype.frameValidation = function(frame) {
//   if (frame > 10){throw new Error('This Game is Over!'); }
// };
// Game.prototype.applyBonuses = function(){
//   for (var i = 0; i < 9; i ++) {
//     if(this.frames[i].isSpare()){
//       this.bonuses.push(this.frames[i + 1].score[0])}
//       this.bonusScore = this.bonuses.sum();
//   }
// };


};
   //each Game game contains 10 frames
