package com.ueb.bi.proxy.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.ueb.bi.proxy.utils.TokenUtil;
import com.ueb.bi.proxy.vo.OmsSysParamsVO;

@RestController
public class OmsTokenController {

	@RequestMapping(path = "/oms/token", method = { RequestMethod.GET, RequestMethod.POST })
	public String applyToken(@RequestParam("reqParam") String reqParam, HttpServletRequest request) {
		Map<String, String> results = new HashMap<String, String>(10);
		try {
			OmsSysParamsVO paramsVo = JSON.parseObject(reqParam, OmsSysParamsVO.class);
			paramsVo.verificationBaseInfo();

			String userId = paramsVo.getUserId();
			String biAccount = paramsVo.getBiAccount();
			String remoteAddr = request.getRemoteAddr();
			String token = TokenUtil.generateToken(userId, biAccount, remoteAddr);
			results.put("success", "0");
			results.put("token", token);
			results.put("message", "");
		} catch (Exception e) {
			results.put("success", "1");
			results.put("message", e.getMessage());
			results.put("token", "");
		}
		return JSON.toJSONString(results);
	}
}
