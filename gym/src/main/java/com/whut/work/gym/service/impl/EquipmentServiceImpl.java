package com.whut.work.gym.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.whut.work.base.model.Page;
import com.whut.work.base.util.JavaStringUtil;
import com.whut.work.gym.dao.impl.EquipmentDaoImpl;
import com.whut.work.gym.model.Equipment;
import com.whut.work.gym.service.IEquipmentService;

@Component
public class EquipmentServiceImpl implements IEquipmentService{

    @Autowired
    private EquipmentDaoImpl equipmentDao;

	public Map<String, Object> addToEquipment(String equipmentName, int price, String description, int totalNum, int usedNum, int repaireNum) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        Equipment equipment = new Equipment();
        
        equipment.setEquipmentName(equipmentName);
        equipment.setPrice(price);
        equipment.setDescription(description);
        equipment.setTotalNum(totalNum);
        equipment.setUsedNum(usedNum);
        equipment.setRepaireNum(repaireNum);
        
        equipmentDao.save(equipment);
        
        returnMap.put("value", equipment);
        returnMap.put("message", "将设施信息加入设施表成功");
        returnMap.put("success", true);

        return returnMap;
    }

    public Page<Equipment> getEquipmentInfoListOfEquipment(Integer currentPage, Integer pageSize, String blurName, String orderType) throws Exception {
    	
    	 String conditions = "";
    	 String conditionsforcount = "";
         if(!blurName.equals("")){
             conditions += " where e.equipmentName like '%" + blurName + "%' ";
             conditionsforcount = conditions;
         }
         if(orderType.equals("100000")){
             conditions += " order by e.equipmentName desc ";
         }else if(orderType.equals("010000")){
             conditions += " order by e.equipmentName asc ";
         }else {
             conditions += " order by e.equipmentName desc ";
         }
    	
        String queryHql = " from Equipment e " + conditions + " ";
        String countHql = " select count(*) from Equipment e " + conditionsforcount + " ";
        Page<Equipment> page = equipmentDao.findPage(currentPage, pageSize, queryHql, countHql);

        return page;
    }

    public Map<String,Object> removeEquipmentInfoFromEquipment(Integer id) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();
 
            String hql = " from Equipment e where e.id='" + id + "' ";
            String delhql = " delete Equipment where id='" + id + "' ";
            if(equipmentDao.findOne(hql) != null){
            	equipmentDao.deleteWithHql(delhql);
            }

        JavaStringUtil.setListInt(new ArrayList<Integer>());
        returnMap.put("message", "已从设施表中删除指定设施信息");
        returnMap.put("success", true);
        return returnMap;
    }
    
    public Map<String, Object> updateEquipmentInfoFromEquipment(Integer id, String equipmentName, int price, String description, int totalNum, int usedNum, int repaireNum) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        String hql = " from Equipment e where e.id='" + id + "' ";
        Equipment equipment = equipmentDao.findOne(hql);
        if(equipment != null){
        	equipment.setId(id);
        	equipment.setEquipmentName(equipmentName);
            equipment.setPrice(price);
            equipment.setDescription(description);
            equipment.setTotalNum(totalNum);
            equipment.setUsedNum(usedNum);
            equipment.setRepaireNum(repaireNum);
            
            equipmentDao.update(equipment);
            
            returnMap.put("value", equipment);
            returnMap.put("message", "编辑成功");
            returnMap.put("success", true);
        } else{
            returnMap.put("message", "编辑失败");
            returnMap.put("success", false);
        }
        
        return returnMap;
    }

    @Override
    public Map<String, Object> getOneEquipmentById(Integer id) throws Exception {
        Map<String,Object> returnMap = new HashMap<String,Object>();
        Equipment equipment = equipmentDao.findOne(" from Equipment e where e.id='"+id+"' ");
        if(equipment != null){
            returnMap.put("value", equipment);
            returnMap.put("message", "获取成功");
            returnMap.put("success", true);
        }else {
            returnMap.put("message", "获取失败");
            returnMap.put("success", false);
        }

        return returnMap;
    }

}
