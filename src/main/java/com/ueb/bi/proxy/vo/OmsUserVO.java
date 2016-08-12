package com.ueb.bi.proxy.vo;

import java.util.List;

import org.apache.http.cookie.Cookie;

/**
 * OMS用户登陆BI
 *
 */
public class OmsUserVO {

	/**
	 * 登录Bi返回的Cookies
	 */
	private List<Cookie> cookies;

	/**
	 * 用户id
	 */
	private String userId;

	/**
	 * bi账号
	 */
	private String biAccount;

	// /**
	// * userId_biAccount
	// */
	// private String key;

	public List<Cookie> getCookies() {
		return cookies;
	}

	public void setCookies(List<Cookie> cookies) {
		this.cookies = cookies;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getBiAccount() {
		return biAccount;
	}

	public void setBiAccount(String biAccount) {
		this.biAccount = biAccount;
	}
	//
	// public String getKey() {
	// return key;
	// }
	//
	// public void setKey(String key) {
	// this.key = key;
	// }
}
