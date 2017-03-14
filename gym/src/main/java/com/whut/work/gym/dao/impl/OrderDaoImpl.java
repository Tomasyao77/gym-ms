package com.whut.work.gym.dao.impl;

import org.springframework.stereotype.Component;

import com.whut.work.base.dao.Impl.BaseDaoImpl;
import com.whut.work.gym.dao.IOrderDao;
import com.whut.work.gym.model.Order;

/**
 * @author Justerdu 2017-03-11
 */
@Component
public class OrderDaoImpl extends BaseDaoImpl<Order> implements IOrderDao {
    public OrderDaoImpl(){
        super(Order.class);
    }

}
