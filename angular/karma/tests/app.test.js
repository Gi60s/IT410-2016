
describe('guess app', function() {
    "use strict";

    describe('guess provider', function() {
        var guessGameProvider;

        beforeEach(module('gameModule'));
        beforeEach(inject(function() {
            guessGameProvider = this.$providerInjector.get('GuessGameProvider');
        }));

        it('has default max value of 100', function() {
            expect(guessGameProvider.defaultMaxValue).toBe(100);
        });

        it('defines $get', function() {
            expect(typeof guessGameProvider.$get).toBe('function');
        });

        describe('guess game factory', function() {
            var factory;

            beforeEach(function() {
                factory = guessGameProvider.$get();
            });

            it('has 7 remaining', function() {
                var instance = factory(150);
                expect(instance.remaining()).toBe(7);
            });

            it('has 6 remaining after a guess', function() {
                var instance = factory();
                instance.makeGuess(-1);
                expect(instance.remaining()).toBe(6);
            });

        });

    });



    describe('guess provider', function() {
        var appController;

        beforeEach(module('app'));

        beforeEach(inject(function(_$controller_) {
            appController = _$controller_('AppController');
        }));

        it('starts with empty message', function() {
            expect(appController.message).toBe('');
        });


    });

});