/**
 * Created by zouyao on 2017/3/6.
 */
var writeQuestionCtrl = m.controller("writeQuestioncontroller",function ($rootScope,$scope) {

    $rootScope.wq_init = function () {

        $scope.title = "";
        $scope.description = "";
        $scope.itemA = "";
        $scope.itemB = "";
        $scope.itemC = "";
        $scope.itemD = "";
        $scope.rightAnswer = "";
        $scope.answerKeys = "";
        $scope.chapter = "";
        $scope.type = "";
        $scope.remark = "";

    };

    /**
     * 增前判断
     */
    $scope.checkBeforeAdd = function () {
        if($scope.title == "" || $scope.description == "" || $scope.itemA == "" ||
            $scope.itemB == "" ||  $scope.itemC == "" ||  $scope.itemD == "" ||
            $scope.rightAnswer == "" || $scope.answerKeys == "" ||
            $scope.chapter == "" || $scope.type == "" || $scope.remark == "" ||
            $scope.title == null || $scope.description == null || $scope.itemA == null ||
            $scope.itemB == null ||  $scope.itemC == null ||  $scope.itemD == null ||
            $scope.rightAnswer == null || $scope.answerKeys == null ||
            $scope.chapter == null || $scope.type == null || $scope.remark == null){
            return false;
        }else {
            return true;
        }

    };
    /**
     * 增加一道题目
     */
    $scope.addToQuestionBank = function () {
        /*console.log($scope.checkBeforeAdd());
        console.log($scope.title);*/
        if($scope.checkBeforeAdd() == false){
            $rootScope.justForModalInfomation = "请将信息填写完整!";
            $("#modalid-toastInfo").modal("toggle");
            return ;
        }
        $.ajax({
            type:"POST",
            url:"/questionBank/addToQuestionBank",
            data:{"title":$scope.title ,"description":$scope.description,
                "itemA":$scope.itemA,"itemB":$scope.itemB,"itemC":$scope.itemC,"itemD":$scope.itemD,
                "rightAnswer":$scope.rightAnswer,"answerKeys":$scope.answerKeys,
                "chapter":$scope.chapter,"type":$scope.type,"remark":$scope.remark},
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
     * 重置
     */
    $scope.resetWrite = function () {

        $scope.title = "";
        $scope.description = "";
        $scope.itemA = "";
        $scope.itemB = "";
        $scope.itemC = "";
        $scope.itemD = "";
        $scope.rightAnswer = "";
        $scope.answerKeys = "";
        $scope.chapter = "";
        $scope.type = "";
        $scope.remark = "";

    };

});