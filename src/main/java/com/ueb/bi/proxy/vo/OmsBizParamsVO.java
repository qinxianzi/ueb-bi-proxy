package com.ueb.bi.proxy.vo;

import org.apache.commons.lang3.StringUtils;

public class OmsBizParamsVO {

	/**
	 * 部门
	 */
	private String department;

	/**
	 * 平台
	 */
	private String platform;

	/**
	 * 客户端IP
	 */
	private String clientHost;

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getClientHost() throws Exception {
		if (StringUtils.isBlank(clientHost)) {
			throw new Exception("clientHost parameter can't be null");
		}
		return clientHost;
	}

	public void setClientHost(String clientHost) {
		this.clientHost = clientHost;
	}
}
