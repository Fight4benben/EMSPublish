var Rank = (function (){

	function _rank(){

		this.show = function(){
			initDom();
			var url = "/api/DepartmentAreaAvgRank";
			var buildId=$.cookie('buildId');
			if(buildId == undefined || buildId==null || buildId == "null")
				getDataFromServer(url,"");
			else
				getDataFromServer(url,"buildId="+buildId);
		}

		function initDom(){
			initDateTime();

			$("#buildinglist").change(function(event) {
				var buildId = $(this).val();
				$.cookie("buildId",buildId,{path:'/'})
				var url = "/api/DepartmentAreaAvgRank";
				var date = $("#daycalendarBox").val();
				var params = "buildId="+buildId+"&date="+date;

				getDataFromServer(url,params);
			});

			$("#energys").change(function(event) {
				var energyCode = $(this).val();
				var buildId = $("#buildinglist").val();
				var url = "/api/DepartmentAreaAvgRank";
				var date = $("#daycalendarBox").val();
				var params = "buildId="+buildId+"&date="+date+"&energyCode="+energyCode;

				getDataFromServer(url,params);
			});
		}

		function initDateTime(){
			EMS.DOM.initDateTimePicker('YEARMONTH',new Date(),$("#dayCalendar"),$("#daycalendarBox"),{format:'yyyy-mm',
									        language: 'zh-CN',
									        autoclose: 1,
									        startView: 3,
									        minView: 3,
									        forceParse: false,
									        pickerPosition: "bottom-left"});

			$("#daycalendarBox").change(function(event) {
				var energyCode = $("#energys").val();
				var buildId = $("#buildinglist").val();
				var url = "/api/DepartmentAreaAvgRank";
				var date = $("#daycalendarBox").val();
				var params = "buildId="+buildId+"&date="+date+"&energyCode="+energyCode;

				getDataFromServer(url,params);
			});
		}

		function getDataFromServer(url,params){
			EMS.Loading.show();
			$.getJSON(url,params, function(data) {
				
				try{
					showBuilds(data);
					showEnergys(data);
					showRankData(data);
				}catch(exception){

				}finally{
					EMS.Loading.hide();
				}
				
			}).fail(function(e){
				EMS.Tool.statusProcess(e.status);
				EMS.Loading.hide();
			});
		}

		function showBuilds(data){
			if(!data.hasOwnProperty('builds'))
				return;

			EMS.DOM.initSelect(data.builds,$("#buildinglist"),"buildName","buildID");
			if($.cookie("buildId")!=undefined && $.cookie("buildId")!= null)
				$("#buildinglist").val($.cookie("buildId"));
			
		}

		function showEnergys(data){
			if(!data.hasOwnProperty('energys'))
				return;

			EMS.DOM.initSelect(data.energys,$("#energys"),"energyItemName","energyItemCode");
		}

		function showRankData(data){

			var rankData = data.averageData.sort(function(a,b){
				return a.areaAvg>=b.areaAvg ? -1 : 1;

			});

			showBar(rankData);
			showTable(rankData);
		}

		function showBar(rankData){
			var name = [];
			var value =[];

			$.each(rankData, function(key, val) {
				name.push(val.name);
				value.push(val.totalValue);
			});


			var series = {
            	type: 'bar',
            	data:value
			}
			EMS.Chart.showBar(echarts,$("#rankBar"),undefined,name,series);
		}

		function showTable(rankData){
			var columns = [
				{field:'name',title:'部门名称'},
				{field:'totalValue',title:'用能值'},
				{field:'areaAvg',title:'单位面积用能'},
				{field:'number',title:'名次'}
			];
			var rows = [];

			$.each(rankData, function(index, val) {
				var row={};
				row.name = val.name;
				row.totalValue = val.totalValue;
				row.areaAvg = val.areaAvg;
				row.number = index+1;
				rows.push(row);
			});

			var height = $("#rankTable").height();
			$("#rankTable").html('<table></table>');
			$("#rankTable>table").attr('data-height',height);

			EMS.DOM.showTable($("#rankTable>table"),columns,rows,{striped:true,classes:'table table-border'});
		}
	};

	return _rank;

})();

jQuery(document).ready(function($) {

	$("#deenergy").attr("class","start active");
	$("#de_rank").attr("class","active");
	
	var rank = new Rank();
	rank.show();

});