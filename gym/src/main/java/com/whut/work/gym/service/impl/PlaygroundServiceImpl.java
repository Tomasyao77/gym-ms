package com.whut.work.gym.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.whut.work.base.model.Page;
import com.whut.work.base.util.JavaStringUtil;
import com.whut.work.gym.dao.impl.PlaygroundDaoImpl;
import com.whut.work.gym.model.Playground;
import com.whut.work.gym.service.IPlaygroundService;

@Component
public class PlaygroundServiceImpl implements IPlaygroundService{

    @Autowired
    private PlaygroundDaoImpl playgroundDao;

	public Map<String, Object> addToPlayground(String playgroundName, String size, int price, String position, String isFree, String description) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        Playground playground = new Playground();
        
        playground.setPlaygroundName(playgroundName);
        playground.setSize(size);
        playground.setPrice(price);
        playground.setPosition(position);
        playground.setIsFree(isFree);
        playground.setDescription(description);
        
        playgroundDao.save(playground);
        
        returnMap.put("value", playground);
        returnMap.put("message", "将场地信息加入场地表成功");
        returnMap.put("success", true);

        return returnMap;
    }

	public Page<Playground> getPlaygroundInfoListOfPlayground(Integer currentPage, Integer pageSize, String blurName, String orderType) throws Exception {

		String conditions = "";
		String conditionsforcount = "";
		if (!blurName.equals("")) {
			conditions += " where p.playgroundName like '%" + blurName + "%' ";
			conditionsforcount = conditions;
		}
		if (orderType.equals("100000")) {
			conditions += " order by p.playgroundName desc ";
		} else if (orderType.equals("010000")) {
			conditions += " order by p.playgroundName asc ";
		} else {
			conditions += " order by p.playgroundName desc ";
		}

		String queryHql = " from Playground p " + conditions + " ";
		String countHql = " select count(*) from Playground p " + conditionsforcount + " ";
		Page<Playground> page = playgroundDao.findPage(currentPage, pageSize, queryHql, countHql);

		return page;
	}

    public Map<String,Object> removePlaygroundInfoFromPlayground(Integer id) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();
 
            String hql = " from Playground p where p.playgroundId='" + id + "' ";
            String delhql = " delete Playground where playgroundId='" + id + "' ";
            if(playgroundDao.findOne(hql) != null){
            	playgroundDao.deleteWithHql(delhql);
            }

        JavaStringUtil.setListInt(new ArrayList<Integer>());
        returnMap.put("message", "已从场地表中删除指定场地信息");
        returnMap.put("success", true);
        return returnMap;
    }

    public Map<String, Object> updatePlaygroundInfoFromPlayground(Integer playgroundId, String playgroundName, String size, int price, String position, String isFree, String description) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        String hql = " from Playground p where p.playgroundId='" + playgroundId + "' ";
        Playground playground = playgroundDao.findOne(hql);
        if(playground != null){
        	playground.setPlaygroundId(playgroundId);
        	playground.setPlaygroundName(playgroundName);
            playground.setSize(size);
            playground.setPrice(price);
            playground.setPosition(position);
            playground.setIsFree(isFree);
            playground.setDescription(description);
            
            playgroundDao.update(playground);
            
            returnMap.put("value", playground);
            returnMap.put("message", "编辑成功");
            returnMap.put("success", true);
        } else{
        	returnMap.put("message", "编辑失败");
            returnMap.put("success", false);
        }

        return returnMap;
    }
    
    public Map<String, Object> setFreeStatusByPlaygroundId(Integer playgroundId, String isFree) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();

        String hql = " from Playground p where p.playgroundId='" + playgroundId + "' ";
        Playground playground = playgroundDao.findOne(hql);
        if(playground != null){
            playground.setIsFree(isFree);
            playgroundDao.update(playground);
            
            returnMap.put("value", playground);
            returnMap.put("message", "编辑成功");
            returnMap.put("success", true);
        } else{
        	returnMap.put("message", "编辑失败");
            returnMap.put("success", false);
        }

        return returnMap;
    }


    public Page<Playground> findAllFreePlayground(Integer currentPage, Integer pageSize) throws Exception {

		String queryHql = " from Playground p where p.isFree = '否' ";
		String countHql = " select count(*) from Playground p where p.isFree = '否' ";
		Page<Playground> page = playgroundDao.findPage(currentPage, pageSize, queryHql, countHql);

		return page;
	}

    @Override
    public Map<String, Object> getOnePlayGrdById(Integer playgroundId) throws Exception {
        Map<String,Object> returnMap = new HashMap<String,Object>();
        Playground playground = playgroundDao.findOne(" from Playground p where p.playgroundId='"+playgroundId+"' ");
        if(playground != null){
            returnMap.put("value", playground);
            returnMap.put("message", "获取成功");
            returnMap.put("success", true);
        }else {
            returnMap.put("message", "获取失败");
            returnMap.put("success", false);
        }

        return returnMap;
    }


}
