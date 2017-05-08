const should = require('chai').should();

//CHECK FOR SHIP TEST SUITE
describe('checkForShip', function () {
  let checkForShip = require('../game_logic/ship_methods').checkForShip;
  let player;

//BEFORE will create this object before each "checkFor Ship" SPEC runs;
//its the most complex version of the obj that the test uses-> 1 player, many ships, many coordinates
  before(function () {
    player = {
      ships: [
                  { locations: [[0, 0], [0,1]] },
                  { locations: [[1, 0], [1,1]] },
                  { locations: [[0, 0], [0,1], [2,2], [2,4] ]}
      ]
    }; 
  });

//SPEC: that tests no ship present at given coordinates
  it('should correctly report no ship at a given players coordinate', function () {

    checkForShip(player, [9, 9]).should.be.false;
  });

//SPEC: that tests ship present at given coordinates
  it('should correctly report a ship located at the given coordinates', function () {

    checkForShip(player, [0, 0]).should.deep.equal(player.ships[0]);
    //ship = player.ships[0]--> this is what checkForShips now retruns instead of 'true'
  });

//SPEC: that tests for ships with more than one coordinate
  it('should handle ships with more than one coordinate', function () {

    checkForShip(player, [0,1]).should.deep.equal(player.ships[0]);
    checkForShip(player, [0,0]).should.deep.equal(player.ships[0]);
    checkForShip(player, [1,0]).should.deep.equal(player.ships[1]);
    checkForShip(player, [1,1]).should.deep.equal(player.ships[1]);
    checkForShip(player, [2,4]).should.deep.equal(player.ships[2]);
    checkForShip(player, [9, 9]).should.be.false;
  });

//SPEC: that tests for multiple ships at given coordinates
  it('should handle checking multiple ships', function () {
   
    //ship 1
    checkForShip(player, [0,1]).should.deep.equal(player.ships[0]);
    checkForShip(player, [0,0]).should.deep.equal(player.ships[0]);

    //ship 2
    checkForShip(player, [1,0]).should.deep.equal(player.ships[1]);
    checkForShip(player, [1,1]).should.deep.equal(player.ships[1]);

    //test ship
    checkForShip(player, [9, 9]).should.be.false;
  });

//DAMAGE TEST SUITE
describe('damageShip', function() {
    const damageShip = require('../game_logic/ship_methods').damageShip;
    //SPEC: thats tests for damage to a ship at a given coordinate
    it('should register damage on a given ship at a given location', function() {
      let ship = {
        locations: [[0, 0]],
        damage: []
      };
      damageShip(ship, [0,0]);
      (ship.damage).should.not.be.empty;
      (ship.damage[0]).should.deep.equal([0, 0]);
    });
  });

//FIRE TEST SUITE
  describe('fire', function() {
    var fire = require('../game_logic/ship_methods').fire;
    var player; 

//sets up the object to reset each time
    beforeEach(function () {
      player = {
        ships: [
                      { locations: [[0, 0]], 
                        damage: [] }
        ]
      };
    });

      //SPEC: that tests for damage on a players ship at a given coordinate
      it('should record damage on the given players ship at a given coordinate', function() {    

      fire(player, [0,0]);

      (player.ships[0].damage[0]).should.deep.equal([0,0]);
    });
          
      //SPEC: that tests no damage recorded if no ship at given coordinates      
    it('should NOT record damage if there is no ship at given coordinates', function() {

      fire(player, [9,9]);

      (player.ships[0].damage).should.not.deep.equal([0,0]);
    });
  });
});
