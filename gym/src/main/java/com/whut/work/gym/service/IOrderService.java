package com.whut.work.gym.service;

import java.util.Date;
import java.util.Map;

import com.whut.work.base.model.Page;
import com.whut.work.gym.model.Order;

public interface IOrderService {

    //将预约信息加入预约表中
    public Map<String,Object> addToOrder(int userId, int playgroundId, Date startTime, Date endTime) throws Exception;

    //获取预约表中的预约信息
    public Page<Order> getOrderInfoListOfOrder(Integer currentPage, Integer pageSize) throws Exception;

    //从预约表中移除预约信息
    public Map<String,Object> removeOrderInfoFromOrder(Integer id) throws Exception;

    //获取某个用户的预约信息
    public Page<Order> getOrderListByUserId(Integer currentPage, Integer pageSize,Integer userId) throws Exception;
    
}
