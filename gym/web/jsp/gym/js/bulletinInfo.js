/**
 * Created by zouyao on 2017/3/6.
 */
var bulletinInfoCtrl = m.controller("bulletinInfocontroller",function ($rootScope,$scope) {

    /**
     * 公告管理初始化
     */
    $rootScope.bi_init = function () {
        $scope.prevPage = "上一页";
        $scope.nextPage = "下一页";
        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.blurName = "";
        $scope.orderType = "";

        $scope.getBulletinInfoListOfBulletin();
    };
    /**
     * 获取公告分页列表
     */
    $scope.getBulletinInfoListOfBulletin = function(){
        if($scope.currentPage == 0){
         this.currentPage = 1;
         }else{
         this.currentPage = $scope.currentPage;
         }
        $.ajax({
            type:"POST",
            url:"/bulletin/getBulletinInfoListOfBulletin",
            data:{"currentPage":this.currentPage,"pageSize":100},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.page.list.length == 0 && $scope.currentPage > 1){
                        $scope.currentPage = $scope.currentPage - 1;
                        $scope.getBulletinInfoListOfBulletin();
                    }
                    $scope.bulletinList = new Array();
                    var obj = {};
                    for(var temp in data.page.list){
                        obj['id'] = data.page.list[temp].bulletinId;
                        obj['title'] = data.page.list[temp].title;
                        obj['content'] = data.page.list[temp].content;
                        obj['user'] = data.page.list[temp].user;
                        var datestr = new Date(parseInt(data.page.list[temp].publishTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['publishTime'] = temstr;	//创建时间
                        $scope.bulletinList.push(obj);obj = {};
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
                $scope.getBulletinInfoListOfBulletin();
            }
        }else if(obj=="下一页"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == $scope.totalPage){
                alert("当前已经是最后一页！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage + 1;
                $scope.getBulletinInfoListOfBulletin();
            }
        }
    };
    /**
     * 新增公告
     */
    $scope.addOneBulletinModal = function(){
        $scope.add_title= "";
        $scope.add_content = "";

        $("#modalid-btmng-add").modal("toggle");
    };
    $scope.addOneBulletin = function(){
        $.ajax({
            type: "POST",
            url: "/bulletin/addToBulletin",
            data: {
                "userId": $rootScope.idOfLoger,
                "title": $scope.add_title,
                "content": $scope.add_content
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "新增公告成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getBulletinInfoListOfBulletin();
                });
            }
        });
    };
    /**
     * 删除公告
     */
    $scope.deleteOneBulletinModal = function(item){
        $scope.deleteTemp = item;
        $("#modalid-btmng-delete").modal("toggle");
    };
    $scope.deleteOneBulletin = function(){
        $.ajax({
            type: "POST",
            url: "/bulletin/removeBulletinInfoFromBulletin",
            data: {
                "id": $scope.deleteTemp.id
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "删除公告成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getBulletinInfoListOfBulletin();
                });
            }
        });
    };
    /**
     * 编辑公告(不设此功能)
     */
    /*$scope.editOneBulletinModal = function(item){
        $.ajax({
            type: "POST",
            url: "/bulletin/getOnePlayGrdById",
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
                    obj['id'] = data.page.list[temp].bulletinId;
                    obj['title'] = data.page.list[temp].title;
                    obj['content'] = data.page.list[temp].content;
                    obj['user'] = data.page.list[temp].user;
                    /!*var datestr = new Date(parseInt(data.page.list[temp].createTime));
                     var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                     //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                     ;
                     obj['createTime'] = temstr;	//创建时间*!/
                    $scope.editPlayGroundList.push(obj);obj = {};
                    //}
                });
            }
        });
        $("#modalid-btmng-edit").modal("toggle");
    };
    $scope.editOneBulletin = function(){
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
    };*/

});