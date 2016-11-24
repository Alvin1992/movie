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
});
