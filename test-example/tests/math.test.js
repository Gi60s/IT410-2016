"use strict";
var expect = require('chai').expect;
var math = require('../math');

describe('math', function() {

    describe('add', function() {

        it('two positive numbers', function() {
            expect(math.add(2, 3)).to.be.equal(5);
        });

        it('one negative, one positive', function() {
            expect(math.add(-2, 3)).to.be.equal(1);
        });

    });

    describe('absAdd', function() {

        it('two positive numbers', function() {
            expect(math.add(2, 3)).to.be.equal(5);
        });

        it('one negative, one positive', function() {
            expect(math.add(-2, 3)).to.be.equal(5);
        });

    })

});