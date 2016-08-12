package com.ueb.bi.proxy.vo;

import java.nio.charset.Charset;
import java.util.List;

import org.apache.http.Consts;
import org.apache.http.cookie.Cookie;

public class ResponseVO {

	public ResponseVO() {
	}

	public ResponseVO(String contentType, String content) {
		this.contentType = contentType;
		this.content = content;
	}

	/**
	 * 返回类容类型
	 */
	private String contentType;

	/**
	 * 返回的内容
	 */
	private String content;

	private byte[] buffer;

	private Charset charset;

	private String mimeType;

	/**
	 * BI返回的cookie
	 */
	private List<Cookie> biCookies;

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public byte[] getBuffer() {
		return buffer;
	}

	public void setBuffer(byte[] buffer) {
		this.buffer = buffer;
	}

	public Charset getCharset() {
		return charset;
	}

	public void setCharset(Charset charset) {
		charset = null == charset ? Consts.UTF_8 : charset;
		this.charset = charset;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	public String getResContentType() {
		return this.getMimeType() + ";charset=" + this.charset.toString();
	}

	public List<Cookie> getBiCookies() {
		return biCookies;
	}

	public void setBiCookies(List<Cookie> biCookies) {
		this.biCookies = biCookies;
	}
}
