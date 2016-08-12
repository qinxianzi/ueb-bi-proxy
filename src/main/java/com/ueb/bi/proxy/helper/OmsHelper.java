package com.ueb.bi.proxy.helper;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.cookie.Cookie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.ueb.bi.proxy.js.ReadtJsFile;
import com.ueb.bi.proxy.vo.BIAccountVO;
import com.ueb.bi.proxy.vo.OmsUriMappingVO;
import com.ueb.bi.proxy.vo.ResponseVO;

@Component("omsHelper")
public class OmsHelper {

	private Logger logger = LoggerFactory.getLogger(OmsHelper.class);

	private List<OmsUriMappingVO> uriMappingList;

	private List<BIAccountVO> biAccountList;

	// private ConcurrentHashMap<String, OmsUserVO> users;

	@Autowired
	private HttpClientHelper httpClientHelper;

	public OmsHelper() {
		this.initInfo();
	}

	private void initInfo() {
		try {
			String uriMapping = ReadtJsFile.readFileByLines("oms_uri_mapping.js");
			this.uriMappingList = JSON.parseArray(uriMapping, OmsUriMappingVO.class);

			String biAccountStr = ReadtJsFile.readFileByLines("oms_bi_account.js");
			this.biAccountList = JSON.parseArray(biAccountStr, BIAccountVO.class);

			// this.users = new ConcurrentHashMap<String, OmsUserVO>(10);
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
	}

	public BIAccountVO vilidateBiAccount(String biAccount) throws Exception {
		BIAccountVO biAccountVo = this.getBiAccount(biAccount);
		if (null == biAccountVo) {
			throw new Exception("bi account " + biAccount + " doesn't exists");
		}
		return biAccountVo;
	}

	public BIAccountVO getBiAccount(String biAccount) {
		if (StringUtils.isBlank(biAccount)) {
			throw new IllegalArgumentException("biAccount parameter can't be null");
		}
		for (Iterator<BIAccountVO> it = biAccountList.iterator(); it.hasNext();) {
			BIAccountVO biAccountVo = it.next();
			if (StringUtils.equals(biAccount, biAccountVo.getBiAccount())) {
				return biAccountVo;
			}
		}
		return null;
	}

	public OmsUriMappingVO getPathByCode(String code) {
		if (StringUtils.isBlank(code)) {
			throw new IllegalArgumentException("code parameter can't be null");
		}

		for (Iterator<OmsUriMappingVO> it = uriMappingList.iterator(); it.hasNext();) {
			OmsUriMappingVO uriMappingVo = it.next();
			if (StringUtils.equals(code, uriMappingVo.getCode())) {
				return uriMappingVo;
			}
		}
		return null;
	}

	// public OmsUserVO getOmsUserVo(OmsSysParamsVO sysparamsVo) throws
	// Exception {
	// String userId = sysparamsVo.getUserId(), biAccount =
	// sysparamsVo.getBiAccount(),
	// key = this.getUserKey(userId, biAccount);
	// OmsUserVO omsUserVo = null;
	// if (users.containsKey(key)) {
	// omsUserVo = users.get(key);
	// } else {
	// BIAccountVO biAccountInfo = this.vilidateBiAccount(biAccount);
	// omsUserVo = this.buildOmsUserVo(biAccount,
	// biAccountInfo.getBiPassword());
	// omsUserVo.setKey(key);
	// users.put(key, omsUserVo);
	// }
	// }
	//
	// public String getUserKey(String userId, String biAccount) {
	// StringBuffer key = new StringBuffer(userId);
	// key.append("_").append(biAccount);
	// return key.toString();
	// }
	//
	// public OmsUserVO buildOmsUserVo(String biAccount, String biPassword)
	// throws Exception {
	// ResponseVO responseVo = httpClientHelper.login(biAccount, biPassword);
	// OmsUserVO userSession = new OmsUserVO();
	// userSession.setCookies(responseVo.getBiCookies());
	// userSession.setBiAccount(biAccount);
	// return userSession;
	// }

	public List<Cookie> omsUserLoginBi(String biAccount) throws Exception {
		if (StringUtils.isBlank(biAccount)) {
			throw new Exception("biAccount parameter cant't be null");
		}
		BIAccountVO biAccountInfo = this.vilidateBiAccount(biAccount);
		String biPassword = biAccountInfo.getBiPassword();

		ResponseVO responseVo = httpClientHelper.login(biAccount, biPassword);
		// OmsUserVO omsUserVo = new OmsUserVO();
		// omsUserVo.setCookies(cookies);
		// omsUserVo.setBiAccount(biAccount);
		// return omsUserVo;
		return responseVo.getBiCookies();
	}
}
