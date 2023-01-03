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
            if(result === true){
                refresh = 1
                url = '/'
                modalOpen('신청 완료')
            }else{
                modalOpen('세탁 신청이 실패했습니다(한 건만 가능)')
            }
        }
    })
})
function deleteLaundry(){

}
function removeFontColor(){
    let items = document.querySelectorAll('.nav-item')
    items.forEach(element=>{
        element.setAttribute('style', 'color: black')
    })
}