package com.ueb.bi.proxy.vo;

import org.apache.commons.lang3.StringUtils;

public class OmsSysParamsVO {

	/**
	 * 用户id
	 */
	private String userId;

	/**
	 * 角色(多个用应为逗号分割)
	 */
	private String roles;

	/**
	 * BI账号
	 */
	private String biAccount;

	/**
	 * 
	 */
	private String code;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public void setBiAccount(String biAccount) {
		this.biAccount = biAccount;
	}

	public String getBiAccount() {
		return biAccount;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void verification() throws Exception {
		this.verificationBaseInfo();
		if (StringUtils.isBlank(roles)) {
			throw new Exception("parameter exception: roles parameter can't be null");
		} else if (StringUtils.isBlank(code)) {
			throw new Exception("parameter exception: code parameter can't be null");
		}
	}

	public void verificationBaseInfo() throws Exception {
		if (StringUtils.isBlank(userId)) {
			throw new Exception("parameter exception: userId parameter can't be null");
		} else if (StringUtils.isBlank(biAccount)) {
			throw new Exception("parameter exception: biAccount parameter can't be null");
		}
	}
}
