var _btnId;
var _this;
$(document).ready(function() {
	_thisPage.init();
});

var _thisPage = {
		init : function(){
			_this = this;
			
			_this.onload();
			_this.event();
		},
		onload : function(){
			parent.$("#loading").hide();
			clearForm();
			if($("#frmAct").val() == "U"){
			    getDataEdit($("#braId").val());
			    $("#popupTitle").html("<i class='fa fa-tags'></i> "+$.i18n.prop("btn_edit")+" "+ $.i18n.prop("lb_category"));
			}else{
			    $("#btnSaveNew").show();
			    $("#popupTitle").html("<i class='fa fa-tags'></i> "+$.i18n.prop("btn_add_new")+" "+ $.i18n.prop("lb_category"));
			}
			$("#frmCateg").show();
			$("#braNm").focus();
		},
		event : function(){
			$("#btnClose, #btnExit").click(function(){
				parent.stock.comm.closePopUpForm("PopupFormCategory", parent.popupCategoryCallback);
			});
			$("#frmCateg").submit(function(e){
				e.preventDefault();
				if(_btnId == "btnSave"){
			    	saveData();
				}else{
			    	saveData("new");
				}
			
			});
			//
			$("#btnSave").click(function(e){
				_btnId = $(this).attr("id");
			});
			//
			$("#btnSaveNew").click(function(e){
				_btnId = $(this).attr("id");
				
			});
			//
			$("#btnSelectPhoto").click(function(e){
				$("#categFile").trigger( "click" );
			});
			//
			$("#categFile").change(function(){
			    readURL(this);
			});

		}
};


function saveData(str){
    parent.$("#loading").show();
    console.log($("#frmCateg").serialize());
	$.ajax({
		type: "POST",
		url: $("#base_url").val() +"Staff/save",
		data: $("#frmCateg").serialize()+ "&catId=" +$("#catId").val(),
		success: function(res) {
		    parent.$("#loading").hide();
			if(res =="OK"){
				parent.stock.comm.alertMsg($.i18n.prop("msg_save_com"),"txtCateNm");
				if(str == "new"){
				    clearForm();
				}else{
				    parent.stock.comm.closePopUpForm("PopupFormStaff",parent.popupStaffCallback);
				}
			}
		},
		error : function(data) {
			console.log(data);
			stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

function getDataEdit(bra_id){
    $("#loading").show();
    $.ajax({
		type: "POST",
		url: $("#base_url").val() +"Branch/getBranch",
		data: {"bra_id":bra_id},
		dataType: "json",
		async: false,
		success: function(res) {
			
			if(res.OUT_REC != null && res.OUT_REC.length >0){
			    $("#txtCateNm").val(res.OUT_REC[0]["bra_nm"]);
			    $("#braNmKh").val(res.OUT_REC[0]["bra_nm_kh"]);
			    $("#braPhone").val(res.OUT_REC[0]["bra_phone1"]);
			    $("#braPhone2").val(res.OUT_REC[0]["bra_phone2"]);
			    $("#braEmail").val(res.OUT_REC[0]["bra_email"]);
			    $("#braType").val(res.OUT_REC[0]["bra_type_id"]);
			    $("#braAddr").val(res.OUT_REC[0]["bra_addr"]);
			    $("#braDes").val(res.OUT_REC[0]["bra_des"]);
			    $("#txtCateNm").focus();
			}else{
			    console.log(res);
			    stock.comm.alertMsg($.i18n.prop("msg_err"));
			}
			$("#loading").hide();
		},
		error : function(data) {
		    console.log(data);
		    stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});

}

function clearForm(){
    $("#frmCateg input").val("");
    $("#frmCateg textarea").val("");
    
    $("#txtCateNm").focus();
}

/**
 * 
 */
//
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#categImgView').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

