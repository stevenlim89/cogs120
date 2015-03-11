$(document).ready(function(){
	deleteFriendListeners();
});	

function deleteFriendListeners(){
	$('.deleteFriend').click(function(e){
		$.post('/processDeleteFriend', {"friendEmail": this.id});
		$(this).closest(".heading").remove();
	});
}