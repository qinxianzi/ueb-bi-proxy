package com.ueb.bi.proxy.service;

import java.util.List;

import org.apache.http.cookie.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ueb.bi.proxy.helper.OmsHelper;
import com.ueb.bi.proxy.vo.OmsSysParamsVO;
import com.ueb.bi.proxy.vo.OmsUriMappingVO;
import com.ueb.bi.proxy.vo.OmsUserVO;

@Service("omsService")
public class OmsService {

	@Autowired
	private OmsHelper omsHelper;

	public OmsUriMappingVO vilidateByCode(String code) throws Exception {
		OmsUriMappingVO omsUriMappingVo = omsHelper.getPathByCode(code);
		if (null == omsUriMappingVo) {
			throw new Exception(code + " doesn't exists");
		}
		return omsUriMappingVo;
	}

	public OmsUserVO loginBiAndBuildOmsUserVo(OmsSysParamsVO sysparamsVo) throws Exception {
		List<Cookie> biCookies = omsHelper.omsUserLoginBi(sysparamsVo.getBiAccount());

		OmsUserVO omsUserVo = new OmsUserVO();
		omsUserVo.setCookies(biCookies);
		omsUserVo.setBiAccount(sysparamsVo.getBiAccount());
		omsUserVo.setUserId(sysparamsVo.getUserId());
		return omsUserVo;
	}
}
