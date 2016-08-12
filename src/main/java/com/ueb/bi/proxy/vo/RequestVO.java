package com.ueb.bi.proxy.vo;

import java.util.List;

import org.apache.http.cookie.Cookie;
import org.apache.http.message.BasicNameValuePair;

public class RequestVO {

	private String method;

	private String realPath;

	private String jsonParam;

	private String contentType;

	private List<BasicNameValuePair> paramList;

	private List<Cookie> cookies;

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getRealPath() {
		return realPath;
	}

	public void setRealPath(String realPath) {
		this.realPath = realPath;
	}

	public String getJsonParam() {
		return jsonParam;
	}

	public void setJsonParam(String jsonParam) {
		this.jsonParam = jsonParam;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public List<BasicNameValuePair> getParamList() {
		return paramList;
	}

	public void setParamList(List<BasicNameValuePair> paramList) {
		this.paramList = paramList;
	}

	public List<Cookie> getCookies() {
		return cookies;
	}

	public void setCookies(List<Cookie> cookies) {
		this.cookies = cookies;
	}
}
