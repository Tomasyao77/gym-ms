package com.whut.work.gym.dao.impl;

import org.springframework.stereotype.Component;

import com.whut.work.base.dao.Impl.BaseDaoImpl;
import com.whut.work.gym.dao.IEquipmentDao;
import com.whut.work.gym.model.Equipment;

/**
 * @author Justerdu 2017-03-11
 */
@Component
public class EquipmentDaoImpl extends BaseDaoImpl<Equipment> implements IEquipmentDao {
    public EquipmentDaoImpl(){
        super(Equipment.class);
    }

}
