/**
 * Created by Alvin on 2016/11/28.
 */

$(function () {
    $('.comment').click(function () {
        var $this = $(this);
        var toId = $this.data('tid');
        var commentId = $this.data('cid');

        if ($('#toId').length > 0) {
            $('#toId').val(toId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm');
        }

        if ($('#commentId').length > 0) {
            $('#commentId').val(commentId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm');
        }

    });
});
