let refresh = 0;
$('#laundry').click(function() {
    $('.modal-dialog').css('display', 'block');
    $(this).css('display', 'none');
})
$('.btn-close').click(function() {
    $('.modal-dialog').css('display', 'none');
    $('#laundry').css('display', 'block');
})
$('#laundryBtn').click(function() {
    let address = $('#addressInput').val();
    let request = $('#requestInput').val();
    if([address, request].includes('')) {
        modalOpen('칸이 비어있습니다.', '');
        return
    }
    $.ajax({
        type : "POST",
        url : "/laundry",
        data : {'address_give': address, 'request_give': request},
        success : function (response){
            let result = response['msg']
            if(result){
                refresh = 1
                url = '/'
                modalOpen('신청 완료')
            }else{
                modalOpen('세탁 신청이 실패했습니다(한 건만 가능)')
            }
        }
    })
})
function deleteLaundry(laundryIdx, status){
    if(status != '대기 중'){
        modalOpen('대기 중인 세탁 건만 취소할 수 있습니다.')
        return
    }
    $('#deleteLaundryModal').css('display', 'block')
}
function deleteLaundryBtn(laundryIdx){
    const laundryReason = $('#laundryReason').val();
    if(laundryReason === ''){
        modalOpen('사유를 적어주세요.');
        return
    }
    $.ajax({
        type : "delete",
        url : "/laundry",
        data: {'laundryIdx': laundryIdx, 'laundryReason': laundryReason},
        success : function (response){
            let result = response['msg']
            if(result){
                refresh = 1
                url = '/'
                modalOpen('세탁 취소 완료')
            }else{
                modalOpen('세탁 삭제가 실패했습니다')
            }
        }
    })
}
function removeFontColor(){
    let items = document.querySelectorAll('.nav-item')
    items.forEach(element=>{
        element.setAttribute('style', 'color: black')
    })
}
$('#laundryCommentBtn').click(function(){
    $("#LaundryCommentModal").css("display", "block");
    $('#laundryComment').focus();
})

function putLaundry(userIdx, status, string){
    if(status === '배송 중'){
        $('#doneLaundryModal').css('display', 'block')
        return;
    }
    $.ajax({
        type : "PATCH",
        url : "/laundry",
        data : {'userIdx': userIdx, 'next': string},
        success : function (response){
            let result = response['msg']
            if(result){
                refresh = 1
                url = '/'
                modalOpen('세탁 진행 완료')
            }else{
                modalOpen('세탁 작업이 실패했습니다.<br>한 건만 받을 수 있습니다.')
            }
        }
    })
}
function doneLaundryBtn(userIdx){
    let comment = $('#laundryComment').val()
    $('#doneLaundryModal').css('display', 'none');
    $.ajax({
        type : "PATCH",
        url : "/laundry",
        data : {'userIdx': userIdx, 'comment': comment},
        success : function (response){
            let result = response['msg']
            if(result){
                refresh = 1
                url = '/'
                modalOpen('세탁 진행 완료<br>10000포인트가 적립되었습니다.')
            }else{
                modalOpen('세탁 작업이 실패했습니다.')
            }
        }
    })
}
function commentLaundryBtn(laundryIdx){
    let star = $('#starSelect option:selected').val();
    let comment = $('#laundryComment').val();
    if(star === '평점' || comment === ''){
        modalOpen('평점과 리뷰를 남겨주세요.')
        return
    }
    $.ajax({
        type : "POST",
        url : "/laundry/" + String(laundryIdx) + "/comment",
        data : {'star': star, 'comment':comment},
        success : function (response){
            let result = response['msg']
            if(result){
                refresh = 1
                url = '/'
                modalOpen('평점 작성 완료')
            }else{
                modalOpen('평점 작성이 실패했습니다')
            }
        }
    })
}