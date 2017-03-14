package com.whut.work.gym.model;

/**
 * @Func 场地表
 * @author Justerdu 2017-03-11
 */
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_playground")
public class Playground {

	@Id
	@GeneratedValue
	@Column(name = "playground_id")
	private Integer playgroundId; // 场地编号ID
	@Column(name = "playground_name")
	private String playgroundName; // 场地名称
	@Column(name = "size")
	private String size; // 场地大小
	@Column(name = "price")
	private Integer price; // 场地价格
	@Column(name = "position")
	private String position; // 场地位置
	@Column(name = "is_free")
	private String isFree; // 场地描述
	@Column(name = "description")
	private String description; // 是否空闲
	@Column(name = "remark")
	private String remark; // 备注

	public Integer getPlaygroundId() {
		return playgroundId;
	}

	public void setPlaygroundId(Integer playgroundId) {
		this.playgroundId = playgroundId;
	}

	public String getPlaygroundName() {
		return playgroundName;
	}

	public void setPlaygroundName(String playgroundName) {
		this.playgroundName = playgroundName;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getIsFree() {
		return isFree;
	}

	public void setIsFree(String isFree) {
		this.isFree = isFree;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
