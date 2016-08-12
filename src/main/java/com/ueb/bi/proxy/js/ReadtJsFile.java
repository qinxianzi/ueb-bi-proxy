package com.ueb.bi.proxy.js;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;

public class ReadtJsFile {
	public static String readFileByLines(String fileName) throws IOException {
		String path = ReadtJsFile.class.getResource("/").getPath();
		File file = new File(path + "/static/" + fileName);
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new FileReader(file));
			String str = null;
			StringBuffer sb = new StringBuffer();
			while ((str = reader.readLine()) != null) {
				sb.append(str.trim());
			}
			return sb.toString();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				reader.close();
			}
		}
		return "";
	}

	public static byte[] readFile(String filename) throws IOException {
		String path = ReadtJsFile.class.getResource("/").getPath();
		File file = new File(path + "/static/" + filename);

		FileInputStream input = null;
		try {
			input = new FileInputStream(file);
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			byte[] b = new byte[1024];
			int len = 0;
			while (-1 != (len = input.read(b, 0, 1024))) {
				output.write(b, 0, len);
			}
			return output.toByteArray();
		} finally {
			if (input != null) {
				input.close();
			}
		}
	}
}