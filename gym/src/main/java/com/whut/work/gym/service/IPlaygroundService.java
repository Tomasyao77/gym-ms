package com.whut.work.gym.service;

import com.whut.work.base.model.Page;
import com.whut.work.gym.model.Playground;

import java.util.Map;

public interface IPlaygroundService {

    //将场地信息加入场地表中
    public Map<String,Object> addToPlayground(String playgroundName, String size, int price, String position, String isFree, String description) throws Exception;

    //获取场地表中的场地信息
    public Page<Playground> getPlaygroundInfoListOfPlayground(Integer currentPage, Integer pageSize, String blurName, String orderType) throws Exception;

    //从场地表中移除场地信息
    public Map<String,Object> removePlaygroundInfoFromPlayground(Integer id) throws Exception;
    
    //从场地表中更新场地信息
    public Map<String,Object> updatePlaygroundInfoFromPlayground(Integer playgroundId, String playgroundName, String size, int price, String position, String isFree, String description) throws Exception;

    //根据场地id设置场地空闲状态
    public Map<String,Object> setFreeStatusByPlaygroundId(Integer playgroundId, String isFree) throws Exception;

    //查找所有处于空闲状态的场地
    public Page<Playground> findAllFreePlayground(Integer currentPage, Integer pageSize) throws Exception;

    //根据场地id获取一条场地记录
    public Map<String,Object> getOnePlayGrdById(Integer playgroundId) throws Exception;


}
