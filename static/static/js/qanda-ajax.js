$(document).ready(function() {


// initialize all popovers on page
$(function () {
  $('[data-toggle="popover"]').popover({html:true})
});


// QUESTIONS VOTES CONTROLS

// question votes-up control
$('a.perg_upvote').click(function(){
    pergid = $(this).attr("data-pergid");
    var $th = $(this);
    var myId = $(this).attr('id');
    
    // if it is active, turn off and remove 1 vote
    if($th.hasClass('active')) {    
        $.get('/downvote/', {pergunta_id: pergid}, function(data){
            $('p#'+myId).html(data);
            $('.perg_upvote#'+myId).removeClass( 'upvote-on' ).removeClass( 'active' ).addClass( 'upvote-off' );
        });
        mixpanel.track("Vote", {
            "Vote (Up or Down)": "Up",
            "Content": "Question",
            "Question ID": pergid,
            "Toggle On Off": "Off",
        });
    }
    
    // if vote down is active, turn down off, turn up on and add 2 votes
    else if ($('.perg_downvote#'+myId).hasClass('active')) {
        $.get('/upvote/', {pergunta_id: pergid});
        $.get('/upvote/', {pergunta_id: pergid}, function(data){
            $('p#'+myId).html(data);
            $('.perg_downvote#'+myId).removeClass( 'downvote-on' ).removeClass( 'active' ).addClass( 'downvote-off' );
            $('.perg_upvote#'+myId).addClass('active').addClass( 'upvote-on' );
        });
        mixpanel.track("Vote", {
            "Vote (Up or Down)": "Up",
            "Content": "Question",
            "Question ID": pergid,
            "Toggle On Off": "On",
        });
     
    }    
    
    // if none of votes are active, turn on and add a vote
    else {
        $th.addClass('active');
        $.get('/upvote/', {pergunta_id: pergid}, function(data){
                   $('p#'+myId).html(data);
                   $('.perg_upvote#'+myId).removeClass( 'upvote-off' ).addClass( 'upvote-on' );
                   $('.perg_downvote#'+myId).removeClass( 'downvote-on' ).removeClass( 'active' ).addClass( 'downvote-off' );
        });
        mixpanel.track("Vote", {
            "Vote (Up or Down)": "Up",
            "Content": "Question",
            "Question ID": pergid,
            "Toggle On Off": "On",
        });
    };
});



// question down votes control
$('a.perg_downvote').click(function(){
    pergid = $(this).attr("data-pergid");
    var $th = $(this);
    var myId = $(this).attr('id');
    console.log(myId)
    
    // if is active, tur it off and remove one vote
    if($th.hasClass('active')) {
        $.get('/upvote/', {pergunta_id: pergid}, function(data){
            $('p#'+myId).html(data);
            $('.perg_downvote#'+myId).removeClass( 'downvote-on' ).removeClass( 'active' ).addClass( 'downvote-off' );
        });
        mixpanel.track("Vote", {
            "Vote (Up or Down)": "Down",
            "Content": "Question",
            "Question ID": pergid,
            "Toggle On Off": "Off",
        });
    }
    
    // if vote up is active, turn up off, turn down on and remove 2 votes
    else if ($('.perg_upvote#'+myId).hasClass('active')) {
     $.get('/downvote/', {pergunta_id: pergid});
     $.get('/downvote/', {pergunta_id: pergid}, function(data){
            $('p#'+myId).html(data);
            $('.perg_upvote#'+myId).removeClass( 'upvote-on' ).removeClass( 'active' ).addClass( 'upvote-off' );
            $('.perg_downvote#'+myId).addClass('active').addClass( 'downvote-on' );
            
        });
    mixpanel.track("Vote", {
            "Vote (Up or Down)": "Down",
            "Content": "Question",
            "Question ID": pergid,
            "Toggle On Off": "On",
        });
    }
    
    // if none is active, just turn down on and remove 1 vote.
    else {
    $th.addClass('active');
    $.get('/downvote/', {pergunta_id: pergid}, function(data){
               $('p#'+myId).html(data);
               $('.perg_downvote#'+myId).removeClass( 'downvote-off' ).addClass( 'downvote-on' );
               $('.perg_upvote#'+myId).removeClass( 'upvote-on' ).removeClass( 'active' ).addClass( 'upvote-off' );
        });
    mixpanel.track("Vote", {
            "Vote (Up or Down)": "Down",
            "Content": "Question",
            "Question ID": pergid,
            "Toggle On Off": "On",
        });
    };
});







// answers votes-up control
$('a#resp_upvote').click(function(){
    respid = $(this).attr("data-respid");
    var $th = $(this);
    var myClass = $(this).attr('class').split(' ')[0];
    
    // if it is active, turn off and remove 1 vote
    if($th.hasClass('active')) {    
        $.get('/resp-downvote/', {resposta_id: respid}, function(data){
            $('p.'+myClass).html(data);
            $('.'+myClass+'#resp_upvote').removeClass( 'upvote-on' ).removeClass( 'active' ).addClass( 'upvote-off' );
        });
        mixpanel.track("Vote", {
            "Vote (Up or Down)": "Up",
            "Content": "Answer",
            "Answer ID": respid,
            "Toggle On Off": "Off",
        });
    }
    
    // if vote down is active, turn down off, turn up on and add 2 votes
    else if ($('.'+myClass+'#resp_downvote').hasClass('active')) {
     $.get('/resp-upvote/', {resposta_id: respid});
     $.get('/resp-upvote/', {resposta_id: respid}, function(data){
            $('p.'+myClass).html(data);
            $('.'+myClass+'#resp_downvote').removeClass( 'downvote-on' ).removeClass( 'active' ).addClass( 'downvote-off' );
            $('.'+myClass+'#resp_upvote').addClass('active').addClass( 'upvote-on' );
            
        });
     mixpanel.track("Vote", {
            "Vote (Up or Down)": "Up",
            "Content": "Answer",
            "Answer ID": respid,
            "Toggle On Off": "On",
        });
    }    
    
    // if none of votes are active, turn on and add a vote
    else {
        $th.addClass('active');
        $.get('/resp-upvote/', {resposta_id: respid}, function(data){
                   $('p.'+myClass).html(data);
                   $('.'+myClass+'#resp_upvote').removeClass( 'upvote-off' ).addClass( 'upvote-on' );
                   $('.'+myClass+'#resp_downvote').removeClass( 'downvote-on' ).removeClass( 'active' ).addClass( 'downvote-off' );
        });
        mixpanel.track("Vote", {
            "Vote (Up or Down)": "Up",
            "Content": "Answer",
            "Answer ID": respid,
            "Toggle On Off": "On",
        });
    };
});



// answers down votes control
$('a#resp_downvote').click(function(){
    respid = $(this).attr("data-respid");
    var $th = $(this);
    var myClass = $(this).attr('class').split(' ')[0];
    
    // if is active, tur it off and remove one vote
    if($th.hasClass('active')) {
        $.get('/resp-upvote/', {resposta_id: respid}, function(data){
            $('p.'+myClass).html(data);
            $('.'+myClass+'#resp_downvote').removeClass( 'downvote-on' ).removeClass( 'active' ).addClass( 'downvote-off' );
        });
        mixpanel.track("Vote", {
            "Vote (Up or Down)": "Down",
            "Content": "Answer",
            "Answer ID": respid,
            "Toggle On Off": "Off",
        });
    }
    
    // if vote up is active, turn up off, turn down on and remove 2 votes
    else if ($('.'+myClass+'#resp_upvote').hasClass('active')) {
     $.get('/resp-downvote/', {resposta_id: respid});
     $.get('/resp-downvote/', {resposta_id: respid}, function(data){
            $('p.'+myClass).html(data);
            $('.'+myClass+'#resp_upvote').removeClass( 'upvote-on' ).removeClass( 'active' ).addClass( 'upvote-off' );
            $('.'+myClass+'#resp_downvote').addClass('active').addClass( 'downvote-on' );
            
        });
    mixpanel.track("Vote", {
            "Vote (Up or Down)": "Down",
            "Content": "Answer",
            "Answer ID": respid,
            "Toggle On Off": "On",
        });
    }
    
    // if none is active, just turn down on and remove 1 vote.
    else {
    $th.addClass('active');
    $.get('/resp-downvote/', {resposta_id: respid}, function(data){
               $('p.'+myClass).html(data);
               $('.'+myClass+'#resp_downvote').removeClass( 'downvote-off' ).addClass( 'downvote-on' );
               $('.'+myClass+'#resp_upvote').removeClass( 'upvote-on' ).removeClass( 'active' ).addClass( 'upvote-off' );
        });
    mixpanel.track("Vote", {
            "Vote (Up or Down)": "Down",
            "Content": "Answer",
            "Answer ID": respid,
            "Toggle On Off": "On",
        });
    };
});


// follow and unfollow users control
$('a.follow_user').click(function(){
    var $th = $(this);
    userid = $th.attr("data-userid");
    var myId = $(this).attr('id');
    
    // follow user
    if($th.hasClass('follow')) {
        $.get('/perfil/follow-user/', {userprofile_id: userid}, function(data){
            $('.followers_count#'+myId).html(data);
            $('.follow_user#'+myId).removeClass( 'follow' ).addClass( 'unfollow' ).addClass( 'active' ).html('Seguindo');
        });
        mixpanel.track("Follow", {
            "Content": "User",
            "User ID": userid,
            "Toggle On Off": "On",
        });
    }
    
    // unfollow user
    else if ($th.hasClass('unfollow')) {
     $.get('/perfil/unfollow-user/', {userprofile_id: userid}, function(data){
            $('.followers_count#'+myId).html(data);
            $('.follow_user#'+myId).removeClass( 'unfollow' ).removeClass( 'active' ).addClass( 'follow' ).html('Seguir');
        });
     mixpanel.track("Follow", {
            "Content": "User",
            "User ID": userid,
            "Toggle On Off": "Off",
        });
    }
    
});



// follow and unfollow questions control
$('a.follow_quest').click(function(){
    var $th = $(this);
    questid = $th.attr("data-questid");
    var myId = $(this).attr('id');
    
    // follow question
    if($th.hasClass('follow')) {
        $.get('/follow-question/', {pergunta_id: questid}, function(data){
            $('.perg_follow_status#'+myId).html('Seguindo');
            $('.perg_followers_count#'+myId).html(data);
            $('.follow_quest#'+myId).removeClass( 'follow' ).addClass( 'unfollow' ).addClass( 'active' );
        });
        mixpanel.track("Follow", {
            "Content": "Question",
            "Question ID": questid,
            "Toggle On Off": "On",
        });
    }
    
    // unfollow question
    else if ($th.hasClass('unfollow')) {
     $.get('/unfollow-question/', {pergunta_id: questid}, function(data){
            $('.perg_follow_status#'+myId).html('Seguir');
            $('.perg_followers_count#'+myId).html(data);
            $('.follow_quest#'+myId).removeClass( 'unfollow' ).removeClass( 'active' ).addClass( 'follow' );
        });
     mixpanel.track("Follow", {
            "Content": "Question",
            "Question ID": questid,
            "Toggle On Off": "Off",
        });
    }
    
});




// follow and unfollow tags control
$('a.follow_tag').click(function(){
    var $th = $(this);
    tagid = $th.attr("data-tagid");
    var myId = $(this).attr('id');
    
    // follow tag
    if($th.hasClass('follow')) {
        $.get('/follow-tag/', {tag_id: tagid}, function(data){
            $('.tag_followers_count#'+myId).html(data);
            $('.follow_tag#'+myId).removeClass( 'follow' ).addClass( 'unfollow' ).addClass( 'active' ).html('Seguindo');
        });
        mixpanel.track("Follow", {
            "Content": "Tag",
            "Tag ID": tagid,
            "Toggle On Off": "On",
        });
    }
    
    // unfollow tag
    else if ($th.hasClass('unfollow')) {
     $.get('/unfollow-tag/', {tag_id: tagid}, function(data){
            $('.tag_followers_count#'+myId).html(data);
            $('.follow_tag#'+myId).removeClass( 'unfollow' ).removeClass( 'active' ).addClass( 'follow' ).html('Seguir');
        });
        mixpanel.track("Follow", {
            "Content": "Tag",
            "Tag ID": tagid,
            "Toggle On Off": "Off",
        });
    }
    
});




// Toggle answer icon
$('#btn-responder').click(function(){
    $(this).find('i').toggleClass('fa-toggle-on fa-toggle-off')
});



// Hide Sugested Questions Div
$(document).on("click", "#newquestion",function() {
  $("div#collapseQsts").hide();
});

// Update suggested questions on type
$(document).on("keyup", "#id_titulo", function(){
    var query;
    query = $(this).val();
    $("div#collapseQsts").show();
    $.get('/sugerir-pergunta/', {suggestion: query}, function(data){
        $('#collapseQsts').html(data);
    });
});




// Ask to answer
$('.ask-answer').click(function(){
    questid = $(this).attr("data-questid");
    userid = $(this).attr("data-userid");
    var $th = $(this);

    $.get('/pedir-resposta/', {pergunta_id: questid, user_id: userid}, function(data){
            $th.addClass( 'active' ).html('Feito!');
        });
    mixpanel.track("Ask Answer", {
            "Pergunta ID": questid,
            "To User ID": userid,
        });
});



// add or remove topics in user knowledge
$('body').on('click', '.add_topic_know', function(){
    var topicid = $(this).attr("data-topicid");
    var $th = $(this);
    
    // if it is to add, remove warning class and add success
    if($th.hasClass('btn-default')) {
        $.get('/perfil/add-topic-known/', {topic_id: topicid}, function(data){
            $th.parent().hide();
        });
        $.get('/conhecimentos-atuais/', {}, function(data){
             $('#currentTopics').html(data);
        });
        $.get('/atualiza-sugestoes-conhecimento/', {}, function(data){
            $('#topicsSuggestions').html(data);
        });
    }
    // if is to remove, add warning class and remove success
    else {
        $.get('/perfil/remove-topic-known/', {topic_id: topicid}, function(data){
            $th.parent().hide();
        });
        $.get('/conhecimentos-atuais/', {}, function(data){
            $('#currentTopics').html(data);
        });
        $.get('/atualiza-sugestoes-conhecimento/', {}, function(data){
            $('#topicsSuggestions').html(data);
        });
    };
});



// Sugest topics of knowledge
$(function(){
    $("#topicSearch").hide();
});

$('#searchTopic').keyup(function(){
    var query;
    query = $(this).val();
    $('#topicSearch').show();
    $.get('/buscar-topicos-conhecimento/', {suggestion: query}, function(data){
        $('#topicSearch').html(data);
        $('#newTopic').html(query);
    });
});


// Create new topic and add to user knowledge
$('body').on('click', '.create_new_topic_known', function(){
    var topic = $('.create_new_topic_known').text();
    var $th = $(this);
    $.get('/criar-topico-conhecimento/', {topic_name: topic}, function(data){
        $th.parent().hide();
    });
    $.get('/conhecimentos-atuais/', {}, function(data){
        $('#currentTopics').html(data);
    });
    $.get('/atualiza-sugestoes-conhecimento/', {}, function(data){
        $('#topicsSuggestions').html(data);
    });

});






// add or remove topics in user interests
$('body').on('click', '.add_topic_interest', function(){
    var topicid = $(this).attr("data-topicid");
    var $th = $(this);
    
    // if it is to add, remove warning class and add success
    if($th.hasClass('btn-default')) {
        $.get('/perfil/add-topic-interest/', {topic_id: topicid}, function(data){
            $th.parent().hide();
        });
        $.get('/interesses-atuais/', {}, function(data){
             $('#currentTopics').html(data);
        });
        $.get('/atualiza-sugestoes-interesses/', {}, function(data){
            $('#topicsSuggestions').html(data);
        });
    }
    // if is to remove, add warning class and remove success
    else {
        $.get('/perfil/remove-topic-interest/', {topic_id: topicid}, function(data){
            $th.parent().hide();
        });
        $.get('/interesses-atuais/', {}, function(data){
            $('#currentTopics').html(data);
        });
        $.get('/atualiza-sugestoes-interesses/', {}, function(data){
            $('#topicsSuggestions').html(data);
        });
    };
});



// Sugest topics of interests
$(function(){
    $("#topicSearch").hide();
});

$('#searchTopic').keyup(function(){
    var query;
    query = $(this).val();
    $('#topicSearch').show();
    $.get('/buscar-topicos-interesse/', {suggestion: query}, function(data){
        $('#topicSearch').html(data);
        $('#newTopic').html(query);
    });
});


// Create new topic and add to user interests
$('body').on('click', '.create_new_topic_interest', function(){
    var topic = $('.create_new_topic_interest').text();
    var $th = $(this);
    $.get('/criar-topico-interesse/', {topic_name: topic}, function(data){
        $th.parent().hide();
    });
    $.get('/interesses-atuais/', {}, function(data){
        $('#currentTopics').html(data);
    });
    $.get('/atualiza-sugestoes-interesses/', {}, function(data){
        $('#topicsSuggestions').html(data);
    });

});


// Allow links to specific tabs, using url # parameter
var url = document.location.toString();
if (url.match('#')) {
    $('.nav-tabs a[href=#'+url.split('#')[1]+']').tab('show') ;
} 



// Add new tag bio to user when answer is asked
$('body').on('click', '.savebio', function(){
    var $th = $(this);
    var desc = $('#biodesc').val();
    var userid = $th.attr("data-userid");
    var tagid = $th.attr("data-tagid");
    
    $.get('/perfil/salvar-bio/', {tag_id: tagid, bio_text: desc}, function(data){
        $('#bio_'+tagid).html(data);
    });
});


// Create and edit user tag bio info
$('body').on('click', '.edit-bio', function(){
    var $th = $(this);
    var tagid = $th.attr("data-tagid");
    var tagname = $th.attr("data-tagname");
    $('#bioname').text(tagname);
    $('#savebio').attr("data-tagid", tagid )
});








// track submission for form id "responder"
mixpanel.track_forms("#responder", "New Answer");

// track submission for form id "perguntar"
mixpanel.track_forms("#perguntar", "New Question");

// track submission for form id "perguntar"
mixpanel.track_forms("#comentar", "New Comment");


// track login options
mixpanel.track_links("a.facebook", "Login", {
        "Option": "Facebook",
    });
mixpanel.track_links("a.twitter", "Login", {
        "Option": "Twitter",
    });
mixpanel.track_links("a.google", "Login", {
        "Option": "Google",
    });
mixpanel.track_forms("#login", "Login", {
        "Option": "Email"
    });
mixpanel.track_forms("#signup_form", "Login", {
        "Option": "Email"
    });

    

    


}); // document ready