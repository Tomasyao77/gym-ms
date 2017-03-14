package com.whut.work.gym.model;

/**
 * @Func 公告信息表
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
import javax.persistence.Table;

import com.whut.work.user.model.User;

@Entity
@Table(name = "tb_bulletin")
public class Bulletin {

	@Id
	@GeneratedValue
	@Column(name = "bulletin_id")
	private Integer bulletinId; //
	@Column(name = "title")
	private String title; // 标题
	@Column(name = "content")
	private String content; // 公告内容
	@Column(name = "publishTime")
	private Date publishTime; // 公告发布时间
	@Column(name = "remark")
	private String remark; // 备注
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;


	public Integer getBulletinId() {
		return bulletinId;
	}

	public void setBulletinId(Integer bulletinId) {
		this.bulletinId = bulletinId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getPublishTime() {
		return publishTime;
	}

	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
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

}
