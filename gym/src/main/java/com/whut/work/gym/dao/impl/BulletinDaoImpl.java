package com.whut.work.gym.dao.impl;

import org.springframework.stereotype.Component;

import com.whut.work.base.dao.Impl.BaseDaoImpl;
import com.whut.work.gym.dao.IBulletinDao;
import com.whut.work.gym.model.Bulletin;

/**
 * @author Justerdu 2017-03-11
 */
@Component
public class BulletinDaoImpl extends BaseDaoImpl<Bulletin> implements IBulletinDao {
    public BulletinDaoImpl(){
        super(Bulletin.class);
    }

}
