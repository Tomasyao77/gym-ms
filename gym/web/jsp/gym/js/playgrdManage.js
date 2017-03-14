/**
 * Created by zouyao on 2017/3/6.
 */
var playgrdManageCtrl = m.controller("playgrdManagecontroller",function ($rootScope,$scope) {

    /**
     * 场地管理初始化
     */
    $rootScope.pg_init = function () {
        $scope.prevPage = "上一页";
        $scope.nextPage = "下一页";
        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.blurName = "";
        $scope.orderType = "";

        $scope.getPlaygroundInfoListOfPlayground();
    };
    /**
     * 获取场地分页列表
     */
    $scope.getPlaygroundInfoListOfPlayground = function(){
        if($scope.currentPage == 0){
         this.currentPage = 1;
         }else{
         this.currentPage = $scope.currentPage;
         }
        $.ajax({
            type:"POST",
            url:"/playground/getPlaygroundInfoListOfPlayground",
            data:{"currentPage":this.currentPage,"pageSize":5,"blurName":$scope.blurName,"orderType":$scope.orderType},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.page.list.length == 0 && $scope.currentPage > 1){
                        $scope.currentPage = $scope.currentPage - 1;
                        $scope.getPlaygroundInfoListOfPlayground();
                    }
                    $scope.playGroundList = new Array();
                    var obj = {};
                    for(var temp in data.page.list){
                        obj['id'] = data.page.list[temp].playgroundId;
                        obj['playgroundName'] = data.page.list[temp].playgroundName;
                        obj['size'] = data.page.list[temp].size;
                        obj['price'] = data.page.list[temp].price;
                        obj['position'] = data.page.list[temp].position;
                        obj['description'] = data.page.list[temp].description;
                        obj['isFree'] = data.page.list[temp].isFree=='是'?"空闲":"已租";
                        /*var datestr = new Date(parseInt(data.page.list[temp].createTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['createTime'] = temstr;	//创建时间*/
                        $scope.playGroundList.push(obj);obj = {};
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
                $scope.getPlaygroundInfoListOfPlayground();
            }
        }else if(obj=="下一页"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == $scope.totalPage){
                alert("当前已经是最后一页！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage + 1;
                $scope.getPlaygroundInfoListOfPlayground();
            }
        }
    };
    /**
     * 新增场地
     */
    $scope.addOnePlayGrdModal = function(){
        $scope.add_playgroundName = "";
        $scope.add_size = "";
        $scope.add_price = "";
        $scope.add_position = "";
        $scope.add_description = "";

        $("#modalid-pgmng-add").modal("toggle");
    };
    $scope.addToPlayground = function(){
        $.ajax({
            type: "POST",
            url: "/playground/addToPlayground",
            data: {
                "playgroundName": $scope.add_playgroundName,
                "size": $scope.add_size,
                "price": $scope.add_price,
                "position": $scope.add_position,
                "isFree":'是',
                "description": $scope.add_description
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "新增场地成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getPlaygroundInfoListOfPlayground();
                });
            }
        });
    };
    /**
     * 删除场地
     */
    $scope.deleteOnePlayGrdModal = function(item){
        $scope.deleteTemp = item;
        $("#modalid-pgmng-delete").modal("toggle");
    };
    $scope.deleteOnePlayGrd = function(){
        $.ajax({
            type: "POST",
            url: "/playground/removePlaygroundInfoFromPlayground",
            data: {
                "id": $scope.deleteTemp.id
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "删除场地成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getPlaygroundInfoListOfPlayground();
                });
            }
        });
    };
    /**
     * 编辑场地
     */
    $scope.editOnePlayGrdModal = function(item){
        $.ajax({
            type: "POST",
            url: "/playground/getOnePlayGrdById",
            data: {
                "id": item.id
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $scope.editPlayGroundList = new Array();
                    var obj = {};
                    //for(var temp in data.page.list){
                        obj['id'] = data.value.value.playgroundId;
                        obj['playgroundName'] = data.value.value.playgroundName;
                        obj['size'] = data.value.value.size;
                        obj['price'] = data.value.value.price;
                        obj['position'] = data.value.value.position;
                        obj['description'] = data.value.value.description;
                        obj['isFree'] = data.value.value.isFree;
                        /*var datestr = new Date(parseInt(data.page.list[temp].createTime));
                         var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                         //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                         ;
                         obj['createTime'] = temstr;	//创建时间*/
                        $scope.editPlayGroundList.push(obj);obj = {};
                    //}
                });
            }
        });
        $("#modalid-pgmng-edit").modal("toggle");
    };
    $scope.editOnePlayground = function(){
        $.ajax({
            type: "POST",
            url: "/playground/updatePlaygroundInfoFromPlayground",
            data: {
                "playgroundId": $scope.editPlayGroundList[0].id,
                "playgroundName": $scope.editPlayGroundList[0].playgroundName,
                "size": $scope.editPlayGroundList[0].size,
                "price": $scope.editPlayGroundList[0].price,
                "position": $scope.editPlayGroundList[0].position,
                "isFree":$scope.editPlayGroundList[0].isFree,
                "description": $scope.editPlayGroundList[0].description
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "编辑场地成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getPlaygroundInfoListOfPlayground();
                });
            }
        });
    };
    /**
     * 设为已租
     */
    $scope.setNotFree = function(item){
        $.ajax({
            type: "POST",
            url: "/playground/setFreeStatusByPlaygroundId",
            data: {
                "playgroundId": item.id,
                "isFree": '否'
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $scope.getPlaygroundInfoListOfPlayground();
                });
            }
        });
    };
    /**
     * 设为空闲
     */
    $scope.setIsFree = function(item){
        $.ajax({
            type: "POST",
            url: "/playground/setFreeStatusByPlaygroundId",
            data: {
                "playgroundId": item.id,
                "isFree": '是'
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $scope.getPlaygroundInfoListOfPlayground();
                });
            }
        });
    };

});