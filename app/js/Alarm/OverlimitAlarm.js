
var OverAlarm = (function(){

    function _overAlarm(){

        this.show = function(){
            
        }
        $('.go-top').click(function(){

            $(".go-top").attr('data-target','#myModalAlarm');
        });
        $('.nav-tabs li').click(function(){
            　　$(this).addClass('active').siblings().removeClass('active');
            　　var _id = $(this).attr('data-id');
            　　$('.tabs-contents').find('#'+_id).addClass('active').siblings().removeClass('active');
            
            　　switch(_id){
            　　　　case "tabContent1":
            　　　　　　getTabContent1();
            　　　　　　break;
            　　　　case "tabContent2":
            　　　　　　getTabContent2();
            　　　　　　break;
            　　　　default:
            　　　　　　getTabContent1();
            　　　　　　break;
            　　}
        });
        function getTabContent1(){

        }
        function getTabContent2(){

        }
        //定时任务
        setInterval(refreshAlarm,5000);
        function refreshAlarm(){
            
        }
	};
	return _overAlarm;
})();




jQuery(document).ready(function($) {

    var overAlarm = new OverAlarm();
    overAlarm.show();
});