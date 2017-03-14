package com.whut.work.gym.service;

import com.whut.work.base.model.Page;
import com.whut.work.gym.model.Equipment;

import java.util.Map;

public interface IEquipmentService {

    //将设施信息加入设施表中
    public Map<String,Object> addToEquipment(String equipmentName, int price, String description, int totalNum, int usedNum, int repaireNum) throws Exception;

    //获取设施表中的设施信息
    public Page<Equipment> getEquipmentInfoListOfEquipment(Integer currentPage, Integer pageSize, String blurName, String orderType) throws Exception;

    //从设施表中移除设施信息
    public Map<String,Object> removeEquipmentInfoFromEquipment(Integer id) throws Exception;
    
    //从设施表中修改设施信息
    public Map<String,Object> updateEquipmentInfoFromEquipment(Integer id, String equipmentName, int price, String description, int totalNum, int usedNum, int repaireNum) throws Exception;

    //根据设施id获取一条设施记录
    public Map<String,Object> getOneEquipmentById(Integer id) throws Exception;
    
}
