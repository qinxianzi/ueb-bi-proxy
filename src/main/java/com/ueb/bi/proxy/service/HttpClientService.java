package com.ueb.bi.proxy.service;

import java.util.Iterator;
import java.util.List;

import org.apache.http.client.CookieStore;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.util.Args;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ueb.bi.proxy.helper.HttpClientHelper;
import com.ueb.bi.proxy.vo.RequestVO;
import com.ueb.bi.proxy.vo.ResponseVO;

@Service("httpClientService")
public class HttpClientService {

	@Autowired
	private HttpClientHelper httpClientHelper;

	private void assertNotNull(String method, String url) {
		Args.notNull(url, "url parameter");
		Args.notNull(method, "method parameter");
	}

	private boolean assertPostRequest(String method, String url) {
		this.assertNotNull(method, url);
		if (HttpPost.METHOD_NAME.equalsIgnoreCase(method) || HttpPut.METHOD_NAME.equalsIgnoreCase(method)) {
			return true;
		}
		throw new IllegalArgumentException("method parameters can only be post,put");
	}

	private boolean assertGetRequest(String method, String url) {
		this.assertNotNull(method, url);
		if (HttpGet.METHOD_NAME.equalsIgnoreCase(method)) {
			return true;
		}
		throw new IllegalArgumentException("method parameters can only be get");
	}

	private CookieStore getCookieStore(List<Cookie> cookies) {
		CookieStore cookieStore = new BasicCookieStore();
		if (null != cookies && !cookies.isEmpty()) {
			for (Iterator<Cookie> it = cookies.iterator(); it.hasNext();) {
				cookieStore.addCookie(it.next());
			}
		}
		return cookieStore;
	}

	public ResponseVO sendRequest(RequestVO requestVo) throws Exception {
		String method = requestVo.getMethod();
		this.assertNotNull(requestVo.getMethod(), requestVo.getRealPath());
		ResponseVO responseVo = null;
		if (HttpGet.METHOD_NAME.equalsIgnoreCase(method)) {
			responseVo = this.sendGetRequest(requestVo);
		} else if (HttpPost.METHOD_NAME.equalsIgnoreCase(method) || HttpPut.METHOD_NAME.equalsIgnoreCase(method)) {
			responseVo = this.sendPostRequest(requestVo);
		}
		return responseVo;
	}

	public ResponseVO sendGetRequest(RequestVO requestVo) throws Exception {
		String method = requestVo.getMethod();
		String realPath = requestVo.getRealPath();
		this.assertGetRequest(method, realPath);
		try {
			String requestUri = httpClientHelper.buildRequestUri(realPath);
			Request request = httpClientHelper.buildGetRequest(requestUri, requestVo.getParamList());

			ResponseVO responseVo = httpClientHelper.sendRequest(request, this.getCookieStore(requestVo.getCookies()));
			return responseVo;
		} catch (Exception e) {
			throw e;
		}
	}

	public ResponseVO sendPostRequest(RequestVO requestVo) throws Exception {
		String method = requestVo.getMethod();
		String realPath = requestVo.getRealPath();
		assertPostRequest(method, realPath);
		try {
			String requestUri = httpClientHelper.buildRequestUri(realPath);
			Request request = httpClientHelper.buildPostAndPutRequest(method, requestUri, requestVo.getParamList());

			StringEntity entity = new StringEntity(requestVo.getJsonParam(), "utf-8");
			entity.setContentEncoding("utf-8");
			entity.setContentType(requestVo.getContentType());
			request.body(entity);

			ResponseVO responseVo = httpClientHelper.sendRequest(request, this.getCookieStore(requestVo.getCookies()));
			return responseVo;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
