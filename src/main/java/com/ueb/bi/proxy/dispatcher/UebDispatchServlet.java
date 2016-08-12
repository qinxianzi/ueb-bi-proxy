package com.ueb.bi.proxy.dispatcher;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.util.UrlPathHelper;

import com.ueb.bi.proxy.constants.UebConstants;

public class UebDispatchServlet extends DispatcherServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3507279811883719579L;

	private static final UrlPathHelper urlPathHelper = new UrlPathHelper();

	private static final Logger logger = LoggerFactory.getLogger(UebDispatchServlet.class);

	private List<String> excludeUris;

	public UebDispatchServlet() {
		excludeUris = new ArrayList<String>(10);
		excludeUris.add("/app/resources/base/images/favicon.ico");
	}

	public void noHandlerFound(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestUri = urlPathHelper.getRequestUri(request);
		if (excludeUris.contains(requestUri)) {
			return;
		}
		logger.info("========{}, ========{}", request.getMethod(), requestUri);

		String servletName = request.getServletContext().getServletContextName();
		if (-1 != requestUri.indexOf(servletName)) {
			requestUri = requestUri.substring(servletName.length() + 1);
		}
		request.setAttribute(UebConstants.REAL_PATH, requestUri);

		String contentType = request.getContentType();
		if (StringUtils.isNotBlank(contentType)
				&& StringUtils.contains(contentType, MediaType.APPLICATION_JSON_VALUE)) {
			request.getRequestDispatcher("/error/rest/404").forward(request, response);
		} else {
			request.getRequestDispatcher("/error/controller/404").forward(request, response);
		}
	}
}
