Template.tweetBox.onRendered(function () {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
    this.numChars = new ReactiveVar(0);
    Session.set('numChars', 0);
});
Template.tweetBox.onCreated(function () {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
    this.numChars = new ReactiveVar(0);
    Session.set('numChars', 0);
});


Template.tweetBox.onCreated(function () {
    if (Meteor.user()) {
        this.subscribe('ownBooks', Meteor.user().username);
    }
});



Template.tweetBox.events({
    'input #tweetText': function () {
        Session.set('numChars', $('#tweetText').val().length);

    },


    'click #tweetbutton': function () {
        var tweet = $('#tweetText').val();
        $('#tweetText').val("");
        $('#tweetbox').css('display', 'none');
        if ($('#newbookcheck').is(':checked')) {
            var booktitle = $('#booktitle').val();
            $('#booktitle').val("");
            var coverlink = $('#coverlink').val();
            console.log($('#togglebutton').is(':checked'));
            var butterfly = $('#togglebutton').is(':checked');
            if (coverlink == "") {
                coverlink = "/defaultcover.png";
            }
            $('#coverlink').val("");
            var chaptertitle = $('#chaptertitle').val();
            $('#chaptertitle').val("");
            var booksummary = $('#summaryBook').val();
            $('#summaryBook').val("");
            console.log(booksummary);
            var selected = $('[name="myMultiselect"]').find("option:selected");
            var genres = [];
            selected.each(function () {
                genres.push($(this).val());
            });
            console.log(genres);
            Meteor.call('insertBook', booktitle, coverlink, tweet, chaptertitle, butterfly, booksummary, genres, "");
            genres = [];
            $('[name="myMultiselect"]').multiselect('deselectAll', false);
            $('[name="myMultiselect"]').multiselect('updateButtonText');
            Session.set('numChars', 0);
        } else {
            var title = $('#sel1').val();
            var chaptertitle = $('#chaptertitle').val();
            var visibility = $('#visibility').text();
            console.log($('#visibility').text());
            $('#chaptertitle').val("");
            Session.set('numChars', 0);
            Meteor.call('insertTweet', tweet, title, chaptertitle, visibility);
        }
        var shadowdiv= document.getElementById('shadow');
        shadowdiv.style.display='none';
    }
});

Template.tweetBox.helpers({
    charCount: function () {

        return 25000 - Session.get('numChars');
    },

    charClass: function () {

        if (Session.get('numChars') > 25000) {
            return 'errCharCount';
        } else {
            return 'charCount';
        }
    },


    disableButton: function () {

        if (Session.get('numChars') <= 0 || Session.get('numChars') > 25000 || !Meteor.user()) {
            return 'disabled'
        }
    },


    'bookEntity': function () {
        if (Meteor.user() != null) {
            if (Meteor.user().username != null) {
                return Booklist.find({
                    user: Meteor.user().username
                }, {
                    sort: {
                        timestamp: -1
                    },
                    limit: 25
                });
            } else {
                return "";
            }
        }
    },
    myOptions() {
        return [
            {
                _id: 'action',
                caption: 'Action'
            },
            {
                _id: 'adventure',
                caption: 'Adventure'
            },
            {
                _id: 'comedy',
                caption: 'Comedy'
            },
            {
                _id: 'drama',
                caption: 'Drama'
            },
            {
                _id: 'diary',
                caption: 'Diary'
            },
            {
                _id: 'fantasy',
                caption: 'Fantasy'
            },
            {
                _id: 'history',
                caption: 'History'
            },
            {
                _id: 'mystery',
                caption: 'Mystery'
            },
            {
                _id: 'romance',
                caption: 'Romance'
            },
            {
                _id: 'science fiction',
                caption: 'Science fiction'
            }

    ]
    },
    selectedOptions() {
        return []
    }

});