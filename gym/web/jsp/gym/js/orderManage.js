/**
 * Created by zouyao on 2017/3/6.
 */
var orderManageCtrl = m.controller("orderManagecontroller",function ($rootScope,$scope) {
    $scope.prevPage = "上一页";
    $scope.nextPage = "下一页";
    $scope.currentPage = 1;
    $scope.totalPage = 1;
    $scope.constRef = [["查看详情"]];
    $scope.blurUserName = "";
    $scope.orderType = "";

    /**
     * 用户管理初始化
     */
    $rootScope.om_init = function () {
        $scope.currentPage = 1;
        $scope.blurUserName = "";

        $scope.getOrderInfoListOfOrder();
        //$scope.fortest();
    };
    /**
     * fot test
     */
    $scope.fortest = function(){
        if($scope.currentPage == 0){
            this.currentPage = 1;
        }else{
            this.currentPage = $scope.currentPage;
        }
        $.ajax({
            type:"POST",
            url:"/order/getOrderListByUserId",
            data:{"currentPage":this.currentPage,"pageSize":5,"userId":$rootScope.idOfLoger},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){

                });
            }
        });
    };
    /**
     * 获取预约分页列表
     */
    $scope.getOrderInfoListOfOrder = function(){
        if($scope.currentPage == 0){
         this.currentPage = 1;
         }else{
         this.currentPage = $scope.currentPage;
         }
        $.ajax({
            type:"POST",
            url:"/order/getOrderInfoListOfOrder",
            data:{"currentPage":this.currentPage,"pageSize":5},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.page.list.length == 0 && $scope.currentPage > 1){
                        $scope.currentPage = $scope.currentPage - 1;
                        $scope.getOrderInfoListOfOrder();
                    }
                    $scope.orderList = new Array();
                    var obj = {};
                    for(var temp in data.page.list){
                        obj['id'] = data.page.list[temp].id;
                        obj['playground'] = data.page.list[temp].playground;
                        obj['user'] = data.page.list[temp].user;
                        var datestr = new Date(parseInt(data.page.list[temp].startTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['startTime'] = temstr;	//开始时间
                        var datestr = new Date(parseInt(data.page.list[temp].endTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['endTime'] = temstr;	//结束时间
                        var datestr = new Date(parseInt(data.page.list[temp].orderTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['orderTime'] = temstr;	//预约时间

                        $scope.orderList.push(obj);obj = {};
                    }
                    //分页相关更新
                    $scope.currentPage = data.page.current;
                    $scope.totalPage = data.page.total;
                });
            }
        });
    };
    /**
     * 分页操作
     * @param obj
     */
    $scope.makePagingList = function(obj){
        if(obj=="上一页"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == 1){
                alert("当前已经是第一页！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage - 1;
                $scope.getOrderInfoListOfOrder();
            }
        }else if(obj=="下一页"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == $scope.totalPage){
                alert("当前已经是最后一页！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage + 1;
                $scope.getOrderInfoListOfOrder();
            }
        }
    };
    /**
     * 查看场地详情
     */
    $scope.viewDetailOfPlayGrd = function(obj){
        $scope.viewDetailOfPlayGrdTemp = obj;
        $("#modalid-odmng-view").modal("toggle");
    };
    /**
     * 查看用户详情
     */
    $scope.viewDetailOfUser = function(obj){
        $scope.viewDetailOfUserTemp = obj;
        $("#modalid-order-viewUser").modal("toggle");
    };
    /**
     * 删除预约
     */
    $scope.deleteOneOrderModal = function(item){
        $scope.deleteTemp = item;
        $("#modalid-odmng-delete").modal("toggle");
    };
    $scope.deleteOneOrder = function(){
        $.ajax({
            type: "POST",
            url: "/order/removeOrderInfoFromOrder",
            data: {
                "id": $scope.deleteTemp.id
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "删除预约成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getOrderInfoListOfOrder();
                });
            }
        });
    };

});