/**
 * Created by zouyao on 2017/3/6.
 */
var myWrongCtrl = m.controller("myWrongcontroller",function ($rootScope,$scope) {

    /**
     * 我的错题初始化
     */
    $rootScope.mw_init = function () {
        $scope.prevPage = "上一题";
        $scope.nextPage = "下一题";

        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.showAnswer = -1;

        $scope.answerType = -1;
        $scope.checkBoxArray = new Array();
        $scope.resetCheck();
        $scope.getWrongQuestionListOfWrongQuestionByUserId();
    };
    /**
     * 获取我的错题分页列表
     */
    $scope.getWrongQuestionListOfWrongQuestionByUserId = function(){
        $scope.answerType = -1;//隐藏警告框
        if($scope.currentPage == 0){
         this.currentPage = 1;
         }else{
         this.currentPage = $scope.currentPage;
         }
        $.ajax({
            type:"POST",
            url:"/wrongQuestion/getWrongQuestionListOfWrongQuestionByUserId",
            data:{"userId":$rootScope.idOfLoger,"currentPage":this.currentPage,"pageSize":1},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.page.list.length == 0 && $scope.currentPage > 1){
                        $scope.currentPage = $scope.currentPage - 1;
                        $scope.getWrongQuestionListOfWrongQuestionByUserId();
                    }
                    $scope.questionBankArrayTemp = new Array();
                    var obj = {};
                    for(var temp in data.page.list){
                        /*obj['id'] = data.page.list[temp].id;
                        obj['title'] = data.page.list[temp].title;
                        obj['description'] = data.page.list[temp].description;
                        obj['itemA'] = data.page.list[temp].itemA;
                        obj['itemB'] = data.page.list[temp].itemB;
                        obj['itemC'] = data.page.list[temp].itemC;
                        obj['itemD'] = data.page.list[temp].itemD;
                        obj['rightAnswer'] = data.page.list[temp].rightAnswer;
                        obj['answerKeys'] = data.page.list[temp].answerKeys;
                        obj['chapter'] = data.page.list[temp].chapter;
                        obj['type'] = data.page.list[temp].type;
                        obj['remark'] = data.page.list[temp].remark;
                        var datestr = new Date(parseInt(data.page.list[temp].createTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['createTime'] = temstr;	//创建时间
                        $scope.questionBankArray.push(obj);obj = {};*/
                        obj['id'] = data.page.list[temp].id;
                        obj['questionId'] = data.page.list[temp].questionId;
                        obj['amount'] = data.page.list[temp].amount;
                        obj['remark'] = data.page.list[temp].remark;
                        $scope.questionBankArrayTemp.push(obj);
                        console.log($scope.questionBankArrayTemp);
                    }
                });
                if(data.page.list.length == 0){
                    return ;
                }else{
                    //获取某题信息
                    $.ajax({
                        type:"POST",
                        url:"/questionBank/findQuestionById",
                        data:{"id":$scope.questionBankArrayTemp[0].questionId},
                        contentType:"application/x-www-form-urlencoded",
                        dataType:"json",
                        success:function(data){
                            console.log(data);
                            $scope.$apply(function(){
                                var obj = {};
                                $scope.questionBankArray = new Array();
                                obj['id'] = data.result.id;
                                obj['title'] = data.result.title;
                                obj['description'] = data.result.description;
                                obj['itemA'] = data.result.itemA;
                                obj['itemB'] = data.result.itemB;
                                obj['itemC'] = data.result.itemC;
                                obj['itemD'] = data.result.itemD;
                                obj['rightAnswer'] = data.result.rightAnswer;
                                obj['answerKeys'] = data.result.answerKeys;
                                obj['chapter'] = data.result.chapter;
                                obj['type'] = data.result.type;
                                obj['remark'] = data.result.remark;
                                obj['amount'] = $scope.questionBankArrayTemp[0].amount;
                                var datestr = new Date(parseInt(data.result.createTime));
                                var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                                //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                                    ;
                                obj['createTime'] = temstr;	//创建时间
                                $scope.questionBankArray.push(obj);obj = {};
                            });
                        }
                    });
                }
                //分页相关更新
                $scope.currentPage = data.page.current;
                $scope.totalPage = data.page.total;
            }
        });
    };
    /**
     * 分页操作
     * @param obj
     */
    $scope.makePagingList = function(obj){
        $scope.resetCheck();
        if(obj=="上一题"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == 1){
                alert("当前已经是第一题！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage - 1;
                $scope.getWrongQuestionListOfWrongQuestionByUserId();
            }
        }else if(obj=="下一题"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == $scope.totalPage){
                alert("当前已经是最后一题！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage + 1;
                $scope.getWrongQuestionListOfWrongQuestionByUserId();
            }
        }
    };
    /**
     * 核对答案
     */
    $scope.checkAnswer = function(){
        $scope.showAnswer = -1;
        //if($scope.checkBoxArray[0] == $scope.questionBankArray[0].rightAnswer){//正确
        if($scope.checkBoxArray[0] == $scope.questionBankArray[0].rightAnswer){
            $scope.answerType = 0;
        }else{
            $scope.answerType = 1;//错误
        }
    };
    /**
     * 复选按钮
     * @param $event
     * @param item
     */
    /*$scope.checkBoxs = function ($event,item) {
        if($event.target.checked == true){
            $scope.checkBoxArray.push($event.target.value);
        }else{
            $scope.checkBoxArray.splice(
                $scope.checkBoxArray.indexOf($event.target.value),1
            );
        }
    };*/
    /**
     * 单选按钮
     * @param $event
     */
    $scope.checkBox = function($event){
        $scope.checkBoxArray = new Array();
        $scope.checkBoxArray.push($event.target.value);
    };
    /**
     * 重置选项
     */
    $scope.resetCheck = function(){
        $(".inputid-pan-a").attr("checked",false);
        $(".inputid-pan-b").attr("checked",false);
        $(".inputid-xuan-a").attr("checked",false);
        $(".inputid-xuan-b").attr("checked",false);
        $(".inputid-xuan-c").attr("checked",false);
        $(".inputid-xuan-d").attr("checked",false);

        $scope.showAnswer = -1;
    };
    /**
     * 显示答案解析
     */
    $scope.showAnswerKeys = function(){
        if($scope.showAnswer == 0){
            $scope.showAnswer = -1;
        }else if($scope.showAnswer == -1){
            $scope.showAnswer = 0;
        }
    };
    /**
     * 收藏题目
     */
    /*$scope.collectQuestion = function () {
        $.ajax({
            type:"POST",
            url:"/questionCollection/determineCollectionByUserIdAndQuestionId",
            data:{"userId":$rootScope.idOfLoger,"questionId":$scope.questionBankArray[0].id},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.value == '未收藏'){
                        $scope.haveDone = false;
                        $.ajax({
                            type:"POST",
                            url:"/questionCollection/addToQuestionCollection",
                            data:{"userId":$rootScope.idOfLoger,"questionId":$scope.questionBankArray[0].id},
                            contentType:"application/x-www-form-urlencoded",
                            dataType:"json",
                            success:function(data){
                                console.log(data);
                                $scope.$apply(function(){
                                    $rootScope.justForModalInfomation = "收藏成功!";
                                    $("#modalid-toastInfo").modal("toggle");
                                });
                            }
                        });
                    }else if(data.value == '已收藏'){
                        $scope.haveDone =  true;
                        $rootScope.justForModalInfomation = "该题目已被收藏过!";
                        $("#modalid-toastInfo").modal("toggle");
                    }
                });
            }
        });
    };*/
    /**
     * 取消收藏(错题)
     */
    $scope.cancelCollectQuestion = function () {
        $.ajax({
            type:"POST",
            url:"/wrongQuestion/removeWrongQuestionFromWrongQuestion",
            data:{"id":$scope.questionBankArrayTemp[0].id},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "从错题集移除成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getWrongQuestionListOfWrongQuestionByUserId();
                });
            }
        });
    };

});