package com.ueb.bi.proxy.utils;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;

import com.google.common.hash.HashCode;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;
import com.ueb.bi.proxy.constants.UebConstants;
import com.ueb.bi.proxy.vo.OmsSysParamsVO;

public class TokenUtil {

	public static String generateToken(String userId, String biAccount, String remoteAddr) throws Exception {
		if (StringUtils.isBlank(remoteAddr)) {
			throw new Exception("remoteAddr parameter cant't be null");
		}

		HashFunction hf = Hashing.sha256();
		HashCode hashCode = hf.newHasher().putString(userId, UebConstants.UTF8).putString(remoteAddr, UebConstants.UTF8)
				.putString(biAccount, UebConstants.UTF8).hash();
		byte[] encode = Base64.encodeBase64(hashCode.asBytes());
		return new String(encode, UebConstants.UTF8);
	}

	public static String encodeBase64(String content) {
		byte[] b = Base64.encodeBase64(content.getBytes(UebConstants.UTF8));
		return new String(b, UebConstants.UTF8);
	}

	public static boolean verificationToken(OmsSysParamsVO sysparamsVo, String token, String remoteAddr)
			throws Exception {
		if (StringUtils.isBlank(remoteAddr)) {
			throw new Exception("remoteAddr parameter cant't be null");
		}

		StringBuffer buffer = new StringBuffer(sysparamsVo.getUserId());
		buffer.append(remoteAddr).append(sysparamsVo.getBiAccount());
		String base64Str = encodeBase64(buffer.toString());
		if (StringUtils.equals(token, base64Str)) {
			return true;
		}
		throw new Exception("Illegal login user");
	}

	// public static void main(String[] args) throws
	// UnsupportedEncodingException {
	// String str = "1001127.0.0.1admin";
	// byte[] encodeBase64 = Base64.encodeBase64(str.getBytes("UTF-8"));
	// System.out.println(new String(encodeBase64, "UTF-8"));
	// }
}
