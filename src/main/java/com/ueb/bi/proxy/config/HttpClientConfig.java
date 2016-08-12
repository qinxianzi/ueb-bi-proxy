package com.ueb.bi.proxy.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component("httpClientConfig")
@PropertySource("classpath:httpclient.properties")
public class HttpClientConfig {

	/**
	 * 连接超时时间(毫秒)
	 */
	@Value("${kingdee.connectTimeout}")
	private Integer connectTimeout;
	/**
	 * 响应的超时时间(毫秒)
	 */
	@Value("${kingdee.socketTimeout}")
	private Integer socketTimeout;

	/**
	 * 请求地址
	 */
	@Value("${kingdee.url}")
	private String url;

	@Value("${kingdee.localeId}")
	private String localeId;

	@Value("${kingdee.loginPath}")
	private String loginPath;

	public Integer getConnectTimeout() {
		return connectTimeout;
	}

	public Integer getSocketTimeout() {
		return socketTimeout;
	}

	public String getUrl() {
		return url;
	}

	public String getLocaleId() {
		return localeId;
	}

	public String getLoginPath() {
		return loginPath;
	}
}
