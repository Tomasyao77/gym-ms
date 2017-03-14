/**
 * Created by zouyao on 2017/3/6.
 */
var userManageCtrl = m.controller("userManagecontroller",function ($rootScope,$scope) {
    $scope.prevPage = "上一页";
    $scope.nextPage = "下一页";
    $scope.currentPage = 1;
    $scope.totalPage = 1;
    $scope.constRef = [["查看详情"]];
    $scope.blurUserName = "";
    $scope.orderType = "";

    /**
     * 封号
     * @param item
     */
    $scope.freezeUser = function (item) {
        console.log(item);
        $.ajax({
            type:"POST",
            url:"/login/deleteOneUser",
            data:{"id":item.id},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.getUserPageList();
            }
        });
    };
    /**
     * 解封
     * @param item
     */
    $scope.unFreezeUser = function (item) {
        console.log(item);
        $.ajax({
            type:"POST",
            url:"/login/deleteOneUserInverse",
            data:{"id":item.id},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.getUserPageList();
            }
        });
    };
    /**
     * 用户管理初始化
     */
    $rootScope.um_init = function () {
        $scope.currentPage = 1;
        $scope.blurUserName = "";
        $scope.getUserPageList();
    };
    /**
     * 获取用户分页列表
     */
    $scope.getUserPageList = function(){
        if($scope.currentPage == 0){
         this.currentPage = 1;
         }else{
         this.currentPage = $scope.currentPage;
         }
        $.ajax({
            type:"POST",
            url:"/login/getUserPageList",
            data:{"currentPage":this.currentPage,"pageSize":5,"blurUserName":$scope.blurUserName},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.page.list.length == 0 && $scope.currentPage > 1){
                        $scope.currentPage = $scope.currentPage - 1;
                        $scope.getUserPageList();
                    }
                    $scope.userList = new Array();
                    var obj = {};
                    for(var temp in data.page.list){
                        obj['id'] = data.page.list[temp].id;
                        obj['username'] = data.page.list[temp].username;
                        obj['isDelete'] = data.page.list[temp].isDelete==true?"已被封号":"正常";
                        obj['email'] = data.page.list[temp].email;
                        obj['tel'] = data.page.list[temp].tel;
                        obj['role'] = data.page.list[temp].role;
                        var datestr = new Date(parseInt(data.page.list[temp].createTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['createTime'] = temstr;	//创建时间
                        $scope.userList.push(obj);obj = {};
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
                $scope.getUserPageList();
            }
        }else if(obj=="下一页"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == $scope.totalPage){
                alert("当前已经是最后一页！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage + 1;
                $scope.getUserPageList();
            }
        }
    };
    /**
     * 表格操作（模态框）
     */
    $scope.actionOnUser = function(item,obj){
        if(obj == "查看详情"){
            $scope.userInfoTemp = item;
            $("#modalid-rootEditUser").modal("toggle");
        }else if(obj == "封号"){

        }
    };

});