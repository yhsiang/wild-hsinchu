// for calendar page
$(function () {
    //setTimeout(function () {
    //    if (!!updateDetail) {
    //        updateDetail({
    //            title: 'foobar',
    //            thumb: 'images/1448609123711pic1.jpg',
    //            content: 'zzzzz',
    //            url: 'http://www.google.com.tw'
    //        });
    //    }
    //}, 3000);

    window.updateDetail = function (data) {
        var detail = document.querySelector('#detail');
        if (!!$ && !!detail) {
            $(detail).trigger('detail', [data]);
        }
    }

    $('#detail').on('detail', function (e, data) {
        if (data) {
            onUpdateDetail(data);
        }
    });

    $title = $('#detail-title');
    $body = $('#detail-body');
    $url = $('#detail-url');
    $img = $('#detail-thumb');

    function onUpdateDetail (data) {
        $title.text(data.title);
        $body.text(data.content);

        $url.attr('href', data.url);
        $url.text(data.url);

        if (data.thumb) {
            $img.show();
            $img.attr('src', data.thumb);
        } else {
            $img.hide();
        }
    }
});
