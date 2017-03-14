package com.whut.work.gym.model;

/**
 * @Func 预约信息表
 * @author Justerdu 2017-03-11
 */
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.whut.work.user.model.User;

@Entity
@Table(name = "tb_order")//@JsonIgnoreProperties(value = "user")	// 解决springmvc json返回死循环
public class Order {

	@Id
	@GeneratedValue
	private Integer id; // 场地预约编号ID
	@Column(name = "order_time")
	private Date orderTime; // 提交预约时间
	@Column(name = "start_time")
	private Date startTime; // 预约使用开始时间
	@Column(name = "end_time")
	private Date endTime; // 预约使用结束时间
	@Column(name = "remark")
	private String remark; // 备注
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "playground_id")
	private Playground playground;
	
	public Order() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Date orderTime) {
		this.orderTime = orderTime;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Playground getPlayground() {
		return playground;
	}

	public void setPlayground(Playground playground) {
		this.playground = playground;
	}

}
