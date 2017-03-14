/**
 * Created by zouyao on 2017/3/6.
 */
var addOrderCtrl = m.controller("addOrdercontroller",function ($rootScope,$scope) {

    /**
     * 新增预约初始化
     */
    $rootScope.ao_init = function () {
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
            data:{"currentPage":this.currentPage,"pageSize":100,"blurName":$scope.blurName,"orderType":$scope.orderType},
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
                        if(data.page.list[temp].isFree=='否'){
                            continue;
                        }
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
     * 下拉选择
     */
    $scope.chooseOnePlayGrd = function(item){
        $scope.choosedTarget = item;
    };
    /**
     * 提交
     */
    $scope.addToOrder = function(){
        $.ajax({
            type:"POST",
            url:"/order/addToOrder",
            data:{
                "userId":$rootScope.idOfLoger,
                "playgroundId":$scope.choosedTarget.id,
                "startTime":dateChooseArray[0],
                "endTime":dateChooseArray[1]
            },
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "新增预约成功!";
                    $("#modalid-toastInfo").modal("toggle");
                });
            }
        });
    };

});

var dateChooseArray = new Array();