package com.ueb.bi.proxy.vo;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSON;

public class OmsRequestVO {

	/**
	 * 业务参数
	 */
	private OmsBizParamsVO bizparams;

	/**
	 * 系统参数
	 */
	private OmsSysParamsVO sysparams;

	/**
	 * 签名
	 */
	private String sign;

	public OmsBizParamsVO getBizparams() {
		return bizparams;
	}

	public void setBizparams(String bizparams) {
		this.bizparams = JSON.parseObject(bizparams, OmsBizParamsVO.class);
	}

	public OmsSysParamsVO getSysparams() {
		return sysparams;
	}

	public void setSysparams(String sysparams) {
		this.sysparams = JSON.parseObject(sysparams, OmsSysParamsVO.class);
	}

	/**
	 * 校验系统参数
	 * 
	 * @throws Exception
	 */
	public void verificationSysparams() throws Exception {
		sysparams.verification();
	}

	public String getSign() throws Exception {
		if (StringUtils.isBlank(sign)) {
			throw new Exception("sign parameter can't be null");
		}
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}
}
