// przewijanie strony Get started
$(document).ready(function (){
    $(".button-get-started").click(function (){
        $('html, body').animate({
            scrollTop: $(".registerForm").offset().top
        }, 1000);
    });
});

// przewijanie strony Sign in
$(document).ready(function (){
    $("#sign-in").click(function (){
        $('html, body').animate({
            scrollTop: $(".loginForm").offset().top
        }, 1000);
    });
});

// przewijanie strony Sign in
$(document).ready(function (){
    $("#sign-up").click(function (){
        $('html, body').animate({
            scrollTop: $(".registerForm").offset().top
        }, 700);
    });
});