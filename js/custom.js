// for sos page
$(function () {
    var period = 500;
    $('#sos .dropdown ul li a').click(function (e) {
        var name = e.target.dataset.target;
        updateItems(name);
    });

    $('#close').click(function () {
        $('#answer').animate({
            'left': '-30%',
            'opacity': 0}, period, function () {
            $('#answer').hide();
        });
    });

    function updateItems(name) {
        var $parent = $('#answer');
        if (!$parent.is('visible')) {
            $parent.show().animate({'left': '-14px'
                , opacity: 1}, period);
        }
        $('#sos .table').each(function (idx, dom) {
            var targetName = dom.dataset.name;
            var $dom = $(dom);
            if (targetName === name) {
                $dom.show();
            } else {
                $dom.hide();
            }
        });
    }

    $('#sos .tabs ul li a').click(function (e) {
        var name = e.target.dataset.target;
        updateTabs(name);
    });

    updateTabs('tab1');

    function updateTabs(name) {
        $('#sos .tab-content').each(function (idx, dom) {
            var targetName = dom.dataset.name;
            if (targetName === name) {
                $(dom).show();
            } else {
                $(dom).hide();
            }
        });
        $('#sos .tabs ul li').each(function (idx, dom) {
            var targetName = dom.dataset.name;
            if (targetName === name) {
                $(dom).addClass('active');
            } else {
                $(dom).removeClass('active');
            }
        });
    }

});
