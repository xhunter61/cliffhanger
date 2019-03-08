import Quill from 'quill';
var quillbox;
Template.tweetBox.onRendered(function () {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
    this.numChars = new ReactiveVar(0);
    Session.set('numChars', 0);



    this.autorun(function () {

        //quillbox = new Quill('#editor', {
        //  theme: 'snow'
        //});
    });

});
Template.tweetBox.onCreated(function () {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
    this.numChars = new ReactiveVar(0);
    Session.set('numChars', 0);
    this.autorun(function () {

    });
});


Template.tweetBox.onCreated(function () {
    if (Meteor.user()) {
        this.subscribe('ownBooks', Meteor.user().username);
    }
});



Template.tweetBox.events({
    'click #toggleBox': function () {
        console.log("blub");
        var div = document.getElementById('tweetbox');
        var togglebox = document.getElementById('toggleBox');
        var shadowdiv = document.getElementById('shadow');
        if (div.style.display == 'inline') {
            div.style.display = 'none';
            togglebox.innerHTML='<i class="fa fa-pencil-square-o" aria-hidden="true"></i><strong> Write!</strong>';
            $('#toggleBox').addClass('btn-info');
            $('#toggleBox').removeClass('btn-danger');
            togglebox.style.backgroundColor='#107896';
            shadowdiv.style.display = 'none'
            $('#tweetbox').removeClass('tweetboxAnim2');
        } else {
            div.style.display = 'inline';
            shadowdiv.style.display = 'block'
            togglebox.innerHTML='<i class="fa fa-times" aria-hidden="true" style=""></i><strong> Close</strong>';
            $('#toggleBox').addClass('btn-danger');
            $('#toggleBox').removeClass('btn-info');
            togglebox.style.backgroundColor='#f44336';
            $('#tweetbox').addClass('tweetboxAnim2');
            console.log("showing tweetbox")
        }
        if (quillbox == null) {
            var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{
                    'header': 1
                }, {
                    'header': 2
                }], // custom button values
  [{
                    'list': 'ordered'
                }, {
                    'list': 'bullet'
                }],
  [{
                    'script': 'sub'
                }, {
                    'script': 'super'
                }], // superscript/subscript
  [{
                    'indent': '-1'
                }, {
                    'indent': '+1'
                }], // outdent/indent
  [{
                    'direction': 'rtl'
                }], // text direction

  [{
                    'size': ['small', false, 'large', 'huge']
                }], // custom dropdown
  [{
                    'header': [1, 2, 3, 4, 5, 6, false]
                }],

  [{
                    'color': []
                }, {
                    'background': []
                }], // dropdown with defaults from theme
  [{
                    'font': []
                }],
  [{
                    'align': []
                }],

  ['clean'] // remove formatting button
];




            quillbox = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
        }
    },
    'click #tweetbutton': function () {
        var tweet = quillbox.getContents();
        $('#tweetText').val("");
        $('#tweetbox').css('display', 'none');
        var togglebox = document.getElementById('toggleBox');
        togglebox.innerHTML='<i class="fa fa-pencil-square-o" aria-hidden="true"></i><strong> Write!</strong>';
        $('#toggleBox').addClass('btn-info');
        $('#toggleBox').removeClass('btn-danger');
        togglebox.style.backgroundColor='#107896';
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
            var visibility = $('#visibility').text();
            var genres = [];
            selected.each(function () {
                genres.push($(this).val());
            });
            console.log(genres);
            Meteor.call('insertBook', booktitle, coverlink, tweet, chaptertitle, butterfly, booksummary, genres, "", visibility);
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
            console.log(quillbox.getLength());
            Meteor.call('insertTweet', tweet, title, chaptertitle, visibility);
        }
        var shadowdiv = document.getElementById('shadow');
        shadowdiv.style.display = 'none';
    },
    'input .ql-editor': function () {
        Session.set('numChars', quillbox.getLength() - 1);
        console.log(quillbox.getLength() - 1);

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

        if (Session.get('numChars') <= 1 || Session.get('numChars') > 25000 || !Meteor.user()) {
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