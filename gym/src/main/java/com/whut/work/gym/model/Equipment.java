package com.whut.work.gym.model;

/**
 * @Func 设施表
 * @author Justerdu 2017-03-11
 */
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_equipment")
public class Equipment {

    @Id
    @GeneratedValue
    private Integer id;				// 设施编号ID		
    @Column(name="equipment_Name")
    private String equipmentName;	// 设施名称
    @Column(name="price")
    private Integer price;			// 设施价格
    @Column(name="description")
    private String description;		// 设施描述
    @Column(name="total_num")
    private Integer totalNum;		// 设施库存总量
    @Column(name="used_num")
    private Integer usedNum;		// 设施使用量
    @Column(name="repaire_num")
    private Integer repaireNum;		// 设施维修量
    @Column(name="remark")
    private String remark;			// 	备注
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getEquipmentName() {
		return equipmentName;
	}
	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}
	public Integer getPrice() {
		return price;
	}
	public void setPrice(Integer price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(Integer totalNum) {
		this.totalNum = totalNum;
	}
	public Integer getUsedNum() {
		return usedNum;
	}
	public void setUsedNum(Integer usedNum) {
		this.usedNum = usedNum;
	}
	public Integer getRepaireNum() {
		return repaireNum;
	}
	public void setRepaireNum(Integer repaireNum) {
		this.repaireNum = repaireNum;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
    
}
