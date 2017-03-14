package com.whut.work.gym.dao.impl;

import com.whut.work.base.dao.Impl.BaseDaoImpl;
import com.whut.work.gym.dao.IPlaygroundDao;
import com.whut.work.gym.model.Playground;

import org.springframework.stereotype.Component;

/**
 * @author Justerdu 2017-03-11
 */
@Component
public class PlaygroundDaoImpl extends BaseDaoImpl<Playground> implements IPlaygroundDao {
    public PlaygroundDaoImpl(){
        super(Playground.class);
    }

}
