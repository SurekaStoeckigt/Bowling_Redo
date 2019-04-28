function Frame(pins_standing){
  this._bowls = [];
  this._bonusBowls = [];
  this._pins = [];
  pins_standing = new Pin();

  for (var i = 0; i < 10; i ++){
    this._pins.push(pins_standing)
  };

Frame.prototype.bowl = function(pins_hit){
    this.bowlValidation(pins_hit);
    this._pins.splice(0,pins_hit)
    this._bowls.push(pins_hit);
  };
//
Frame.prototype.bonusBowl = function(pins_hit){
  this._bonusBowls.push(pins_hit);
};
//
Frame.prototype.getBowls = function(){
  return this._bowls.map((bowl) => bowl);
};
//
Frame.prototype.getScore = function(){
  return (this._bowls.sum() + this._bonusBowls.sum());
};
// //
//
Frame.prototype.isComplete = function(){
  return (this._bowls.length === 2 || this.totalPinsHit() === 10);
};
//
Frame.prototype.needsBonus = function(){
  return (this.isSpare() && this._bonusBowls.length < 1)
  || (this.isStrike() && this._bonusBowls.length < 2);
};
//
Frame.prototype.isSpare = function(){
  return (this._bowls.sum() === 10 && this._bowls[0]!=10)
};
//
Frame.prototype.isStrike = function(){
  return (this._bowls[0] === 10)
};
//
Frame.prototype.bowlValidation = function(pins){
  if ((this.totalPinsHit() + pins) > 10) {throw new Error('You cannot knock more than 10 pins down!'); }
  if (pins < 0) {throw new Error('Negative Number!'); }
  if (this.isComplete()) {throw new Error('Too many rolls for this frame!'); }
};
//
Frame.prototype.totalPinsHit = function(){
  return this._bowls.sum();
};
//
Frame.prototype.getBonus = function(){
  return this._bonusBowls.sum();
};
//
Array.prototype.sum = function(){
  for (var i =0, L = this.length, sum = 0; i < L; sum +=this[i++]);
  return sum;
};

};
