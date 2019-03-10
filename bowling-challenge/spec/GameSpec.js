'use strict';

describe('Game', function() {
  var frame;
  var game;
  var pins_standing;
  var mockFramesArray_1;
  var mockFramesArray_2;
  var mockFramesArray_3;
  var mockFrame1;
  var mockFrame2;
  var mockFrame3;
  var mockFrame4;
  var mockFrame5;
  var mockFrame6;
  var mockFrame7;
  var mockFrame8;

  beforeEach(function() {
    frame = new Frame(pins_standing);
    game = new Game();
    pins_standing = new Pin();

    //attempting to get rid of the way frames are called
    mockFrame1 = buildMockFrame(true, false); //inactive frame
    mockFrame2 = buildMockFrame(true, true); //inactive frame
    mockFrame3 = buildMockFrame(false, false); //first active frame
    mockFrame4 = buildMockFrame(false, false); // second
    mockFrame5 = buildMockFrame(true, false); // same as mockFrame1
    mockFrame6 = buildMockFrame(true, false, 10);
    mockFrame7 = buildMockFrame(true, false, 5);
    mockFrame8 = buildMockFrame(true, false, 5);
    mockFramesArray_1 = [mockFrame1, mockFrame2, mockFrame3, mockFrame4];
    mockFramesArray_2 = [mockFrame1, mockFrame5, mockFrame2];
    mockFramesArray_3 = [mockFrame6, mockFrame7, mockFrame8]

  });

it('should contain 10 frames in a new game', function() {
  game.start();
  expect(game.frames.length).toEqual(10);
});

it('starts with a total score of 0', function(){
  game.start();
  expect(game.frameScores.sum()).toEqual(0);
});

it('can build a mock array of frames', function(){
  game.build(mockFramesArray_1);
  expect(game.frames.length).toEqual(4);
});

it('applies the roll to the first active frame', function(){
  game.build(mockFramesArray_1);
  game.bowl(4);
  expect(mockFrame3.bowl).toHaveBeenCalledWith(4);
});

it('does not apply roll to next active frame', function(){
  game.build(mockFramesArray_1);
  game.bowl(4);
  expect(mockFrame4.bowl).not.toHaveBeenCalled();
});

it('applies bonues to frames which need bonus', function(){
  game.build(mockFramesArray_1);
  game.bowl(4);
  expect(mockFrame2.bonusBowl).toHaveBeenCalledWith(4);
});

it('does not apply bonuses to frames which do not need bonus', function(){
  game.build(mockFramesArray_1);
  game.bowl(4);
  expect(mockFrame1.bonusBowl).not.toHaveBeenCalled();
});

it('adds the scores of two bowl in a frame', function(){
  game.start();
  game.bowl(1);
  game.bowl(4);
  expect(game.getTotalScore()).toEqual(5);
});

it('still adds bonus when no active frames, if required', function(){
  game.build(mockFramesArray_2);
  game.bowl(3);
  expect(mockFrame1.bowl).not.toHaveBeenCalled();
  expect(mockFrame2.bowl).not.toHaveBeenCalled();
  expect(mockFrame5.bowl).not.toHaveBeenCalled
  expect(mockFrame2.bonusBowl).toHaveBeenCalled();
});
//get all frames
it('shows array of all frames', function (){
  game.build(mockFramesArray_2);
  expect(game.frames.length).toEqual(3)
});
//getTotalScore
it('sums all scores of all frames', function(){
  game.build(mockFramesArray_3);
  expect(game.getTotalScore()).toEqual(20);
});


function buildMockFrame(isComplete, isExpectingBonus, score) {
  var mockFrame = {
    isComplete: () => isComplete, //these are the functions in the game class that will be defined
    needsBonus: () => isExpectingBonus,
    bowl: () => null,
    bonusBowl: () => null,
    getScore: () => score,
  }
  spyOn(mockFrame, 'bowl')
  spyOn(mockFrame, 'bonusBowl')
  return mockFrame;
};

});
