package com.whut.work.gym.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.whut.work.base.model.Page;
import com.whut.work.base.util.JavaStringUtil;
import com.whut.work.gym.dao.IPlaygroundDao;
import com.whut.work.gym.dao.impl.OrderDaoImpl;
import com.whut.work.gym.model.Order;
import com.whut.work.gym.model.Playground;
import com.whut.work.gym.service.IOrderService;
import com.whut.work.user.dao.IUserDao;
import com.whut.work.user.model.User;

@Component
public class OrderServiceImpl implements IOrderService{

    @Autowired
    private OrderDaoImpl orderDao;
    @Autowired
	private IUserDao userDao;
    @Autowired
	private IPlaygroundDao playgroundDao;

	public Map<String, Object> addToOrder(int userId, int playgroundId, Date startTime, Date endTime) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();
        try {
        	Order order = new Order();
            
        	String queryHql = " from User u where id = '" + userId + "' ";
            User user = userDao.findOne(queryHql);
            
            String queryHql2 = " from Playground p where playgroundId = '" + playgroundId + "' ";
            Playground playground = playgroundDao.findOne(queryHql2);
            
            order.setUser(user);
            order.setPlayground(playground);
            order.setOrderTime(new Date());
            order.setStartTime(startTime);
            order.setEndTime(endTime);
            orderDao.save(order);
            System.out.println("username: " + user.getUsername());
            
            returnMap.put("value", order);
            returnMap.put("message", "将预约信息加入预约表成功");
            returnMap.put("success", true);
		} catch (Exception e) {
			// TODO: handle exception
		}
        return returnMap;
    }

    public Page<Order> getOrderInfoListOfOrder(Integer currentPage, Integer pageSize) throws Exception {
    	
        String queryHql = " from Order o ";
        String countHql = " select count(*) from Order o ";
        Page<Order> page = orderDao.findPage(currentPage, pageSize, queryHql, countHql);
        System.out.println(page);

        return page;
    }

    public Map<String,Object> removeOrderInfoFromOrder(Integer id) throws Exception {
    	
        Map<String,Object> returnMap = new HashMap<String,Object>();
 
            String hql = " from Order o where o.id='" + id + "' ";
            String delhql = " delete Order where id='" + id + "' ";
            if(orderDao.findOne(hql) != null){
            	orderDao.deleteWithHql(delhql);
            }

        JavaStringUtil.setListInt(new ArrayList<Integer>());
        returnMap.put("message", "已从预约表中删除指定预约信息");
        returnMap.put("success", true);
        return returnMap;
    }

    @Override
    public Page<Order> getOrderListByUserId(Integer currentPage, Integer pageSize, Integer userId) throws Exception {
        String queryHql = " from Order o where o.user.id='"+userId+"' ";
        String countHql = " select count(*) from Order o where o.user.id='"+userId+"' ";
        Page<Order> page = orderDao.findPage(currentPage, pageSize, queryHql, countHql);
        System.out.println(page);

        return page;
    }

}
