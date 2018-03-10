Template.userManagement.events({
    'click #signup': function () {
        var user = {
            username: $('#signup-username').val(),
            password: $('#signup-password').val(),
            profile: {
                fullname: $('#signup-fullname').val()
            }
        };

        Accounts.createUser(user, function (error) {

            if (error) {
                alert(error);
            } else {
                console.log(Meteor.userId());
                Meteor.call('setUserRole', Meteor.userId());
            }
        });


    }
});

Template.userManagement.events({
    'click #login': function () {
        var username = $('#login-username').val();
        var password = $('#login-password').val();

        Meteor.loginWithPassword(username, password, function (error) {
            if (error) alert(error);
        });
    },
    'click #logout': function () {
        Meteor.logout();
    }
});

Template.userManagement.helpers({
    'tweets': function () {
        if (Meteor.user()) {
            return Tweets.find({
                user: Meteor.user().username
            }).count();
        }
    },

    'following': function () {
        if (Meteor.user()) {
            return Relationships.find({
                follower: Meteor.user().username
            }).count();
        }
    },

    'followers': function () {
        if (Meteor.user()) {
            return Relationships.find({
                following: Meteor.user().username
            }).count();
        }
    },

    'getUser': function () {
        if (Meteor.user()) {
            return Meteor.user().username;
        }
    }
});

Template.userManagement.onCreated(function () {
    if (Meteor.user()) {
        this.subscribe('followings', Meteor.user().username);
        this.subscribe('followers', Meteor.user().username);
        this.subscribe('tweets', Meteor.user().username);
        this.subscribe('ownTweets', Meteor.user().username);
        this.subscribe('ownBooks', Meteor.user().username);
        this.subscribe('bookfollow', Meteor.user().username);
        this.subscribe('Books');
        this.subscribe('Prompts');
        this.subscribe('bookChaptersAll');
        this.subscribe('Ratings');
        this.subscribe('Images');
        this.subscribe('Comments');
        if (Router.current() != null) {
            this.subscribe('users', Router.current().params.username);
        }
        this.subscribe('files.images.all');
        this.subscribe('Butterfly');
    }
});

Router.route('/', function () {
    this.render('featured');
});

Router.route('feed', function () {
    this.render('tweetFeed');
});

Router.route('prompts', function () {
    this.render('prompts');
});

Router.route('discover', function () {
    this.render('discover');
});

Router.route('profile/:username', function () {
    this.render('userprofile');
});

Router.route('dashboard', function () {
    this.render('dashboard');
});

Router.route('dashboard/books', function () {
    this.render('dashboardbooks');
});

Router.route('search', function () {
    this.render('followUsers');
});

Router.route('following', function () {
    if (Meteor.user() != null) {
        this.wait(Meteor.subscribe('followingBooks', Meteor.user().username));
        if (!this.ready()) {
            this.render();
        } else {
            this.render('followedBooks');
        }
    }
});

Router.route('/book/:_id', function () {
    var params = this.params; // { _id: "5" }
    var id = params._id; // "5"
    this.render('bookprofile');
});

Router.route('/prompt/:_id', function () {
    var params = this.params; // { _id: "5" }
    var id = params._id; // "5"
    this.render('promptprofile');
});

Router.route('/book/:_id/chapter/:chapterid', function () {
    var params = this.params; // { _id: "5" }
    var id = params._id; // "5"
    var chapterid = params.chapterid;
    this.wait(Meteor.subscribe('Books'));
    if (!this.ready()) {

    } else {
        this.render('chapter');
    }
});


AdminConfig = {
    name: 'My App',
    collections: {
        Tweets: {
            tableColumns: [
                {
                    label: 'Title',
                    name: 'chaptertitle'
                },
                {
                    label: 'Content',
                    name: 'message'
                },
                {
                    label: 'User',
                    name: 'user'
                }
            ]
        },
        Booklist: {
            tableColumns: [
                {
                    label: 'Title',
                    name: 'booktitle'
                },
                {
                    label: 'Chaptercount',
                    name: 'chaptercount'
                },
                {
                    label: 'Viewercount',
                    name: 'viewercount'
                },
                {
                    label: 'Rating',
                    name: 'rating'
                },
                {
                    label: 'Butterfly?',
                    name: 'butterfly'
                },
                {
                    label: 'User',
                    name: 'user'
                }
            ]
        },
        Bookfollow: {
            tableColumns: [
                {
                    label: 'User',
                    name: 'followername'
                },
                {
                    label: 'following',
                    name: 'following'
                },
                {
                    label: 'Saw new chapter?',
                    name: 'sawnewChapter'
                },
                {
                    label: 'Bookmark',
                    name: 'bookmark'
                }
            ]
        }
    },
    userSchema: null,
    userColumns: [
        {
            label: 'User',
            name: 'username'
        }
         ]
};