/*
describe('app', function() {
    "use strict";

    describe('GuessGameProvider', function() {
        var guessGameProvider;

        beforeEach(module('app'));
        beforeEach(inject(function(){
            guessGameProvider = this.$providerInjector.get('GuessGameProvider');
        }));

        it('default value 100', function() {
            expect(guessGameProvider.defaultMaxValue).toEqual(100);
        });

        it('can set default value', function() {
            guessGameProvider.defaultMaxValue = 50;
            expect(guessGameProvider.defaultMaxValue).toEqual(50);
        });

        it('defines $get', function() {
            expect(typeof guessGameProvider.$get).toEqual('function');
        });
    });

    describe('GuessGame', function() {
        var guessGame;

        beforeEach(module('app'));
        beforeEach(inject(function(_GuessGame_){
            guessGame = _GuessGame_;
        }));

        it('returns a function', function() {
            expect(typeof guessGame).toEqual('function');
        });

        describe('remaining', function() {
            var factory;

            beforeEach(function(){
                factory = guessGame();
            });

            it('initializes to 7 guesses', function() {
                expect(factory.remaining()).toEqual(7);
            });
        });
    });

    describe('AppController', function() {
        var appController;

        beforeEach(module('app'));
        beforeEach(inject(function(_$controller_){
            appController = _$controller_('AppController', {});
        }));

        it('defaults message to empty string', function() {
            expect(appController.message).toEqual('');
        });

    });

});*/
