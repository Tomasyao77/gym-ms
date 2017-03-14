package com.whut.work.gym.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.whut.work.base.model.Page;
import com.whut.work.gym.model.Playground;
import com.whut.work.gym.service.IPlaygroundService;

/**
 * @Func 场地表相关接口设计
 * @author Justerdu 2017-03-11
 */
@Controller
@RequestMapping("/playground")
public class PlaygroundCtrl {

    @Autowired
    private IPlaygroundService playgroundService;

    @RequestMapping(value="/addToPlayground",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addToPlayground(String playgroundName, String size, int price, String position, String isFree, String description){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = playgroundService.addToPlayground(playgroundName, size, price, position, isFree, description);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/getPlaygroundInfoListOfPlayground",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getPlaygroundInfoListOfPlayground(Integer currentPage, Integer pageSize, String blurName, String orderType){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Page<Playground> result = playgroundService.getPlaygroundInfoListOfPlayground(currentPage, pageSize, blurName, orderType);

            returnMap.put("page", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/removePlaygroundInfoFromPlayground",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> removePlaygroundInfoFromPlayground(Integer id){
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = playgroundService.removePlaygroundInfoFromPlayground(id);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/updatePlaygroundInfoFromPlayground",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updatePlaygroundInfoFromPlayground(Integer playgroundId, String playgroundName, String size, int price, String position, String isFree, String description){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = playgroundService.updatePlaygroundInfoFromPlayground(playgroundId, playgroundName, size, price, position, isFree, description);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }
    
    @RequestMapping(value="/setFreeStatusByPlaygroundId",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> setFreeStatusByPlaygroundId(Integer playgroundId, String isFree){
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = playgroundService.setFreeStatusByPlaygroundId(playgroundId, isFree);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }
    
	@RequestMapping(value="/findAllFreePlayground",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> findAllFreePlayground(Integer currentPage, Integer pageSize){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Page<Playground> result = playgroundService.findAllFreePlayground(currentPage, pageSize);

            returnMap.put("page", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }


    @RequestMapping(value="/getOnePlayGrdById",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getOnePlayGrdById(Integer id){
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = playgroundService.getOnePlayGrdById(id);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

}
