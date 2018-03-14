import Quill from 'quill';
var quill;
Template.bookprofile.helpers({
    treeArgs: {
        "collection": Butterfly,
        "subscription": "Butterfly",
        "parent": Session.get("bookRoot"),
        "select": null,
        "openAll": false,
        "selectAll": false,
        "mapping": {
            "text": "chaptertitle"
        }

    },
    'butterID': function () {
        var rootChapter = Butterfly.findOne({
            bookid: Router.current().params._id,
            chapternumber: 0
        });
        if (rootChapter) {
            return rootChapter._id;
        } else {
            return "";
        }

    },
    'shouldbetrue': function () {
        console.log(Session.get("bookRoot") == Router.current().params._id);
        return (Session.get("bookRoot") == Router.current().params._id);
    },
    'tweetMessage': function () {
        return Tweets.find({}, {
            sort: {
                timestamp: -1
            },
            limit: 10
        });
    },
    'isButterfly': function () {
        var butterfly = Booklist.find({
            _id: Router.current().params._id,
            butterfly: true
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        }).count();

        if (butterfly > 0) {

            return true;
        } else {
            return false;
        }
    },
    'bookEntity': function () {
        return Booklist.find({
            _id: Router.current().params._id
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        });
    },
    'bookChapters': function () {
        return Tweets.find({
            bookid: Router.current().params._id
        }, {
            sort: {
                timestamp: -1
            },
            limit: 2500
        });
    },
    'isfollowing': function () {
        var isfollowingbook = Bookfollow.find({
            followername: Meteor.user().username,
            following: Router.current().params._id
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        }).count();
        if (isfollowingbook == 1) {
            return 'btn btn-info';
        } else {
            return 'btn btn-default';
        }
    },
    'followIcon': function () {
        var isfollowingbook = Bookfollow.find({
            followername: Meteor.user().username,
            following: Router.current().params._id
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        }).count();
        if (isfollowingbook == 1) {
            return '<i class="fa fa-check-circle" aria-hidden="false"></i>';
        } else {
            return '<i class="fa fa-bookmark" aria-hidden="true"></i>';
        }
    },
    'isfollowingText': function () {
        var isfollowingbook = Bookfollow.find({
            followername: Meteor.user().username,
            following: Router.current().params._id
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        }).count();
        if (isfollowingbook == 1) {
            return 'Following';
        } else {
            return 'Follow';
        }
    },
    'isMyBook': function () {
        var ismybook = Booklist.find({
            _id: Router.current().params._id,
            user: Meteor.user().username
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        }).count();
        localStorage.setItem('EditMode', '0');
        Session.setPersistent('EditMode', 0);
        if (ismybook > 0) {
            EditMode = false;
            return true;
        } else {
            EditMode = false;
            return false;
        }

    },
    'EditModeButton': function () {
        if (Session.get('EditMode') == 1) {
            return 'inline-block';
        } else {
            return 'none';
        }
    },
    'hasRating': function () {
        if (Ratings.find({
                bookid: Router.current().params._id,
                user: Meteor.user().username
            }).count() == 1) {
            return true;
        } else {
            return false;
        }
    },
    'EditModeButtonNegativ': function () {
        if (Session.get('EditMode') == 0) {
            return 'inline-block';
        } else {
            return 'none';
        }
    },
    'getTime': function (oldtime) {

        var seconds = Math.floor((new Date() - oldtime) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    },
    'isEditMode': function () {
        if (Session.get('EditMode') == 1) {
            return true;
        } else {
            return false;
        }
    },
    'buttontext': function () {
        if (Session.get('EditMode') == 1) {
            return 'Save Changes';
        } else {
            return 'Edit book';
        }
    }
});

Template.bookprofile.events({
    'click #follow': function (event) {
        var book = Booklist.find({
            _id: Router.current().params._id
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        });
        var isfollowingbook = Bookfollow.findOne({
            followername: Meteor.user().username,
            following: Router.current().params._id
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        });
        if (isfollowingbook) {
            console.log("following");
            console.log(isfollowingbook._id);
            if (book) {
                Meteor.call('unfollowBook', isfollowingbook._id);
                $('#follow').removeClass('btn-default');
                $('#follow').addClass('btn-info');
            }
        } else {
            console.log("not following");
            Meteor.call('followBook', Router.current().params._id);
            $('#follow').addClass('btn-default');
            $('#follow').removeClass('btn-info');
        }

    },
    'click #editbook': function (event) {
        console.log("click");
        if (Session.get('EditMode') == 1) {
            $('#editbook').addClass('btn-default');
            $('#editbook').removeClass('btn-danger');
            var newtitle = $('#booktitledit').val();
            var newsummary = $('#summaryedit').val();
            console.log(newtitle + "  " + newsummary);
            Meteor.call('updateBookTitle', Router.current().params._id, newtitle);
            Meteor.call('updateBookSummary', Router.current().params._id, newsummary);
            quill.enable(false);
            localStorage.setItem('EditMode', '0');
            Session.setPersistent('EditMode', 0);
        } else {
            $('#editbook').addClass('btn-danger');
            $('#editbook').removeClass('btn-default');
            $('[data-toggle="tooltip"]').tooltip();
            quill.enable(true);
            localStorage.setItem('EditMode', '1');
            Session.setPersistent('EditMode', 1);
        }


    },
    'click .btn': function (event) {
        if (event.currentTarget.id != 'editbook' && event.currentTarget.id != 'follow' && event.currentTarget.id != 'delbook' && event.currentTarget.id != 'edittitlebtn') {
            alert("You are about to delete Chapter " + event.currentTarget.id);
            Meteor.call('removeChapter', event.currentTarget.id);
            localStorage.setItem('EditMode', '1');
            Session.setPersistent('EditMode', 1);

        } else {
            //alert("Edit Button clicked");
        }


    },
    'click #delbook': function (event) {
        Meteor.call('deleteBook', Router.current().params._id);


    },
    'click .rating' (event) {
        const rating = $(event.target).val();
        Meteor.call('rateBook', Router.current().params._id, rating);
    },
    'click #edittitlebtn': function () {
        var cmnt = $('#title').val();
        $('#title').val('');
        Meteor.call('updateBookTitle', Router.current().params._id, cmnt);

    }


});

Template.bookprofile.onCreated(function () {
    if (Meteor.user()) {
        this.subscribe('tweets', Meteor.user().username);
        this.subscribe('ownTweets', Meteor.user().username);
        this.subscribe('bookChapters', Router.current().params._id);
        this.subscribe('bookfollow', Meteor.user().username);
        this.subscribe('followingBooks', Meteor.user().username);
        this.subscribe('bookChaptersAll');
        this.subscribe('hiddenTweets', Meteor.user().username);
        this.subscribe('Books');
        this.subscribe('Ratings');
        this.subscribe('Butterfly');
        Meteor.call('markasNotified', Router.current().params._id);
        Meteor.call('incViewNumber', Router.current().params._id);

        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();

        });
        this.autorun(function () {
            var rootChapter = Butterfly.findOne({
                bookid: Router.current().params._id,
                chapternumber: 0
            });
            if (rootChapter) {
                Session.set("bookRoot", rootChapter._id);
                //console.log(Session.get("bookRoot"),);
            }
        });


    }
});

Template.bookprofile.onRendered(function () {

    this.autorun(function () {
        var rootChapter = Butterfly.findOne({
            bookid: Router.current().params._id,
            chapternumber: 0
        });
        if (rootChapter) {
            Session.set("bookRoot", rootChapter._id);
            //console.log(Session.get("bookRoot"),);
        }


        $('#editbook').addClass('btn-default');
        $('#editbook').removeClass('btn-danger');

        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();

            quill = new Quill('#editor', {
                theme: 'bubble'
            });
            quill.enable(false);
        });

    });
});



//fix das nicht löschen von notificationen wenn der user auf einer seite ist