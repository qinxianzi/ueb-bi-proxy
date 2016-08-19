package com.ueb.bi.proxy.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSON;
import com.ueb.bi.proxy.service.OmsService;
import com.ueb.bi.proxy.utils.TokenUtil;
import com.ueb.bi.proxy.vo.OmsRequestVO;
import com.ueb.bi.proxy.vo.OmsSysParamsVO;
import com.ueb.bi.proxy.vo.OmsUriMappingVO;
import com.ueb.bi.proxy.vo.OmsUserVO;

@Controller
@RequestMapping("/oms")
public class OmsController extends UebBaseController {

	@Autowired
	private OmsService omsService;

	@RequestMapping(path = "/bi", method = { RequestMethod.GET, RequestMethod.POST })
	public String proxyOpenPage(@RequestParam("reqParam") String reqParam, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		OmsRequestVO requestVo = JSON.parseObject(reqParam, OmsRequestVO.class);
		requestVo.verificationSysparams();
		OmsSysParamsVO sysparamsVo = requestVo.getSysparams();
		String clientHost = requestVo.getBizparams().getClientHost();

		String sign = requestVo.getSign();
		// String remoteAddr = request.getRemoteAddr();
		String remoteAddr = this.getIpAddress(request); // PHP服务器的IP
		TokenUtil.verificationToken(sysparamsVo, sign, remoteAddr, clientHost);

		String omsUserKey = TokenUtil.generateToken(sysparamsVo.getUserId(), sysparamsVo.getBiAccount(), remoteAddr,
				clientHost);
		OmsUriMappingVO omsUriMappingVo = omsService.vilidateByCode(sysparamsVo.getCode());
		OmsUserVO omsUserVo = this.getOmsUserVoFromSession(request, omsUserKey);
		if (null == omsUserVo) { // 该OMS用户尚未登陆bi
			omsUserVo = omsService.loginBiAndBuildOmsUserVo(sysparamsVo);
			this.setOmsUserVo2Session(request, response, omsUserVo, omsUserKey); // 将OMS用户登陆信息保存到session中（不需要重复登陆BI）
		}

		response.setCharacterEncoding("UTF-8");
		StringBuffer path = new StringBuffer("redirect:/app/main#");
		path.append(omsUriMappingVo.getPath());
		return path.toString();
	}
}
