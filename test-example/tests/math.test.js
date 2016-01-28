"use strict";
var expect = require('chai').expect;
var math = require('../math');
var Promise = require('bluebird');

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
            expect(math.absAdd(-2, 3)).to.be.equal(5);
        });

    })

    describe('addEventually', function() {

        it('returns a promise', function() {
            expect(math.addEventually(2, 3)).to.be.instanceof(Promise);
        });

        it('adds two numbers', function() {
            var p = math.addEventually(2, 3)
                .then(function(result) {
                    expect(result).to.be.equal(5);
                    return 5;
                });
            p.then(function(value) {
                console.log(value);
            });
            return p;
        });

    });

});