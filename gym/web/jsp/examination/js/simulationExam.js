/**
 * Created by zouyao on 2017/3/6.
 */
var simulationExamCtrl = m.controller("simulationExamcontroller",function ($rootScope,$scope) {

    /**
     * 模拟考试初始化
     */
    $rootScope.se_init = function () {
        $scope.prevPage = "上一题";
        $scope.nextPage = "下一题";

        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.showAnswer = -1;

        $scope.initInfoShow = 0;
        $scope.stuName = "";
        $scope.stuNumber = "";
        $scope.submitPaper = 0;

        $scope.answerType = -1;
        $scope.checkBoxArray = new Array();
        $scope.resetCheck();
        $scope.getQuestionListOfQuestionBank();
    };
    /**
     * 开始考试
     */
    $scope.startExam = function(){
        if($scope.stuName == "" || $scope.stuName == null ||
            $scope.stuNumber == "" || $scope.stuNumber == null){
                /*$rootScope.justForModalInfomation = "请将信息填写完整!";
                $("#modalid-toastInfo").modal("toggle");*/
            alert("请将信息填写完整!");
            return ;
        }
        $scope.initInfoShow = 1;
        //倒计时30分钟
        $scope.time_m = 29;
        $scope.time_s = 59;
        var clock = function(){
            if($scope.time_m == 0 && $scope.time_s == 0){//考试时间到
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "考试时间到!请交卷";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.submitPaper = 1;
                });
                clearInterval(int);
            }
            if($scope.time_s<10){
                $('#myTime').html($scope.time_m+':0'+$scope.time_s);
            }else{
                $('#myTime').html($scope.time_m+':'+$scope.time_s);
            }
            $scope.time_s--;
            if($scope.time_s<0){
                $scope.time_s = 59;
                $scope.time_m--;
            }
        };
        var int = setInterval(function(){clock()},1000);
    };
    /**
     * 获取模拟考试题库分页列表
     */
    $scope.getQuestionListOfQuestionBank = function(){
        $scope.answerType = -1;//隐藏警告框
        if($scope.currentPage == 0){
         this.currentPage = 1;
         }else{
         this.currentPage = $scope.currentPage;
         }
        $.ajax({
            type:"POST",
            url:"/questionBank/getQuestionListOfQuestionBank",
            data:{"currentPage":this.currentPage,"pageSize":100},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.page.list.length == 0 && $scope.currentPage > 1){
                        $scope.currentPage = $scope.currentPage - 1;
                        $scope.getQuestionListOfQuestionBank();
                    }
                    $scope.questionBankArray = new Array();
                    var obj = {};
                    for(var temp in data.page.list){
                        obj['id'] = data.page.list[temp].id;
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
                        //obj['radioChecked'] = false;
                        var datestr = new Date(parseInt(data.page.list[temp].createTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['createTime'] = temstr;	//创建时间
                        $scope.questionBankArray.push(obj);obj = {};
                    }
                    //分页相关更新
                    $scope.currentPage = data.page.current;
                    //$scope.totalPage = data.page.total;
                    $scope.totalPage = 20;
                    //随机抽取20道题
                    $scope.questionBankArray.sort(function(){ return 0.5 - Math.random() });
                    $scope.questionBankArray.splice(0,20);
                });
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
                //$scope.getQuestionListOfQuestionBank();
            }
        }else if(obj=="下一题"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == $scope.totalPage){
                alert("当前已经是最后一题！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage + 1;
                //$scope.getQuestionListOfQuestionBank();
            }
        }
    };
    /**
     * 核对答案(交卷)
     */
    $scope.checkAnswer = function(){
        if($scope.checkBoxArray.length < 20){
            $scope.$apply(function(){
                $rootScope.justForModalInfomation = "还有未答题！";
                $("#modalid-toastInfo").modal("toggle");
            });
            return ;
        }
        /*$scope.showAnswer = -1;
        //if($scope.checkBoxArray[0] == $scope.questionBankArray[0].rightAnswer){//正确
        if($scope.checkBoxArray[0] == $scope.questionBankArray[$scope.currentPage-1].rightAnswer){
            $scope.answerType = 0;
        }else{
            $scope.answerType = 1;//错误
        }*/
        $scope.count = 0;//正确数
        for(var i=0;i<20;i++){
            if($scope.questionBankArray[i].rightAnswer == $scope.checkBoxArray[i]){
                $scope.count++;
            }
        }
        $("#modalid-result-se").modal("toggle");
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
        if($event.target.checked == true){
            $scope.checkBoxArray[$scope.currentPage-1] = $event.target.value;
            //console.log($scope.checkBoxArray);
        }
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
    $scope.addExamRecordToDB = function(){
        this.duration = 30 - $scope.time_m;
        this.score = $scope.count / 20 * 100;
        $.ajax({
            type: "POST",
            url: "/exam/addToExam",
            data: {"userId": $rootScope.idOfLoger,"duration":this.duration,"score":this.score},
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                console.log(data);
            }
        });
    };

});