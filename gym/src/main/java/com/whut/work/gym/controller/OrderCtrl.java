package com.whut.work.gym.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.whut.work.base.model.Page;
import com.whut.work.gym.model.Order;
import com.whut.work.gym.service.IOrderService;

/**
 * @Func 预约信息表相关接口设计
 * @author Justerdu 2017-03-11
 */
@Controller
@RequestMapping("/order")
public class OrderCtrl {

    @Autowired
    private IOrderService orderService;

    @RequestMapping(value="/addToOrder",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object>  addToOrder(int userId, int playgroundId, Date startTime, Date endTime){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = orderService.addToOrder(userId, playgroundId, startTime, endTime);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/getOrderInfoListOfOrder",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getOrderInfoListOfOrder(Integer currentPage, Integer pageSize){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Page<Order> result = orderService.getOrderInfoListOfOrder(currentPage, pageSize);

            returnMap.put("page", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/removeOrderInfoFromOrder",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> removeOrderInfoFromOrder(Integer id){
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = orderService.removeOrderInfoFromOrder(id);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/getOrderListByUserId",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getOrderListByUserId(Integer currentPage, Integer pageSize, Integer userId){

        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Page<Order> result = orderService.getOrderListByUserId(currentPage, pageSize,userId);

            returnMap.put("page", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }
    
}
