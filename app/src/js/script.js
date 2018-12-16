$(document).on('click', '#openMenu', function () {
    $(this).toggleClass('active');
    $('.menu-list').toggleClass('open');
});

$(document).on('touchstart' && 'touchend', function (e) {
    var container = $(".header__menu");
    if (container.has(e.target).length === 0) {
        $('#openMenu').removeClass('active');
        $('.menu-list').removeClass('open');
    }
});
