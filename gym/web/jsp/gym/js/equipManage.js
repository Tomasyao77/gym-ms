/**
 * Created by zouyao on 2017/3/6.
 */
var equipManageCtrl = m.controller("equipManagecontroller",function ($rootScope,$scope) {

    /**
     * 设施管理初始化
     */
    $rootScope.eq_init = function () {
        $scope.prevPage = "上一页";
        $scope.nextPage = "下一页";
        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.blurName = "";
        $scope.orderType = "";

        $scope.getEquipmentInfoListOfEquipment();
    };
    /**
     * 获取设施分页列表
     */
    $scope.getEquipmentInfoListOfEquipment = function(){
        if($scope.currentPage == 0){
         this.currentPage = 1;
         }else{
         this.currentPage = $scope.currentPage;
         }
        $.ajax({
            type:"POST",
            url:"/equipment/getEquipmentInfoListOfEquipment",
            data:{"currentPage":this.currentPage,"pageSize":5,"blurName":$scope.blurName,"orderType":$scope.orderType},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.page.list.length == 0 && $scope.currentPage > 1){
                        $scope.currentPage = $scope.currentPage - 1;
                        $scope.getEquipmentInfoListOfEquipment();
                    }
                    $scope.equipmentList = new Array();
                    var obj = {};
                    for(var temp in data.page.list){
                        obj['id'] = data.page.list[temp].id;
                        obj['equipmentName'] = data.page.list[temp].equipmentName;
                        obj['price'] = data.page.list[temp].price;
                        obj['description'] = data.page.list[temp].description;
                        obj['totalNum'] = data.page.list[temp].totalNum;
                        obj['usedNum'] = data.page.list[temp].usedNum;
                        obj['repaireNum'] = data.page.list[temp].repaireNum;
                        /*var datestr = new Date(parseInt(data.page.list[temp].createTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['createTime'] = temstr;	//创建时间*/
                        $scope.equipmentList.push(obj);obj = {};
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
                $scope.getEquipmentInfoListOfEquipment();
            }
        }else if(obj=="下一页"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == $scope.totalPage){
                alert("当前已经是最后一页！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage + 1;
                $scope.getEquipmentInfoListOfEquipment();
            }
        }
    };
    /**
     * 新增设施
     */
    $scope.addOneEquipmentModal = function(){
        $scope.add_equipmentName = "";
        $scope.add_price = "";
        $scope.add_description = "";
        $scope.add_totalNum = "";

        $("#modalid-eqmng-add").modal("toggle");
    };
    $scope.addOneEquipment = function(){
        $.ajax({
            type: "POST",
            url: "/equipment/addToEquipment",
            data: {
                "equipmentName": $scope.add_equipmentName,
                "price": $scope.add_price,
                "description": $scope.add_description,
                "totalNum": $scope.add_totalNum,
                "usedNum": 0,
                "repaireNum": 0
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "新增设施成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getEquipmentInfoListOfEquipment();
                });
            }
        });
    };
    /**
     * 删除设施
     */
    $scope.deleteOneEquipmentModal = function(item){
        $scope.deleteTemp = item;
        $("#modalid-eqmng-delete").modal("toggle");
    };
    $scope.deleteOneEquipment = function(){
        $.ajax({
            type: "POST",
            url: "/equipment/removeEquipmentInfoFromEquipment",
            data: {
                "id": $scope.deleteTemp.id
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "删除设施成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getEquipmentInfoListOfEquipment();
                });
            }
        });
    };
    /**
     * 编辑设施
     */
    $scope.editOneEquipmentModal = function(item){
        $.ajax({
            type: "POST",
            url: "/equipment/getOneEquipmentById",
            data: {
                "id": item.id
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $scope.editEquipmentList = new Array();
                    var obj = {};
                    //for(var temp in data.page.list){
                    obj['id'] = data.value.value.id;
                    obj['equipmentName'] = data.value.value.equipmentName;
                    obj['price'] = data.value.value.price;
                    obj['description'] = data.value.value.description;
                    obj['totalNum'] = parseInt(data.value.value.totalNum);
                    obj['usedNum'] = parseInt(data.value.value.usedNum);
                    obj['repaireNum'] = parseInt(data.value.value.repaireNum);
                    //obj['calNum'] = obj['usedNum']+obj['repaireNum'];
                    /*var datestr = new Date(parseInt(data.page.list[temp].createTime));
                     var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                     //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                     ;
                     obj['createTime'] = temstr;	//创建时间*/
                    $scope.editEquipmentList.push(obj);obj = {};
                    /*$scope.numOperation = $scope.editEquipmentList[0].totalNum<($scope.editEquipmentList[0].usedNum+$scope.editEquipmentList[0].repaireNum);
                    console.log($scope.numOperation);*/
                    //}
                });
            }
        });
        $("#modalid-eqmng-edit").modal("toggle");
    };
    $scope.editOneEquipment = function(){
        $.ajax({
            type: "POST",
            url: "/equipment/updateEquipmentInfoFromEquipment",
            data: {
                "id": $scope.editEquipmentList[0].id,
                "equipmentName": $scope.editEquipmentList[0].equipmentName,
                "price": $scope.editEquipmentList[0].price,
                "description": $scope.editEquipmentList[0].description,
                "totalNum": $scope.editEquipmentList[0].totalNum,
                "usedNum": $scope.editEquipmentList[0].usedNum,
                "repaireNum": $scope.editEquipmentList[0].repaireNum
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "编辑设施成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getEquipmentInfoListOfEquipment();
                });
            }
        });
    };

});