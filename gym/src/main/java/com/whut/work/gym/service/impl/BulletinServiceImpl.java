package com.whut.work.gym.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.whut.work.base.model.Page;
import com.whut.work.base.util.JavaStringUtil;
import com.whut.work.gym.dao.impl.BulletinDaoImpl;
import com.whut.work.gym.model.Bulletin;
import com.whut.work.gym.service.IBulletinService;
import com.whut.work.user.dao.IUserDao;
import com.whut.work.user.model.User;

@Component
public class BulletinServiceImpl implements IBulletinService{

    @Autowired
    private BulletinDaoImpl bulletinDao;
    @Autowired
	private IUserDao userDao;

	public Map<String, Object> addToBulletin(String title, String content, int userId) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();
        try {
        	Bulletin bulletin = new Bulletin();
            
            bulletin.setTitle(title);
            bulletin.setContent(content);
            bulletin.setPublishTime(new Date());
            
            String queryHql = " from User q where id = '" + userId + "' ";
            User user = userDao.findOne(queryHql);
            
            bulletin.setUser(user);
            
            bulletinDao.save(bulletin);
            
            returnMap.put("value", bulletin);
            returnMap.put("message", "将公告信息加入公告表成功");
            returnMap.put("success", true);
		} catch (Exception e) {
			// TODO: handle exception
		}
        return returnMap;
    }

    public Page<Bulletin> getBulletinInfoListOfBulletin(Integer currentPage, Integer pageSize) throws Exception {
    	
        String queryHql = " from Bulletin b order by publishTime desc";
        String countHql = " select count(*) from Bulletin b ";
        Page<Bulletin> page = bulletinDao.findPage(currentPage, pageSize, queryHql, countHql);

        return page;
    }

    public Map<String,Object> removeBulletinInfoFromBulletin(Integer id) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();
 
            String hql = " from Bulletin b where b.id='" + id + "' ";
            String delhql = " delete Bulletin where id='" + id + "' ";
            if(bulletinDao.findOne(hql) != null){
            	bulletinDao.deleteWithHql(delhql);
            }

        JavaStringUtil.setListInt(new ArrayList<Integer>());
        returnMap.put("message", "已从公告表中删除指定公告信息");
        returnMap.put("success", true);
        return returnMap;
    }
    
    @Override
    public Map<String, Object> findBulletinInfoByBulletinId(Integer bulletinId) throws Exception {
        Map<String,Object> returnMap = new HashMap<String,Object>();
        Bulletin bulletin = bulletinDao.findOne(" from Bulletin b where b.bulletinId = '" + bulletinId + "' ");
        if(bulletin != null){
            returnMap.put("value", bulletin);
            returnMap.put("message", "获取成功");
            returnMap.put("success", true);
        }else {
            returnMap.put("message", "获取失败");
            returnMap.put("success", false);
        }

        return returnMap;
    }

}
