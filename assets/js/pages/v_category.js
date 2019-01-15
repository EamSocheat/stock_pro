var _pageNo = 1;
$(document).ready(function(){
	_thisPage.onload();
});

var _thisPage = {
		onload : function(){
			_this = this;
			_this.loadData();
			_this.event();
			stock.comm.checkAllTblChk("chkAll","tblCategory","chk_box");
		}, loadData : function(page_no){
			var input = {};
			var pageNo = 1;
		    if(page_no != "" && page_no != null && page_no != undefined){
		        if(page_no <= 0){
		            page_no = 1;
		        }
		        pageNo = page_no;
		    }
			
			input["limit"]		  = $("#perPage").val();
			input["offset"]		  = parseInt($("#perPage").val()) * ( pageNo - 1);
			input["categoryNm"]	  = $("#txtSrchCatNm").val();
			input["categoryNmKh"] = $("#txtSrchSupplNmKh").val();
			
		    $("#loading").show();
		    $.ajax({
				type: "POST",
				url : $("#base_url").val() +"Category/getCategoryData",
				data: input,
				dataType: "json",
				success: function(data) {
					$("#categoryList").empty();
					var html = "";
					
					if(data.OUT_REC.length > 0){
						console.log(true)
						$.each(data.OUT_REC, function(i,v){
							html += '<tr class="chk_box" data-id='+v.cat_id+'>';
							html += '	<td><input type="checkbox"></td>';
							html += '   <td><div class="image">';
							html += '       <img id="staImgView" src="http://localhost/stock-project/assets/image/default-staff-photo.png" class="img-circle" style="width:25px;" alt="User Image">';
							html += '   </div></td>';
							html += '	<td><div>'+null2Void(v.cat_nm)+'</div></td>';
							html += '	<td><div>'+null2Void(v.cat_nm_kh)+'</div></td>';
							html += '	<td><div>'+null2Void(v.cat_des)+'</div></td>';
							html += '	<td><div>'+(null2Void(v.regDt)).substr(0,10)+'</div></td>';
							html += '	<td class="text-center">';
							html += '		<button onclick="_thisPage.editData('+v.cat_id+')" type="button" class="btn btn-primary btn-xs">';
							html += '		<i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>';
							html += '	</td>';
							html += '</tr>';
						});
						
						$("#categoryList").append(html);
						$("#chkAll").show();
						$("#chkAll").prop("checked",false);
						$("#loading").hide();
						stock.comm.renderPaging("paging", $("#perPage").val(), data.OUT_REC_CNT[0]["total_rec"], pageNo);
					}else{
						$("#chkAll").hide();
						$("#loading").hide();
						$("#categoryList").append("<tr><td colspan='6' style='text-align:center;'>No data to show.</td></tr>");
						stock.comm.renderPaging("paging", $("#perPage").val(), 0, pageNo);
					}
					 
				}, error : function(data) {
				    $("#loading").hide();
				    stock.comm.alertMsg($.i18n.prop("msg_err"));
		        }
			});
		}, editData : function(pos_id){
			
		}, addNewCategory: function(){
			$("#loading").show();
			var data = "";
			var controllerNm = "PopupFormCategory";
			var option = {};
			option["height"] = "350px";
			
			stock.comm.openPopUpForm(controllerNm, option, data);
		}, deleteData : function(dataArr){
			
		}, event : function(){
			
		}
}

function popupCategoryCallback(){
	
}

function null2Void(dat){
	if(dat == null || dat == undefined || dat == "null" || dat == "undefined"){
		return "";
	}
	return dat;
}


















