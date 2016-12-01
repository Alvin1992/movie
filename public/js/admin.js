/**
 * Created by Alvin on 2016/11/24.
 */

$(function () {
    $('.del').click(function (e) {
        var $this = $(this);
        var id = $this.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            type: 'DELETE',
            url: '/admin/list?id=' + id
        })
            .done(function (results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }
            });
    });

    $('#douban').blur(function () {
        var $douban = $(this);
        var id = $douban.val();

        if (id) {
            $.ajax({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                cache: true,
                type: 'get',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function (data) {
                    $('#inputTitle').val(data.title);
                    $('#inputDirector').val(data.directors[0].name);
                    $('#inputCountry').val(data.countries[0]);
                    $('#inputPost').val(data.images.large);
                    $('#inputYear').val(data.year);
                    $('#inputSummary').val(data.summary);
                }
            });
        }
    });
});
