'use strict';

describe('Frame', function(){
  var frame;
  var pins_standing;
  var second_frame;

  beforeEach(function(){
    frame = new Frame(pins_standing);
    pins_standing = new Pin();
    second_frame = new Frame(pins_standing);
  })

  // it('each frame should contain 10 pins', function(){
  //   expect(frame.pins.length).toEqual(10);
  // })

  it('cannot knock more than 10 pins in one frame', function(){
    expect(function(){frame.bowl(11)}).toThrowError('You cannot knock more than 10 pins down!')
  })

  it('cannot knock less than 0 pins in one frame', function(){
    expect(function(){frame.bowl(-1)}).toThrowError('Negative Number!')
  })

  it('cannot roll more than twice in a frame', function(){
    frame.bowl(1)
    frame.bowl(1)
    expect(function(){frame.bowl(0)}).toThrowError('Too many rolls for this frame!')

  });

  it('should only contain two scores', function(){
    frame.bowl(1)
    frame.bowl(3)
    expect(frame.getScore()).toEqual(4)
  });

  it('can bowl a strike', function(){
    frame.bowl(10);
    expect(frame.getScore()).toEqual(10)
  });

  it('should know when STRIKE is bolwed', function(){
    frame.bowl(10);
    expect(frame.isStrike()).toEqual(true)
  });


  it('should know when Spare is bowled', function(){
    frame.bowl(3)
    frame.bowl(7)
    expect(frame.isSpare()).toEqual(true)
    //spare is when the second roll knocks all remaining pins down
  });
  //describe isComplete
  it('knows it is complete when twol bowls are rolled', function(){
    frame.bowl(1)
    frame.bowl(1)
    expect(frame.isComplete()).toEqual(true)
  });

  it('knows it is complete when 10 pins are knocked down', function(){
    frame.bowl(10)
    expect(frame.isComplete()).toEqual(true)
  });

  it('knows when it is not complete', function(){
    frame.bowl(9)
    expect(frame.isComplete()).toEqual(false)
  });

  //recordsBonus
  it('adds bonus from spare to score', function(){
    frame.bowl(2)
    frame.bowl(8)
    frame.bonusBowl(8)
    expect(frame.getScore()).toEqual(18)
  });

  it('needs bonus for half strike', function(){
    frame.bowl(3)
    frame.bowl(7)
    expect(frame.needsBonus()).toEqual(true)
  });

  it('does not require bonus if bonus was recorded for halfstrike', function(){
    frame.bowl(3)
    frame.bowl(7)
    second_frame.bowl(2)
    expect(second_frame.needsBonus()).toEqual(false)
  })

  it('needs bonus if strike is bowled', function(){
    frame.bowl(10);
    expect(frame.needsBonus()).toEqual(true)
  });

  it('does not need bonus if 2 bonuses are recorded', function(){
    frame.bowl(10)
    frame.bonusBowl(10)
    frame.bonusBowl(10)
    expect(frame.needsBonus()).toEqual(false)
  });

});
