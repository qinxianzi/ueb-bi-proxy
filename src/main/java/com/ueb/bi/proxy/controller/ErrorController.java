package com.ueb.bi.proxy.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ueb.bi.proxy.constants.UebConstants;
import com.ueb.bi.proxy.js.ReadtJsFile;
import com.ueb.bi.proxy.service.HttpClientService;
import com.ueb.bi.proxy.vo.RequestVO;
import com.ueb.bi.proxy.vo.ResponseVO;

@Controller
@RequestMapping("/error/controller")
public class ErrorController extends UebBaseController {

	@Autowired
	private HttpClientService httpClientService;

	@RequestMapping(path = "/404")
	public String page404(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String url = (String) request.getAttribute(UebConstants.REAL_PATH);
		if (StringUtils.equals(url, "/js/base.js")) {
			this.writeDate2Stream(ReadtJsFile.readFile("base.js"), response);
			return null;
		}

		RequestVO requestVo = this.getRequestVO(request);
		ResponseVO responseVo = httpClientService.sendRequest(requestVo);

		String contentType = responseVo.getContentType();
		if (StringUtils.isBlank(contentType)) {
			this.writeDate2Stream(responseVo.getCharset(), responseVo.getContent(), response);
			return null;
		}

		response.setContentType(responseVo.getResContentType());
		String results = null;
		if (StringUtils.contains(contentType, "text/html")) {
			results = saveContent2File(url, responseVo.getContent());
		} else {
			this.writeDate2Stream(responseVo, response);
		}
		return results;
	}
}
