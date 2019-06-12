var SvgSetting=(function(){

	function _svgSetting(){

		this.getSelectedInfo = function(){
            return selectedInfo;
        }

        this.show = function(){
            initDom();
			getDataFromServer();
        }

        function initDom(){

        }

        function getDataFromServer() {

        }

        $("#addModal").click(function(event) {
            $("#addModal").attr('data-target','#myModal');
        });
        $("#edtModal").click(function(event) {
            $("#edtModal").attr('data-target','#myModal2');
        });
        $("#delModal").click(function(event) {
            $("#delModal").attr('data-target','#myModal3');
        });
	}

	return _svgSetting;

})();




jQuery(document).ready(function($) {
	
	$("#settings").attr("class", "start active");
    $("#menu_svg_setting").attr("class", "active");

    var svg = new SvgSetting();
    svg.show();
});