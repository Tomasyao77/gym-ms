/**
 * Created by zouyao on 2017/3/6.
 */
var examRecordCtrl = m.controller("examRecordcontroller",function ($rootScope,$scope) {

    /**
     * 考试记录初始化
     */
    $rootScope.er_init = function () {
        $scope.prevPage = "上一页";
        $scope.nextPage = "下一页";

        $scope.currentPage = 1;
        $scope.totalPage = 1;

        $scope.getExamInfoListOfExam();
    };
    /**
     * 获取考试记录分页列表
     */
    $scope.getExamInfoListOfExam = function(){
        if($scope.currentPage == 0){
         this.currentPage = 1;
         }else{
         this.currentPage = $scope.currentPage;
         }
        $.ajax({
            type:"POST",
            url:"/exam/getExamInfoListOfExam",
            data:{"userId":$rootScope.idOfLoger,"currentPage":this.currentPage,"pageSize":5},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    if(data.page.list.length == 0 && $scope.currentPage > 1){
                        $scope.currentPage = $scope.currentPage - 1;
                        $scope.getExamInfoListOfExam();
                    }
                    $scope.examList = new Array();
                    var obj = {};
                    for(var temp in data.page.list){
                        obj['id'] = data.page.list[temp].id;
                        obj['duration'] = data.page.list[temp].duration;
                        obj['score'] = data.page.list[temp].score;
                        obj['remark'] = data.page.list[temp].remark;
                        var datestr = new Date(parseInt(data.page.list[temp].examTime));
                        var temstr = datestr.getFullYear() + "年" + (parseInt(datestr.getMonth())+1) + "月" + datestr.getDate() + "日"
                        //+ datestr.getHours() + ":" + datestr.getMinutes() + ":" + datestr.getSeconds()
                            ;
                        obj['examTime'] = temstr;	//创建时间
                        $scope.examList.push(obj);obj = {};
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
                $scope.getExamInfoListOfExam();
            }
        }else if(obj=="下一页"){
            if($scope.currentPage == 0){
                //nothing to do
            }else if($scope.currentPage == $scope.totalPage){
                alert("当前已经是最后一页！");//其实并不会发生，因为disabled
            }else{
                $scope.currentPage = $scope.currentPage + 1;
                $scope.getExamInfoListOfExam();
            }
        }
    };
    /**
     * 删除考试记录
     */
    $scope.deleteOneRecord = function (item) {
        $.ajax({
            type:"POST",
            url:"/exam/removeExamInfoFromExam",
            data:{"id":item.id},
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            success:function(data){
                console.log(data);
                $scope.$apply(function(){
                    $rootScope.justForModalInfomation = "删除成功!";
                    $("#modalid-toastInfo").modal("toggle");
                    $scope.getExamInfoListOfExam();
                });
            }
        });
    };

});