package com.whut.work.gym.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.whut.work.base.model.Page;
import com.whut.work.gym.model.Bulletin;
import com.whut.work.gym.service.IBulletinService;

/**
 * @Func 公告信息表相关接口设计
 * @author Justerdu 2017-03-11
 */
@Controller
@RequestMapping("/bulletin")
public class BulletinCtrl {

    @Autowired
    private IBulletinService bulletinService;

    @RequestMapping(value="/addToBulletin",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addToBulletin(String title, String content, int userId){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = bulletinService.addToBulletin(title, content, userId);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/getBulletinInfoListOfBulletin",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getBulletinInfoListOfBulletin(Integer currentPage, Integer pageSize){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Page<Bulletin> result = bulletinService.getBulletinInfoListOfBulletin(currentPage, pageSize);

            returnMap.put("page", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/removeBulletinInfoFromBulletin",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> removeBulletinInfoFromBulletin(Integer id){
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = bulletinService.removeBulletinInfoFromBulletin(id);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }
    
    @RequestMapping(value="/findBulletinInfoByBulletinId",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> findBulletinInfoByBulletinId(Integer bulletinId){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
        	Map<String,Object> result = bulletinService.findBulletinInfoByBulletinId(bulletinId);

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
