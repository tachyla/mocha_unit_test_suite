const should = require('chai').should();
//Test Suite
//a tricial check is a sanity check
//to confirm everythings working
const greet = 'hello world!'; 

describe('Mocha', function() {
    //Test spec(unit test)
    it('should run our test using npm', function(){
        greet.should.be.ok;
    });
});