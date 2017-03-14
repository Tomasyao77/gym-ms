package com.whut.work.gym.service;

import java.util.Map;

import com.whut.work.base.model.Page;
import com.whut.work.gym.model.Bulletin;

public interface IBulletinService {

    //将公告信息加入公告表中
    public Map<String,Object> addToBulletin(String title, String content, int userId) throws Exception;

    //获取公告表中的公告信息
    public Page<Bulletin> getBulletinInfoListOfBulletin(Integer currentPage, Integer pageSize) throws Exception;

    //从公告表中移除公告信息
    public Map<String,Object> removeBulletinInfoFromBulletin(Integer id) throws Exception;
    
  //根据预约id查找其预约信息
    public Map<String,Object> findBulletinInfoByBulletinId(Integer bulletinId) throws Exception;
}
