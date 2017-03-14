package com.whut.work.gym.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.whut.work.base.model.Page;
import com.whut.work.gym.model.Equipment;
import com.whut.work.gym.service.IEquipmentService;

/**
 * @Func 设施表相关接口设计
 * @author Justerdu 2017-03-11
 */
@Controller
@RequestMapping("/equipment")
public class EquipmentCtrl {

    @Autowired
    private IEquipmentService equipmentService;

    @RequestMapping(value="/addToEquipment",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addToEquipment(String equipmentName, int price, String description, int totalNum, int usedNum, int repaireNum){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = equipmentService.addToEquipment(equipmentName, price, description, totalNum, usedNum, repaireNum);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/getEquipmentInfoListOfEquipment",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getEquipmentInfoListOfEquipment(Integer currentPage, Integer pageSize, String blurName, String orderType){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Page<Equipment> result = equipmentService.getEquipmentInfoListOfEquipment(currentPage, pageSize, blurName, orderType);

            returnMap.put("page", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/removeEquipmentInfoFromEquipment",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> removeEquipmentInfoFromEquipment(Integer id){
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = equipmentService.removeEquipmentInfoFromEquipment(id);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }
    
    @RequestMapping(value="/updateEquipmentInfoFromEquipment",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateEquipmentInfoFromEquipment(Integer id, String equipmentName, int price, String description, int totalNum, int usedNum, int repaireNum){
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = equipmentService.updateEquipmentInfoFromEquipment(id, equipmentName, price, description, totalNum, usedNum, repaireNum);

            returnMap.put("value", result);
            returnMap.put("success", true);
        } catch (Exception e) {
            returnMap.put("message", "异常：操作失败!");
            returnMap.put("success", false);
            e.printStackTrace();
        }
        return returnMap;
    }

    @RequestMapping(value="/getOneEquipmentById",method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getOneEquipmentById(Integer id){

        Map<String,Object> returnMap = new HashMap<String,Object>();

        try {
            Map<String,Object> result = equipmentService.getOneEquipmentById(id);

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
