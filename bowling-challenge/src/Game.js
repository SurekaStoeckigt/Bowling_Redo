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


Game.prototype.getTotalScore = function(){
  return this.frames.map((frame) => frame.getScore()).reduce((i,j) => i+ j, 0);
};

Game.prototype.getFrameScores = function(){
  return this.frames.map((frame) => frame.getScore())
};

Game.prototype.getAllFrames = function(){
  return this.frames.map((frame) => frame)
};

Game.prototype.bowlStrike = function(){
  this.activeFrame() && this.activeFrame().bowl(10)
}

};
   //each Game game contains 10 frames
