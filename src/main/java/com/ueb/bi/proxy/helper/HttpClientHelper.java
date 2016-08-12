package com.ueb.bi.proxy.helper;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.fluent.Executor;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.ueb.bi.proxy.config.HttpClientConfig;
import com.ueb.bi.proxy.constants.UebConstants;
import com.ueb.bi.proxy.vo.ResponseVO;

@Component("httpClientHelper")
public class HttpClientHelper {
	private Logger logger = LoggerFactory.getLogger(HttpClientHelper.class);

	@Autowired
	@Qualifier("httpClientConfig")
	private HttpClientConfig config;

	@Autowired
	private Executor clientExecutor;

	private ResponseVO buildResponse(HttpResponse response, CookieStore cookieStore) throws IOException {
		HttpEntity entity = response.getEntity();
		Header header = entity.getContentType();
		String contentType = header.getValue();

		ResponseVO resVo = null;
		if (contentType.contains(UebConstants.IMAGE)) {
			resVo = readImage(contentType, entity);
		} else {
			String content = EntityUtils.toString(entity, Consts.UTF_8);
			resVo = new ResponseVO(contentType, content);
		}
		ContentType resContentType = ContentType.getOrDefault(entity);
		resVo.setCharset(resContentType.getCharset());
		resVo.setMimeType(resContentType.getMimeType());
		if (null != cookieStore) {
			resVo.setBiCookies(cookieStore.getCookies());
		}
		return resVo;
	}

	private ResponseVO readImage(String type, HttpEntity entity) throws IOException {
		InputStream input = null;
		try {
			input = entity.getContent();
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			byte[] buff = new byte[1024];
			int len = 0;
			while (-1 != (len = input.read(buff, 0, 1024))) {
				output.write(buff, 0, len);
			}

			ResponseVO resVo = new ResponseVO();
			resVo.setContentType(type);
			resVo.setBuffer(output.toByteArray());
			return resVo;
		} finally {
			if (null != input) {
				input.close();
			}
		}
	}

	public ResponseVO login(String username, String password) throws Exception {
		String loginUri = this.buildRequestUri(config.getLoginPath());
		Map<String, String> params = new HashMap<String, String>(10);
		params.put("localeId", config.getLocaleId());
		params.put("username", username);
		params.put("password", password);
		List<BasicNameValuePair> pairList = buildRequestParams(params);
		Request request = this.buildRequest(loginUri, "POST", pairList);
		try {
			CookieStore cookieStore = new BasicCookieStore();
			ResponseVO responseVo = this.sendRequest(request, cookieStore);
			return responseVo;
		} catch (Exception e) {
			logger.error("login failed: {0}", e.getMessage());
			throw e;
		}
	}

	private void bindCookie(CookieStore cookieStore) {
		if (null != cookieStore) {
			clientExecutor.use(cookieStore);
		}
	}

	private void unbindCookie() {
		clientExecutor.clearCookies();
	}

	public ResponseVO sendRequest(Request request, CookieStore cookieStore) throws Exception {
		bindCookie(cookieStore);
		Response response = null;
		try {
			response = clientExecutor.execute(request);
			return buildResponse(response.returnResponse(), cookieStore);
		} catch (Exception e) {
			logger.error(
					"an exception occurred during the request，the request is: {}, the exception details are：{}",
					request.toString(), e.getMessage());
			throw e;
		} finally {
			unbindCookie();
			if (null != response) {
				response.discardContent();
			}
		}
	}

	public List<BasicNameValuePair> buildRequestParams(Map<String, String> params) {
		params = null == params ? new HashMap<String, String>(10) : params;
		List<BasicNameValuePair> pairList = new ArrayList<BasicNameValuePair>(params.size());
		for (Entry<String, String> entry : params.entrySet()) {
			BasicNameValuePair pair = new BasicNameValuePair(entry.getKey(), entry.getValue());
			pairList.add(pair);
		}
		return pairList;
	}

	public Request buildRequest(String url, String method, List<BasicNameValuePair> params) {
		Request request = null;
		if ("GET".equalsIgnoreCase(method)) {
			request = this.buildGetRequest(url, params);
		} else if ("POST,PUT".contains(method.toUpperCase())) {
			request = this.buildPostAndPutRequest(method, url, params);
		}
		return request;
	}

	public Request buildGetRequest(String url, List<BasicNameValuePair> params) {
		Request request = Request.Get(url);
		if (null != params && !params.isEmpty()) {
			for (BasicNameValuePair pair : params) {
				request.addHeader(pair.getName(), pair.getValue());
			}
		}
		return request;
	}

	public Request buildPostAndPutRequest(String method, String url, List<BasicNameValuePair> params) {
		Request request = null;
		if ("POST".equalsIgnoreCase(method)) {
			request = Request.Post(url);
		} else if ("PUT".equals(method)) {
			request = Request.Put(url);
		}
		if (null != params && !params.isEmpty()) {
			request.bodyForm(params, Consts.UTF_8);
		}
		return request;
	}

	public String buildRequestUri(String path) {
		if (StringUtils.isBlank(path)) {
			throw new IllegalArgumentException("path parameters can not be empty");
		}
		String biUri = config.getUrl();
		if (path.startsWith("/") && biUri.endsWith("/")) {
			path = path.substring(1, path.length());
		}

		StringBuffer uri = new StringBuffer(biUri);
		uri.append(path);
		return uri.toString();
	}
}
