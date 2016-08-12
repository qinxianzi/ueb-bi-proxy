package com.ueb.bi.proxy.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ueb.bi.proxy.service.HttpClientService;
import com.ueb.bi.proxy.vo.RequestVO;
import com.ueb.bi.proxy.vo.ResponseVO;

@RestController
@RequestMapping("/error/rest")
public class ErrorControllerRest extends UebBaseController {

	@Autowired
	private HttpClientService httpClientService;

	@RequestMapping(path = "/404")
	public String page404(HttpServletRequest request, HttpServletResponse response) throws Exception {
		RequestVO requestVo = this.getRequestVO(request);
		ResponseVO responseVo = httpClientService.sendRequest(requestVo);
		return responseVo.getContent();
	}
}
