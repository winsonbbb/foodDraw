
import $ from 'jquery'
(function() {

    var Machine = function(resultUpdateHandler) {
        var updateResult = resultUpdateHandler,
            updateCandidates = function() {

            },
            updateIsWithoutReplacement = function() {

            };
        function validateHandler(handler) {
            if (!handler || typeof handler != "function") {
                throw "Handler should be a function";
            }
        }

        // The public API encapsulated the data accessing logic
        return {
            registerCandidatesUpdateHandler: function(handler) {
                validateHandler(handler);
                updateCandidates = handler;
            },
            registerUpdateIsWithoutReplacementHandler: function(handler) {
                validateHandler(handler);
                updateIsWithoutReplacement = handler;
            },
            addCandidate: function(s,f) {
                $.post('/addCandidate', {shop:s,foodName: f});
            },
            removeCandidate: function (v) {
                $.post('/removeCandidate', { id: v });
            },
            clearCandidates: function() {
                $.post('/clearCandidates');
            },
            rand: function() {
                $.get('/rand');
            },
            getCandidateList: function(){
                $.get('/getAllFood');
            },
            setWithoutReplacement: function(isWithoutReplacement) {
                $.post('/setWithReplacement', {isWithoutReplacement: isWithoutReplacement});
            }
        }
    };

  this.Machine = Machine;

}).apply(this);
