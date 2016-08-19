package com.ueb.bi.proxy.controller;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.Consts;
import org.apache.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ueb.bi.proxy.constants.UebConstants;
import com.ueb.bi.proxy.dispatcher.UebDispatchServlet;
import com.ueb.bi.proxy.vo.OmsUserVO;
import com.ueb.bi.proxy.vo.RequestVO;
import com.ueb.bi.proxy.vo.ResponseVO;

public class UebBaseController {

	private static final Logger logger = LoggerFactory.getLogger(UebDispatchServlet.class);

	public String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
			if (ip.equals("127.0.0.1")) {
				// 根据网卡取本机配置的IP
				InetAddress inet = null;
				try {
					inet = InetAddress.getLocalHost();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
				ip = inet.getHostAddress();
			}
		}
		// 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
		if (ip != null && ip.length() > 15) {
			if (ip.indexOf(",") > 0) {
				ip = ip.substring(0, ip.indexOf(","));
			}
		}
		return ip;
	}

	protected String readDataFromReader(HttpServletRequest request) {
		StringBuffer buffer = new StringBuffer();
		try {
			BufferedReader reader = request.getReader();
			char[] buff = new char[1024];
			int len = 0;
			while ((len = reader.read(buff)) != -1) {
				buffer.append(buff, 0, len);
			}
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		return buffer.toString();
	}

	protected RequestVO getRequestVO(HttpServletRequest request) throws Exception {
		RequestVO requestVo = new RequestVO();
		String jsonParam = this.readDataFromReader(request);
		requestVo.setMethod(request.getMethod());
		requestVo.setRealPath((String) request.getAttribute(UebConstants.REAL_PATH));
		requestVo.setContentType(request.getContentType());
		requestVo.setJsonParam(jsonParam);

		// List<Cookie> cookies = readInfoFromSession(request);
		// if (null != cookies) {
		// requestVo.setCookies(cookies);
		// }

		String omsUserKey = this.getOmsUserKeyFromCookie(request);
		OmsUserVO omsUserVo = this.getOmsUserVoFromSession(request, omsUserKey);
		if (null == omsUserVo) {
			throw new Exception("please login BI system first");
		}
		requestVo.setCookies(omsUserVo.getCookies());
		requestVo.setParamList(this.buildParams(request));
		return requestVo;
	}

	// protected OmsUserVO getOmsUserVoFromSession(HttpServletRequest request) {
	// HttpSession httpSession = request.getSession(true);
	// // String omsUserKey = (String)
	// // httpSession.getAttribute(UebConstants.OMSUSERKEY);
	// OmsUserVO omsUserVo = null;
	// if (StringUtils.isNotBlank(omsUserKey)) {
	// omsUserVo = (OmsUserVO) httpSession.getAttribute(omsUserKey);
	// }
	// return omsUserVo;
	// }

	protected String getOmsUserKeyFromCookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		String omsUserKey = "";
		for (int i = 0, len = cookies.length; i < len; i++) {
			Cookie cookie = cookies[i];
			if (StringUtils.equals(UebConstants.OMSUSERKEY, cookie.getName())) {
				omsUserKey = cookie.getValue();
				break;
			}
		}
		return omsUserKey;
	}

	protected void setOmsUserKey2Cookie(HttpServletResponse response, String omsUserKey) throws Exception {
		if (StringUtils.isBlank(omsUserKey)) {
			throw new Exception("omsUserKey parameter cant't be null");
		}
		Cookie omsUserKeyCookie = new Cookie(UebConstants.OMSUSERKEY, omsUserKey);
		omsUserKeyCookie.setPath("/");
		response.addCookie(omsUserKeyCookie);
	}

	protected OmsUserVO getOmsUserVoFromSession(HttpServletRequest request, String omsUserKey) throws Exception {
		if (StringUtils.isBlank(omsUserKey)) {
			throw new Exception("omsUserKey parameter cant't be null");
		}

		HttpSession httpSession = request.getSession(true);
		OmsUserVO omsUserVo = (OmsUserVO) httpSession.getAttribute(omsUserKey);
		return omsUserVo;
	}

	protected void setOmsUserVo2Session(HttpServletRequest request, HttpServletResponse response, OmsUserVO omsUserVo,
			String omsUserKey) throws Exception {
		if (null != omsUserVo) {
			// String remoteAddr = request.getRemoteAddr();
			// String omsUserKey = omsUserVo.getUserId() + "_" + remoteAddr +
			// "_" + omsUserVo.getBiAccount();
			HttpSession httpSession = request.getSession(true);
			httpSession.setAttribute(omsUserKey, omsUserVo);
			// httpSession.setAttribute(UebConstants.OMSUSERKEY, omsUserKey);
			this.setOmsUserKey2Cookie(response, omsUserKey);
		}
	}
	// protected List<Cookie> readInfoFromSession(HttpServletRequest request) {
	// HttpSession session = request.getSession();
	// String key = (String) session.getAttribute("user");
	// OmsUserVO omsUserVo = (OmsUserVO) session.getAttribute(key);
	// List<Cookie> cookies = null;
	// if (null != omsUserVo) {
	// cookies = omsUserVo.getCookies();
	// }
	// return cookies;
	// }

	protected List<BasicNameValuePair> buildParams(HttpServletRequest request) {
		List<BasicNameValuePair> paramList = new ArrayList<BasicNameValuePair>();

		Enumeration<String> parameterNames = request.getParameterNames();
		while (parameterNames.hasMoreElements()) {
			String name = parameterNames.nextElement();
			String value = request.getParameter(name);
			BasicNameValuePair param = new BasicNameValuePair(name, value);
			paramList.add(param);
		}
		return paramList;
	}

	protected void writeDate2Stream(byte[] bytes, HttpServletResponse response) throws IOException {
		ServletOutputStream output = null;
		try {
			output = response.getOutputStream();
			output.write(bytes);
		} catch (IOException e) {
			logger.error(e.getMessage());
		} finally {
			if (null != output) {
				output.flush();
				output.close();
			}
		}
	}

	protected void writeDate2Stream(Charset charset, String content, HttpServletResponse response) throws IOException {
		charset = null == charset ? Consts.UTF_8 : charset;
		this.writeDate2Stream(content.getBytes(charset), response);
	}

	protected void writeDate2Stream(ResponseVO resVo, HttpServletResponse response) throws IOException {
		String contentType = resVo.getContentType();
		if (contentType.contains(UebConstants.IMAGE)) {
			this.writeDate2Stream(resVo.getBuffer(), response);
		} else {
			this.writeDate2Stream(resVo.getCharset(), resVo.getContent(), response);
		}
	}

	protected String saveContent2File(String url, String content) throws IOException {
		String filename = "";
		filename = this.getTemplatesName(url);
		if (null != filename && !"".equals(filename) && -1 != filename.indexOf(".html")) {
			filename = filename.substring(0, filename.indexOf(".html"));
			if ("layout-desktop".equalsIgnoreCase(filename)) {
				return filename;
			}
		}
		FileOutputStream output = null;
		try {
			String filepath = this.getFilepath(filename);
			output = new FileOutputStream(filepath);
			output.write(content.getBytes(UebConstants.UTF8));
			return filename;
		} finally {
			if (null != output) {
				output.flush();
				output.close();
			}
		}
	}

	protected String getFilepath(String filename) {
		String path = this.getClass().getResource("/").getPath();
		StringBuffer filepath = new StringBuffer(path);
		filepath.append(UebConstants.PREFIX).append(filename).append(UebConstants.SUFFIX);
		return filepath.toString();
	}

	private String getTemplatesName(String url) {
		int index = url.indexOf("?");
		if (-1 != index) {
			String[] split = url.substring(0, index).split("/");
			return split[split.length - 1];
		}
		index = url.indexOf("#");
		if (-1 != index) {
			String[] split = url.substring(0, index).split("/");
			return split[split.length - 1];
		}

		index = url.indexOf("/");
		if (-1 != index) {
			String[] split = url.split("/");
			return split[split.length - 1];
		}
		return "";
	}
}
